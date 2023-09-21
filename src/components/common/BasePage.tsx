import { HTMLAttributes, ReactNode } from "react";

type Props = {
	header?: ReactNode;
} & HTMLAttributes<HTMLDivElement>;

export default function BasePage({ children, header, ...rest }: Props) {
	return (
		<div {...rest}>
			{header && header}
			<div className="p-5">{children}</div>
		</div>
	);
}
