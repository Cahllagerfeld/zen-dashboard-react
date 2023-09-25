import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { apiPaths, createApiPath } from "@/data/api";
import { performAuthenticatedRequest } from "../requests";
import { LoginResponse } from "@/types/common";

type LoginPayload = {
	username: string;
	password: string;
};

export async function loginUser(body: LoginPayload) {
	const url = createApiPath(apiPaths.login);

	return performAuthenticatedRequest<LoginResponse>(
		{
			url,
			errorMessage: "Failed to log the user in"
		},
		{
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			body: new URLSearchParams(body)
		}
	);
}

export function useLoginMutation(
	options?: Omit<UseMutationOptions<LoginResponse, unknown, LoginPayload, any>, "mutationFn">
) {
	return useMutation<LoginResponse, unknown, LoginPayload>({
		mutationFn: async (payload) => {
			return loginUser(payload);
		},
		...options
	});
}
