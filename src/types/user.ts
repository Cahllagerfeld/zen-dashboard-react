export interface User {
	id: string;
	created: string;
	updated: string;
	name: string;
	full_name: string;
	email_opted_in: boolean;
	hub_token: string;
	active: boolean;
	activation_token: string;
	teams: Team[];
	roles: Role[];
	email: string;
}

export interface Team {
	id: string;
	created: string;
	updated: string;
	name: string;
	users: string[];
}

export interface Role {
	id: string;
	created: string;
	updated: string;
	name: string;
	permissions: string[];
}