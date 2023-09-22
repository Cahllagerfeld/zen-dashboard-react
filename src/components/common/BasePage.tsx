import { HTMLAttributes, ReactNode, useEffect } from "react";
import { useBreadcrumbs } from "../breadcrumb/BreadcrumbContext";

type Props = {
	header?: ReactNode;
} & HTMLAttributes<HTMLDivElement>;

export default function BasePage({ children, header, ...rest }: Props) {
	const { setItems } = useBreadcrumbs();
	useEffect(() => {
		setItems([]);
	}, [setItems]);
	return (
		<div {...rest}>
			{header && header}
			<div className="p-5">{children}</div>
		</div>
	);
}
