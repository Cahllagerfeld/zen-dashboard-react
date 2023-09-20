interface PrimaryCirleProps {
	text: string;
}

function PrimaryCirle({ text }: PrimaryCirleProps) {
	return (
		<div className="flex h-7 w-7 items-center justify-center rounded-rounded bg-primary">
			<span className="text-xl uppercase text-white">{Array.from(text)[0]}</span>
		</div>
	);
}

export default PrimaryCirle;
