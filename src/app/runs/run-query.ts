import { RunQueryParams } from "@/types/runs";

type RunQueryKey = {
	workspace: string;
	params: RunQueryParams;
};

export function getRunKey({ workspace, params }: RunQueryKey) {
	return ["workspaces", workspace, "runs", params];
}
