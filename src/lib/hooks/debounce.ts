import { useCallback } from "react";
import debounce from "lodash.debounce";

export function useDebouncedSearch(callback: (value: string) => void, delay: number) {
	return useCallback(
		debounce((value: string) => {
			callback(value);
		}, delay),
		[]
	);
}
