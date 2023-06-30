import { StepSpec } from "@/types/pipelines";
import { Edge, Node, ReactFlow, Position } from "reactflow";
import dagre from "dagre";
import "reactflow/dist/style.css";

type DagCardProps = {
	spec: StepSpec[];
};

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 172;
const nodeHeight = 36;

function getLayoutedElements(nodes: Node[], edges: Edge[], direction = "TB") {
	const isHorizontal = direction === "LR";
	dagreGraph.setGraph({ rankdir: direction });

	nodes.forEach((node) => {
		dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
	});

	edges.forEach((edge) => {
		dagreGraph.setEdge(edge.source, edge.target);
	});

	dagre.layout(dagreGraph);

	nodes.forEach((node) => {
		const nodeWithPosition = dagreGraph.node(node.id);
		node.targetPosition = isHorizontal ? Position.Left : Position.Top;
		node.sourcePosition = isHorizontal ? Position.Right : Position.Bottom;

		node.position = {
			x: nodeWithPosition.x - nodeWidth / 2,
			y: nodeWithPosition.y - nodeHeight / 2
		};

		return node;
	});

	return { nodes, edges };
}

function convertJSONToNodesAndEdges(spec: StepSpec[]) {
	const convertedNodes: Node[] = [];
	const edges: Edge[] = [];

	spec.forEach((node, index) => {
		const { source, pipeline_parameter_name, upstream_steps } = node;
		const id = `node-${index}`;
		const type = "default";
		const data = {
			label: pipeline_parameter_name,
			source: source.module,
			attribute: source.attribute
		};

		const newNode: Node = { id, type, data, position: { x: 0, y: 0 } };
		convertedNodes.push(newNode);

		upstream_steps.forEach((upstream) => {
			console.log({ upstream });
			const sourceId = `node-${spec.findIndex((n) => n.pipeline_parameter_name === upstream)}`;
			const targetId = id;
			const edgeId = `edge-${sourceId}-${targetId}`;
			const edge = { id: edgeId, source: sourceId, target: targetId };
			edges.push(edge);
		});
	});

	return { nodes: convertedNodes, edges };
}

function DagCard({ spec }: DagCardProps) {
	const { edges, nodes } = convertJSONToNodesAndEdges(spec);
	const { edges: layoutEdges, nodes: layoutNodes } = getLayoutedElements(nodes, edges);
	console.log({ layoutEdges, layoutNodes });
	return (
		<div>
			<div className="rounded-3xl bg-white p-8 @container">
				<h2 className="mb-8 text-2xl">Configuration</h2>
				<div className="h-[200px] w-[full]">
					<ReactFlow
						preventScrolling
						zoomOnScroll={false}
						draggable={false}
						fitView
						edges={edges}
						nodes={nodes}
					/>
				</div>
			</div>
		</div>
	);
}

export default DagCard;
