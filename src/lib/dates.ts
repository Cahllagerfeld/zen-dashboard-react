export function convertUTC(datestring: string) {
	const date = new Date(`${datestring}Z`);
	return date.toLocaleString();
}
