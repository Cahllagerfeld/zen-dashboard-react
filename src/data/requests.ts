import { FetchError } from "@/data/fetch-error";
import { ErrorModel } from "@/types/error";

type AuthenticatedRequestConfig = {
	url: string;
	token?: string;
	errorMessage: string;
};

export async function performAuthenticatedRequest<T>(
	{ url, token, errorMessage }: AuthenticatedRequestConfig,
	config?: RequestInit
): Promise<T> {
	const defaultHeaders: HeadersInit = {};

	if (token) defaultHeaders["Authorization"] = `Bearer ${token}`;

	const defaultConfig: RequestInit = {
		// credentials: token ? "same-origin" : "include",
		headers: defaultHeaders
	};

	const fetchConfig: RequestInit = {
		...defaultConfig,
		...config,
		headers: {
			...defaultConfig.headers,
			...(config?.headers || {})
		}
	};

	const res = await fetch(url, fetchConfig);

	if (!res.ok) {
		const errorData = (await res.json()) as ErrorModel;
		throw new FetchError({
			status: res.status,
			statusText: res.statusText,
			message: (errorData.detail as string) || errorMessage
		});
	}

	return res.json();
}
