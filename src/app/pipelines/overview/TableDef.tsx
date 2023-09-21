import { ExecutionStatus, Pipeline } from "@/types/pipelines";
import { ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router-dom";
import { routePaths } from "@/routes/route-paths";
import { convertUTC } from "@/lib/dates";
import { User } from "@/types/user";
import StatusOverview from "../StatusOverview";

export const columns: ColumnDef<Pipeline>[] = [
	{
		header: "ID",
		accessorKey: "id",
		cell: ({ getValue }) => (
			<Link className="link" to={routePaths.pipelines.detail(getValue() as string)}>
				{getValue() as string}
			</Link>
		)
	},
	{
		header: "Name",
		accessorKey: "name"
	},
	{
		header: "Version",
		accessorKey: "version"
	},
	{
		accessorKey: "status",
		header: "Status",
		cell: ({ getValue }) => <StatusOverview status={getValue() as ExecutionStatus[]} />
	},
	{
		header: "Author",
		accessorKey: "user",
		cell: ({ getValue }) => (getValue() as User)?.name
	},
	{
		header: "Created",
		accessorKey: "created",
		cell: ({ getValue }) => <time>{convertUTC(getValue() as string)}</time>
	}
];
