import { useCurrentUser } from "@/data/user/active-user-query";
import PrimaryCirle from "@/components/primary-circle";
import Skeleton from "react-loading-skeleton";
import LogoutButton from "@/components/buttons/LogoutButton";

function Topbar() {
	const user = useCurrentUser();
	return (
		<aside className="sticky top-0 z-10 m-4 flex h-20 items-center justify-between rounded-3xl bg-theme-background-offset p-4">
			<div></div>
			<div className="flex gap-4">
				<LogoutButton />
				{user.data ? (
					<PrimaryCirle text={user.data.name} />
				) : (
					<Skeleton height={48} width={48} circle />
				)}
			</div>
		</aside>
	);
}

export default Topbar;
