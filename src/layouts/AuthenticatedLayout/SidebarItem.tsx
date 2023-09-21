import { ReactNode, cloneElement } from "react";
import { NavLink, NavLinkProps } from "react-router-dom";

interface SidebarItemProps extends NavLinkProps {
	label: string;
	icon: ReactNode;
	stroke?: boolean;
}

function SidebarItem({ label, icon, stroke = true, ...rest }: SidebarItemProps) {
	return (
		<NavLink
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
		</NavLink>
	);
}

export default SidebarItem;
