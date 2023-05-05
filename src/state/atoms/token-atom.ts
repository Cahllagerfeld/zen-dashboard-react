import { create } from "zustand";
import { persist } from "zustand/middleware";

interface TokenStore {
	token: string;
	setToken: (token: string) => void;
}

export const useTokenStore = create(
	persist<TokenStore>(
		(set) => ({
			token: "",
			setToken: (token: string) => set(() => ({ token }))
		}),
		{
			name: "token-storage"
		}
	)
);
