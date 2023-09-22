import { ColumnDef } from "@tanstack/react-table";
import { StackComponent } from "@/types/stack-component";
import { convertUTC } from "@/lib/dates";
import { Link } from "react-router-dom";
import { routePaths } from "@/routes/route-paths";

export const columns: ColumnDef<StackComponent>[] = [
	{
		header: "ID",
		accessorKey: "id",
		cell: ({ getValue }) => (
			<Link className="link" to={routePaths.components.detail(getValue() as string)}>
				{getValue() as string}
			</Link>
		)
	},
	{
		header: "Name",
		accessorKey: "name"
	},
	{
		header: "Type",
		accessorKey: "type"
	},
	{
		header: "Flavor",
		accessorKey: "flavor"
	},
	{
		header: "Shared",
		accessorKey: "is_shared",
		cell: ({ getValue }) => (getValue() ? "Yes" : "No")
	},
	{
		header: "Created",
		accessorKey: "created",
		cell: ({ getValue }) => <time>{convertUTC(getValue() as string)}</time>
	}
];
