import { useParams } from "react-router-dom";

function StackComponentDetail() {
	const params = useParams();
	return <pre>{JSON.stringify(params)}</pre>;
}

export default StackComponentDetail;
