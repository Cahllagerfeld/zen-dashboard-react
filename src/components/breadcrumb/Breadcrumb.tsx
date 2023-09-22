import { BreadcrumbItem } from "@/types/common";
import { Link } from "react-router-dom";
import { ReactComponent as ArrowLeft } from "@/assets/arrow-left.svg";

type BreadcrumbProps = {
	items: BreadcrumbItem[];
};

export default function Breadcrumb({ items }: BreadcrumbProps) {
	const secondLastItem = items[items.length - 2];
	return (
		<nav aria-label="Breadcrumb" className="flex items-center gap-1">
			{secondLastItem && (
				<Link to={secondLastItem.href}>
					<ArrowLeft className="fill-theme-text-secondary" />
				</Link>
			)}
			<ol className="flex gap-0.5">
				{items.map(({ href, label }, index) => (
					<li key={index}>
						{index === items.length - 1 ? (
							<span aria-current="location" className="red-text">
								{label}
							</span>
						) : (
							<>
								<Link className="text-theme-text-secondary" to={href}>
									{label}
								</Link>
								<span aria-hidden="true" className="text-theme-text-secondary">
									{" "}
									/{" "}
								</span>
							</>
						)}
					</li>
				))}
			</ol>
		</nav>
	);
}
