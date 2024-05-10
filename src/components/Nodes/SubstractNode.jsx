import React, { memo } from "react";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { Handle, Position } from "reactflow";

const SubtractNode = ({ data }) => {
  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-[#7DB8EB] border-1 border-stone-400 text-white">
      <div className="p-2 flex justify-center items-center gap-3">
        <RemoveCircleIcon />
        <div className="text-lg font-bold">{data.label}</div>
      </div>
      <Handle type="target" position={Position.Left} />
      <Handle
        type="source"
        position={Position.Right}
        className="bg-[#FF0000]"
      />
    </div>
  );
};

export default memo(SubtractNode);
