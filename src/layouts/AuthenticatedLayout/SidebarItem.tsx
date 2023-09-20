import { ReactNode, cloneElement } from "react";
import { NavLink, NavLinkProps } from "react-router-dom";

interface SidebarItemProps extends NavLinkProps {
	label: string;
	icon: ReactNode;
}

function SidebarItem({ label, icon, ...rest }: SidebarItemProps) {
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
						className: isActive ? "stroke-primary-400" : "stroke-neutral-400"
					})}
					<p>{label}</p>
				</>
			)}
		</NavLink>
	);
}

export default SidebarItem;
