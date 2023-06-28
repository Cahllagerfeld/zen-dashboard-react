import { Pipeline } from "@/types/pipelines";
import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper<Pipeline>();

export const tableDef = [
	columnHelper.accessor("id", {
		header: () => "ID",
		cell: (id) => id.getValue()
	}),
	columnHelper.accessor("name", {
		header: () => "Name",
		cell: (name) => name.getValue()
	}),
	columnHelper.accessor("status", {
		header: "Status",
		cell: ({ getValue }) => getValue()
	}),
	columnHelper.accessor("version", {
		header: "Version",
		cell: ({ getValue }) => getValue()
	}),
	columnHelper.accessor("user", {
		header: "Author",
		cell: ({ getValue }) => getValue()?.name
	}),
	columnHelper.accessor("created", {
		header: "Created",
		cell: ({ getValue }) => {
			return <time>{new Date(getValue()).toLocaleString()}</time>;
		}
	})
];
