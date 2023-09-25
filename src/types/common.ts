export type ResponsePage<T> = {
	index: number;
	max_size: number;
	total_pages: number;
	total: number;
	items: T[];
};

export type BreadcrumbItem = {
	label: string;
	href: string;
};

export type LoginResponse = {
	access_token: string;
	token_type: string;
};
