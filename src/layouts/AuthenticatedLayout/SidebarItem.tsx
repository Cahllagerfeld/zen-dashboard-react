import { ReactNode } from "react";
import { NavLink, NavLinkProps } from "react-router-dom";

interface SidebarItemProps extends NavLinkProps {
	label: string;
	icon: ReactNode;
}

function SidebarItem({ label, icon, ...rest }: SidebarItemProps) {
	return (
		<NavLink
			className={({ isActive }) =>
				`flex w-full gap-2 px-4 ${
					isActive ? "border-r-2 border-r-primary text-neutral-800" : "text-neutral-300"
				}`
			}
			{...rest}
		>
			{icon}
			<p>{label}</p>
		</NavLink>
	);
}

export default SidebarItem;
