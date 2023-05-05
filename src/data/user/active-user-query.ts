import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { User } from "../../types/user";
import { useTokenStore } from "../../state/atoms";

export function getCurrentUserKey() {
	return ["current-user"];
}

export function useCurrentUser(options?: Omit<UseQueryOptions<User>, "queryKey" | "queryFn">) {
	const { token } = useTokenStore();
	return useQuery<User>({
		queryKey: getCurrentUserKey(),
		queryFn: async () => {
			const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/current-user`, {
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
