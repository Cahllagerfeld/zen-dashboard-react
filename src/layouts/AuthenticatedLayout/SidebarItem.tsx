import { ReactNode, cloneElement } from "react";
import { Link, LinkProps, useLocation, useMatch as getMatch } from "react-router-dom";

interface SidebarItemProps extends SidebarLinkProps {
	label: string;
	icon: ReactNode;
	stroke?: boolean;
}

function SidebarItem({ label, icon, stroke = true, ...rest }: SidebarItemProps) {
	return (
		<SidebarLink
			className={({ isActive }) =>
				`flex w-11 flex-col items-center rounded-md p-1 text-text-xs  ${
					isActive ? "bg-theme-surface-primary" : "hover:bg-neutral-200 active:bg-neutral-300"
				}`
			}
			{...rest}
		>
			{({ isActive }) => (
				<>
					{cloneElement(icon as React.ReactElement, {
						className: isActive
							? stroke
								? "stroke-primary-400"
								: "fill-primary-400"
							: stroke
							? "stroke-neutral-400"
							: "fill-neutral-400"
					})}
					<p className="mt-0.5">{label}</p>
				</>
			)}
		</SidebarLink>
	);
}

export default SidebarItem;

interface SidebarLinkProps extends Omit<LinkProps, "className" | "children"> {
	routePatterns: string[];
	children?: React.ReactNode | ((props: { isActive: boolean }) => React.ReactNode);
	className?: string | ((props: { isActive: boolean }) => string);
	exact?: boolean;
}

export function SidebarLink({
	routePatterns,
	exact = false,
	children,
	className: classNameProp,
	...rest
}: SidebarLinkProps) {
	const location = useLocation();
	const matches = routePatterns.map((routePattern) => getMatch(routePattern)).filter(Boolean);
	const isActive = exact ? location.pathname === rest.to : matches.length > 0;

	let className: string | undefined;
	if (typeof classNameProp === "function") {
		className = classNameProp({ isActive });
	}

	return (
		<Link className={className} {...rest}>
			{typeof children === "function" ? children({ isActive }) : children}
		</Link>
	);
}
