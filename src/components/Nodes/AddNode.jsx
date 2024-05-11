import React, { memo } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Handle, Position } from "reactflow";

const AddNode = ({ data }) => {
  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-[#7DB8EB] border-1 border-stone-400 text-white">
      <div className="p-2 flex justify-center items-center gap-3">
        <AddCircleIcon />
        <div className="text-lg font-bold">{data.label}</div>
      </div>
      <Handle
        type="target"
        position={Position.Left}
        className="h-7 w-4 -left-2"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="bg-[#FF0000]  h-7 w-4 -right-2"
      />
    </div>
  );
};

export default memo(AddNode);
