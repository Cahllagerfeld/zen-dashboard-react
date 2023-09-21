import { HTMLAttributes } from "react";
import PageHeader from "../PageHeader";

type Props = {
	title?: string;
} & HTMLAttributes<HTMLDivElement>;

export default function BasePage({ title, children, ...rest }: Props) {
	return (
		<div {...rest}>
			{title && <PageHeader title={title} />}
			<div className="p-5">{children}</div>
		</div>
	);
}
