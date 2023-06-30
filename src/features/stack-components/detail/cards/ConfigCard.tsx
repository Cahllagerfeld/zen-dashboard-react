import { Fragment } from "react";
import Badge from "@/components/Badge";
import KeyValue from "@/components/KeyValue";
import { titleCase } from "./helper";
import Card from "@/components/Card";

type ConfigCardProps = {
	config: Record<string, any>;
};

function getValue(value: string | boolean | object) {
	if (typeof value === "boolean") {
		return <Badge intent={value ? "success" : "error"}>{value.toString()}</Badge>;
	} else if (value !== null && typeof value === "object") {
		return (
			<dl>
				{Object.entries(value).map(([key, value], i) => (
					<div className="flex gap-4" key={i}>
						<dt className="text-gray-500">{titleCase(key)}</dt>
						<dd>{value}</dd>
					</div>
				))}
			</dl>
		);
	} else {
		return value;
	}
}

function ConfigCard({ config }: ConfigCardProps) {
	return (
		<Card>
			<h2 className="mb-8 text-2xl">Configuration</h2>
			<dl className="columns-1 space-y-4 xl:columns-2">
				{Object.entries(config).map(([key, value], i) => (
					<Fragment key={i}>
						{value && <KeyValue itemKey={titleCase(key)} value={getValue(value)} />}
					</Fragment>
				))}
			</dl>
		</Card>
	);
}

export default ConfigCard;
