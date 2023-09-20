import { StepSpec } from "@/types/pipelines";
import { Edge, Node, ReactFlow, Position, MarkerType } from "reactflow";
import dagre from "dagre";
import "reactflow/dist/style.css";
import Card from "@/components/Card";

type DagCardProps = {
	spec: StepSpec[];
};

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 172;
const nodeHeight = 36;

function getLayoutedElements(nodes: Node[], edges: Edge[], direction = "LR") {
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

	spec.forEach((node) => {
		const { source, pipeline_parameter_name, upstream_steps } = node;
		const id = source.attribute || "test";
		const type = "default";
		const data = {
			label: pipeline_parameter_name,
			source: source.module,
			attribute: source.attribute
		};

		const newNode: Node = { id, type, data, position: { x: 0, y: 0 } };
		convertedNodes.push(newNode);

		upstream_steps.forEach((upstream) => {
			const sourceId = upstream;
			const targetId = id;
			const edgeId = `edge-${sourceId}-${targetId}`;
			const edge: Edge = {
				id: edgeId,
				source: sourceId,
				target: targetId,
				type: "smoothstep",
				markerEnd: {
					type: MarkerType.ArrowClosed,
					width: 20,
					height: 30,
					color: "#431d93"
				}
			};
			edges.push(edge);
		});
	});

	return { nodes: convertedNodes, edges };
}

function DagCard({ spec }: DagCardProps) {
	const { edges, nodes } = convertJSONToNodesAndEdges(spec);
	const { edges: layoutEdges, nodes: layoutNodes } = getLayoutedElements(nodes, edges);

	return (
		<Card>
			<h2 className="mb-8 text-2xl">Configuration</h2>
			<div className="h-[200px] w-[full]">
				<ReactFlow
					preventScrolling
					zoomOnScroll={false}
					panOnDrag={false}
					fitView
					edges={layoutEdges}
					nodes={layoutNodes}
				/>
			</div>
		</Card>
	);
}

export default DagCard;
