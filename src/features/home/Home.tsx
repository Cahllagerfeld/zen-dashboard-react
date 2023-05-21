import { Link } from "react-router-dom";
import { useWorkspaceStore } from "../../state/stores/workspace-store";
import { useWorkspaces } from "./workspace-query";
import { routePaths } from "../../routes/route-paths";
import { useCurrentUser } from "../../data/user/active-user-query";
import Welcome from "../../components/Welcome";
import Skeleton from "react-loading-skeleton";
import WorkspaceSkeletonCard from "./WorkspaceSkeletonCard";
import Table from "../../components/table/Table";
import { createColumnHelper } from "@tanstack/react-table";
import { User } from "../../types/user";
import { useMemo } from "react";

const tableData: Partial<User>[] = [
	{
		id: "1",
		name: "John Doe",
		email: "john@doe.com",
		active: true,
		full_name: "John Doe"
	},
	{
		id: "2",
		name: "Jane Doe",
		email: "jane@doe.com",
		active: false,
		full_name: "Jane Doe"
	},
	{
		id: "3",
		name: "Tony Stark",
		email: "tony@stark.com",
		active: true,
		full_name: "Tony Stark"
	},
	{
		id: "4",
		active: false,
		name: "Baiu",
		full_name: "Twitter",
		email: "asdfasdf@afadsf.com"
	}
];

const columnHelper = createColumnHelper<Partial<User>>();

const columns = [
	columnHelper.accessor("id", {
		header: () => "ID",
		cell: (id) => id.getValue()
	}),
	columnHelper.accessor("name", {
		header: () => "Name",
		cell: (user) => user.getValue()
	}),
	columnHelper.accessor("email", {
		header: () => "Email",
		cell: (mail) => mail.getValue()
	}),
	columnHelper.accessor("active", {
		header: () => "Active",
		cell: (active) => (active.getValue() ? "Yes" : "No")
	}),
	columnHelper.accessor("as", {
		header: () => "Active",
		cell: (active) => (active.getValue() ? "Yes" : "No")
	}),
	columnHelper.accessor("ad", {
		header: () => "Active",
		cell: (active) => (active.getValue() ? "Yes" : "No")
	}),
	columnHelper.accessor("full_name", {
		header: () => "Full Name",
		cell: (fullName) => fullName.getValue()
	}),
	columnHelper.accessor("", {
		id: "Actions",
		cell: () => (
			<button className="text-center align-middle" onClick={() => alert("test")}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					stroke-width="2"
					stroke="currentColor"
					fill="none"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
					<path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
					<path d="M12 19m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
					<path d="M12 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
				</svg>
			</button>
		)
	})
];

function Home() {
	const datadata = useMemo(() => tableData, []);
	const { setActiveWorkspace } = useWorkspaceStore();
	const { data: currentUser } = useCurrentUser();
	const { data } = useWorkspaces();

	return (
		<div className="flex flex-col gap-8">
			<div>
				{currentUser ? (
					<Welcome name={currentUser.full_name || currentUser.name || ""} />
				) : (
					<Skeleton className="h-12 w-1/4 rounded-xl" />
				)}
				<p className="text-neutral-400">Please select one of the following workspaces</p>
			</div>
			{data ? (
				<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
					{data?.items.map((item, index) => (
						<Link
							key={index}
							to={routePaths.workspaces.detail(item.name)}
							onClick={() => setActiveWorkspace(item.name)}
							className="flex w-full select-text flex-col gap-2 rounded-2xl bg-white from-primary to-primary-light p-4 hover:bg-primary hover:bg-gradient-to-br hover:text-white"
						>
							<h2 className="text-xl">{item.name}</h2>
							{item.description ? <p>{item.description}</p> : <p>No description provided</p>}
							<time>{new Date(item.created).toLocaleDateString()}</time>
						</Link>
					))}
				</div>
			) : (
				<WorkspaceSkeletonCard />
			)}
			<Table columnDef={columns} data={datadata} hasActions />
		</div>
	);
}

export default Home;
