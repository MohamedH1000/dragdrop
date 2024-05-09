import React, { useState, useRef, useCallback } from "react";
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
import SubstractNode from "../Nodes/SubstractNode";
import MultiplyNode from "../Nodes/MultiplyNode";
import InputNode from "../Nodes/InputNode";
import OutputNode from "../Nodes/OutputNode";
import DivideNode from "../Nodes/DivideNode";
import CustomEdge from "../Edges/CustomEdge";
const initialNodes = [];
let id = 0;
const getId = () => `${id++}`;
const nodeTypes = {
  add: AddNode,
  substract: SubstractNode,
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
  console.log(nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  console.log(edges);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const onConnect = useCallback(
    (params) => {
      const { source, target } = params;
      const sourceNode = nodes.find((node) => node.id === source);
      const targetNode = nodes.find((node) => node.id === target);

      if (sourceNode && targetNode) {
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
    },
    [nodes, edges]
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
