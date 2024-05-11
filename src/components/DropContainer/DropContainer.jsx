import React, { useState, useRef, useCallback, useEffect } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  MiniMap,
} from "reactflow";
import "reactflow/dist/style.css";
import "./DropContainer.css";
import AddNode from "../Nodes/AddNode";
import MultiplyNode from "../Nodes/MultiplyNode";
import InputNode from "../Nodes/InputNode";
import OutputNode from "../Nodes/OutputNode";
import DivideNode from "../Nodes/DivideNode";
import CustomEdge from "../Edges/CustomEdge";
import SubtractNode from "../Nodes/SubstractNode";
const initialNodes = [];
let id = 0;
const getId = () => `${id++}`;
const nodeTypes = {
  add: AddNode,
  subtract: SubtractNode,
  input: InputNode,
  output: OutputNode,
  multiply: MultiplyNode,
  divide: DivideNode,
};

const edgeTypes = {
  "custom-edge": CustomEdge,
};

const DropContainer = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  // console.log("all nodes", nodes);
  console.log("all edges", edges);

  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const allSources = edges.map((edge) => {
    return { source: edge.source };
  });

  const allTargets = edges.map((edge) => {
    return { target: edge.target };
  });
  const allSourceNodes = allSources.map((source) =>
    nodes.find((node) => node.id === source.source)
  );

  const allTargetNodes = allTargets.map((targets) =>
    nodes.find((node) => node.id === targets.target)
  );

  const uniqueSourceNodes = Array.from(new Set(allSourceNodes));
  const uniqueTargetNodes = Array.from(new Set(allTargetNodes));
  // console.log("all Source nodes", allSourceNodes);
  // console.log("all target nodes", allTargetNodes);
  // console.log("Unique Source nodes", uniqueSourceNodes);
  // console.log("uniques target nodes", uniqueTargetNodes);
  // CASE FOR THE SUM

  useEffect(() => {
    let sum = 0;
    let subtract = 0;
    let multiply = 1;
    let divide = 1;
    allSourceNodes.forEach((sourceNode) => {
      // For each source node, find all outgoing edges
      const outgoingEdges = edges.filter(
        (edge) => edge.source === sourceNode.id
      );
      // Iterate over outgoing edges and add their target node values to the sum
      outgoingEdges.forEach((edge) => {
        const targetNode = allTargetNodes.find(
          (node) => node.id === edge.target
        );
        const sourseNode = allSourceNodes.find(
          (node) => node.id === edge.source
        );
        if (targetNode && sourseNode.data.value && targetNode.type === "add") {
          sum += parseInt(sourceNode.data.value);
        } else if (
          targetNode &&
          sourseNode.data.value &&
          targetNode.type === "subtract"
        ) {
          if (parseInt(sourseNode.data.value) > subtract) {
            subtract = parseInt(sourseNode.data.value) - subtract;
          } else if (subtract > parseInt(sourseNode.data.value)) {
            subtract = subtract - parseInt(sourseNode.data.value);
          } else {
            subtract = parseInt(sourseNode.data.value) - subtract;
          }
        } else if (
          targetNode &&
          sourseNode.data.value &&
          targetNode.type === "multiply"
        ) {
          multiply *= parseInt(sourseNode.data.value);
        } else if (
          targetNode &&
          sourseNode.data.value &&
          targetNode.type === "divide"
        ) {
          if (parseInt(sourseNode.data.value) > divide) {
            divide = parseInt(sourseNode.data.value) / divide;
          } else if (divide > parseInt(sourseNode.data.value)) {
            divide = divide / parseInt(sourseNode.data.value);
          } else {
            divide = parseInt(sourseNode.data.value) / divide;
          }
        }
      });
    });
    const updatedNodes = nodes.map((node) => {
      if (node.type === "add") {
        const targetNode = allTargetNodes.find(
          (target) => target.id === node.id
        );
        return { ...node, data: { ...node.data, value: sum } };
      } else if (node.type === "subtract") {
        const targetNode = allTargetNodes.find(
          (target) => target.id === node.id
        );
        return { ...node, data: { ...node.data, value: subtract } };
      } else if (node.type === "multiply") {
        const targetNode = allTargetNodes.find(
          (target) => target.id === node.id
        );
        return { ...node, data: { ...node.data, value: multiply } };
      } else if (node.type === "divide") {
        const targetNode = allTargetNodes.find(
          (target) => target.id === node.id
        );
        return { ...node, data: { ...node.data, value: divide } };
      }
      return node;
    });
    setNodes(updatedNodes);
    // console.log("here is the sum", sum);
    // console.log("here is the subtract ", subtract);
    // console.log("here is the multiply ", multiply);
    // console.log("here is the divide ", divide);
  }, [edges]);

  const onConnect = useCallback(
    (params) => {
      const { source, target } = params;

      const sourceNode = nodes.find((node) => node.id === source);
      const targetNode = nodes.find((node) => node.id === target);
      if (targetNode.type === "output") {
        const newValue = sourceNode.data.value;
        const incomingEdges = edges.filter((edge) => edge.target === target);
        if (incomingEdges.length > 0 && targetNode.type === "output") {
          // Output node already has an incoming edge, prevent creation of new edge
          console.log("Output node already has an incoming edge");
          return;
        }
        const updatedParams = {
          ...params,
          data: { ...params.data, value: newValue },
          type: "step",
        };

        const updatedTargetNode = {
          ...targetNode,
          data: { ...targetNode.data, value: newValue },
        };
        const updatedNodes = nodes.map((node) =>
          node.id === target ? updatedTargetNode : node
        );
        setEdges((eds) => addEdge(updatedParams, eds));
        setNodes(updatedNodes);
      }
      setEdges((eds) => addEdge({ ...params, type: "step" }, eds));
    },
    [nodes]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");

      // check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return;
      }

      // reactFlowInstance.project was renamed to reactFlowInstance.screenToFlowPosition
      // and you don't need to subtract the reactFlowBounds.left/top anymore
      // details: https://reactflow.dev/whats-new/2023-11-10
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${type}`, value: 0 },
      };
      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

  return (
    <div className="dndflow">
      <ReactFlowProvider>
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            fitView
          >
            <MiniMap />
            <Controls />
            <Background />
          </ReactFlow>
        </div>
      </ReactFlowProvider>
    </div>
  );
};

export default DropContainer;
