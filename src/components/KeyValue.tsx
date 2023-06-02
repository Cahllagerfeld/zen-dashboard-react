type KeyValueProps = {
	itemKey: string;
	value: React.ReactNode;
};

function KeyValue({ itemKey, value }: KeyValueProps) {
	return (
		<div className="break-inside-avoid">
			<dt className="mb-1 font-medium">{itemKey}</dt>
			<dd className="text-neutral-400">{value}</dd>
		</div>
	);
}

export default KeyValue;
