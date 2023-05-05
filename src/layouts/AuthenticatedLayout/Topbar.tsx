import { useCurrentUser } from "../../data/user/active-user-query";

function Topbar() {
	const user = useCurrentUser();
	return (
		<aside className="mx-4 mt-4 flex h-20 items-center rounded-3xl bg-theme-background-offset p-4">
			{user.data?.name}
		</aside>
	);
}

export default Topbar;
