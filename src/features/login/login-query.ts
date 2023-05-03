import { useMutation, UseMutationOptions } from "@tanstack/react-query";

export function useLoginMutation(
	options?: Omit<UseMutationOptions<any, any, any, any>, "mutationFn">
) {
	return useMutation<
		{ access_token: string; token_type: string },
		unknown,
		{ username: string; password: string }
	>({
		mutationFn: async ({ password, username }) => {
			const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/login`, {
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
