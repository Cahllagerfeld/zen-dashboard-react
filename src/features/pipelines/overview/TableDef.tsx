import { Pipeline } from "@/types/pipelines";
import { createColumnHelper } from "@tanstack/react-table";
import { Link } from "react-router-dom";
import { routePaths } from "@/routes/route-paths";
import StatusOverview from "../StatusOverview";
import { convertUTC } from "@/lib/dates";

const columnHelper = createColumnHelper<Pipeline>();

export const tableDef = [
	columnHelper.accessor("id", {
		header: () => "ID",
		cell: (id) => (
			<Link className="link" to={routePaths.pipelines.detail(id.getValue())}>
				{id.getValue()}
			</Link>
		)
	}),
	columnHelper.accessor("name", {
		header: () => "Name",
		cell: (name) => name.getValue()
	}),
	columnHelper.accessor("status", {
		header: "Status",
		cell: ({ getValue }) => <StatusOverview status={getValue()!} />
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
			return <time>{convertUTC(getValue())}</time>;
		}
	})
];
