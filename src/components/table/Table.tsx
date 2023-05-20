import {
	ColumnDef,
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	useReactTable
} from "@tanstack/react-table";
import { User } from "../../types/user";

// type TableProps<TData, TCol> = {
// 	data: TData[];
// 	columnDef: ColumnDef<TCol>;
// };

const data: Partial<User>[] = [
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
		cell: (info) => info.getValue()
	}),
	columnHelper.accessor("email", {
		header: () => "Email",
		cell: (mail) => mail.getValue()
	}),
	columnHelper.accessor("active", {
		header: () => "Active",
		cell: (active) => (active.getValue() ? "Yes" : "No")
	}),
	columnHelper.accessor("full_name", {
		header: () => "Full Name",
		cell: (full_name) => full_name.getValue()
	})
];

function Table() {
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel()
	});

	return (
		<table className="w-full border-separate border-spacing-y-4 text-left">
			<thead>
				{table.getHeaderGroups().map((headerGroup) => (
					<tr key={headerGroup.id}>
						{headerGroup.headers.map((header) => (
							<th className="px-2" key={header.id}>
								{flexRender(header.column.columnDef.header, header.getContext())}
							</th>
						))}
					</tr>
				))}
			</thead>
			<tbody>
				{table.getRowModel().rows.map((row) => (
					<tr key={row.id}>
						{row.getVisibleCells().map((cell) => (
							<td
								className="whitespace-nowrap bg-white p-3 first:rounded-l-lg last:rounded-r-lg"
								key={cell.id}
							>
								{flexRender(cell.column.columnDef.cell, cell.getContext())}
							</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	);
}

export default Table;
