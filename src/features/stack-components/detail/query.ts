export type StackComponentDetailQuery = {
	id: string;
};

export function getStackComponentQueryKey({ id }: StackComponentDetailQuery) {
	return ["components", id];
}
