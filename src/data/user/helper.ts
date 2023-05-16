export function objectToSearchParams(object: Record<string, string | null | undefined>) {
	const searchParams = new URLSearchParams();
	Object.entries(object).forEach(([key, value]) => {
		if (value !== null && value !== undefined) {
			searchParams.set(key, value);
		}
	});
	return searchParams;
}
