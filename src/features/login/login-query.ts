import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { apiPaths, createApiPath } from "../../data/api";

export function useLoginMutation(
	options?: Omit<
		UseMutationOptions<
			{ access_token: string; token_type: string },
			unknown,
			{ username: string; password: string },
			any
		>,
		"mutationFn"
	>
) {
	return useMutation<
		{ access_token: string; token_type: string },
		unknown,
		{ username: string; password: string }
	>({
		mutationFn: async ({ password, username }) => {
			const res = await fetch(createApiPath(apiPaths.login), {
				method: "POST",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded"
				},
				body: new URLSearchParams({
					password: password,
					username: username
				})
			});
			return res.json();
		},
		...options
	});
}
