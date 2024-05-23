import React, { memo } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import { Handle, Position } from "reactflow";

const MultiplyNode = ({ data }) => {
  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-[#7DB8EB] border-1 border-stone-400 text-white">
      <div className="p-2 flex justify-center items-center gap-3">
        <CancelIcon />
        <div className="text-lg font-bold">{data.label}</div>
      </div>
      <Handle
        type="target"
        position={Position.Left}
        className="h-7 w-4 -left-2 bg-transparent border-none"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="bg-transparent border-none  h-7 w-4 -right-2"
      />
    </div>
  );
};

export default memo(MultiplyNode);
