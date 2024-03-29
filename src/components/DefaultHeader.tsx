import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
	title: string;
}

export default function DefaultHeader({ title }: Props) {
	return (
		<aside className="flex h-11 w-full items-center border-b border-theme-border-moderate bg-theme-surface-primary p-5">
			<h1 className="text-display-xs">{title}</h1>
		</aside>
	);
}
