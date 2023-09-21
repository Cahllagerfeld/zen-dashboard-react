import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
	title?: string;
}

export default function PageHeader({ title }: Props) {
	return (
		<aside className="h-11 w-full border-b border-theme-border-moderate bg-theme-surface-primary p-5">
			{title && <h1 className="text-display-xs">{title}</h1>}
		</aside>
	);
}
