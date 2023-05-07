export function determineDayTime() {
	const date = new Date();
	const hours = date.getHours();
	if (hours >= 6 && hours < 12) return "morning";
	if (hours >= 12 && hours < 18) return "afternoon";
	if (hours >= 18 && hours < 22) return "evening";
	return "night";
}
