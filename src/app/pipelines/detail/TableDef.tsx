import { ColumnDef } from "@tanstack/react-table";
import { Run } from "@/types/runs";
import { User } from "@/types/user";
import { convertUTC } from "@/lib/dates";
import { Pipeline } from "@/types/pipelines";

export const runsColumns: ColumnDef<Run>[] = [
	{
		header: "ID",
		accessorKey: "id",
		cell: ({ getValue }) => <>{getValue() as string}</>
	},
	{
		header: "Name",
		accessorKey: "name"
	},
	{
		header: "Pipeline",
		accessorKey: "pipeline",
		cell: ({ getValue }) => <>{(getValue() as Pipeline).name}</>
	},
	{
		header: "Status",
		accessorKey: "status"
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
