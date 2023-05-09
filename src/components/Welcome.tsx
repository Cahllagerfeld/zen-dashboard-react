interface WelcomeProps {
	name: string;
}

function determineDayTime() {
	const date = new Date();
	const hours = date.getHours();
	if (hours >= 6 && hours < 12) return "morning";
	if (hours >= 12 && hours < 18) return "afternoon";
	if (hours >= 18 && hours < 22) return "evening";
	return "night";
}

function Welcome({ name }: WelcomeProps) {
	return (
		<p className="text-[2rem] text-neutral-400">
			Good {determineDayTime()},{" "}
			<span className="bg-gradient-to-br from-primary to-primary-light bg-clip-text text-4xl font-medium text-transparent">
				{name}
			</span>
		</p>
	);
}

export default Welcome;
