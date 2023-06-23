import { useParams } from "react-router-dom";

function StackTable() {
	const { id } = useParams();
	return <pre>{id}</pre>;
}

export default StackTable;
