import { atomWithStorage } from "jotai/utils";

export const tokenAtom = atomWithStorage("token", localStorage.getItem("token") || "");
