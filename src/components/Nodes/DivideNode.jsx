import React, { memo } from "react";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { Handle, Position } from "reactflow";

const DivideNode = ({ data }) => {
  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-[#7DB8EB] border-1 border-stone-400 text-white">
      <div className="p-2 flex justify-center items-center gap-3">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="2em"
            height="2em"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M19 13H5v-2h14zm-7-8a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2a2 2 0 0 1 2-2m0 10a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2a2 2 0 0 1 2-2"
            />
          </svg>
        </div>
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

export default memo(DivideNode);
