interface PrimaryCirleProps {
	text: string;
}

function PrimaryCirle({ text }: PrimaryCirleProps) {
	return (
		<div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary">
			<span className="text-xl uppercase text-white">{Array.from(text)[0]}</span>
		</div>
	);
}

export default PrimaryCirle;
