import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { User } from "@/types/user";
import { useTokenStore } from "@/state/stores";
import { apiPaths, createApiPath } from "../api";
import { performAuthenticatedRequest } from "../requests";

export function getCurrentUserKey() {
	return ["current-user"];
}

export async function fetchCurrentUser(token: string) {
	const url = createApiPath(apiPaths.currentUser);

	return performAuthenticatedRequest<User>({
		errorMessage: "Fetching the active user failed",
		token,
		url
	});
}

export function useCurrentUser(options?: Omit<UseQueryOptions<User>, "queryKey" | "queryFn">) {
	const { token } = useTokenStore();
	return useQuery<User>({
		queryKey: getCurrentUserKey(),
		queryFn: async () => fetchCurrentUser(token),
		...options
	});
}
