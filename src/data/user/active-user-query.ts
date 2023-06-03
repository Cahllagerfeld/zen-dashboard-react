import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { User } from "../../types/user";
import { useTokenStore } from "../../state/stores";
import { apiPaths, createApiPath } from "../api";
import { ErrorModel } from "../../types/error";
import { FetchError } from "../fetch-error";

export function getCurrentUserKey() {
	return ["current-user"];
}

export function useCurrentUser(options?: Omit<UseQueryOptions<User>, "queryKey" | "queryFn">) {
	const { token } = useTokenStore();
	return useQuery<User>({
		queryKey: getCurrentUserKey(),
		queryFn: async () => {
			const response = await fetch(createApiPath(apiPaths.currentUser), {
				method: "GET",
				headers: {
					Authorization: `Bearer ${token}`
				}
			});
			if (!response.ok) {
				const errorData = (await response.json()) as ErrorModel;
				throw new FetchError({
					status: response.status,
					statusText: response.statusText,
					message: errorData.detail || "Fetching the active User failed"
				});
			}
			return response.json();
		},
		...options
	});
}
