import { useCurrentUser } from "../../data/user/active-user-query";
import PrimaryCirle from "../../components/primary-circle";
import Skeleton from "react-loading-skeleton";
import LogoutButton from "../../components/buttons/LogoutButton";

function Topbar() {
	const user = useCurrentUser();
	return (
		<div className="sticky top-0 px-4 pt-4">
			<aside className="flex h-20 items-center justify-between rounded-3xl bg-theme-background-offset p-4">
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
		</div>
	);
}

export default Topbar;
