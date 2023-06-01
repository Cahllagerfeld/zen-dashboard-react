import { useParams } from "react-router-dom";
import { useStackComponentDetail } from "./query";

function StackComponentDetail() {
	const params = useParams() as { id: string };
	const { data } = useStackComponentDetail({ id: params.id });

	return <pre className="flex whitespace-normal">{JSON.stringify(data?.type)}</pre>;
}

export default StackComponentDetail;
