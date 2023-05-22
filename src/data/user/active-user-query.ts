import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { User } from "../../types/user";
import { useTokenStore } from "../../state/stores";
import { apiPaths, createApiPath } from "../api";

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
			if (!response.ok) throw new Error("Current user couldn't be fetched");
			return response.json();
		},
		...options
	});
}
