import React, { memo } from "react";
import OutputIcon from "@mui/icons-material/Output";
import { Handle, Position } from "reactflow";

const OutputNode = ({ data }) => {
  return (
    <>
      <div className="shadow-md rounded-md bg-[#7DB8EB] border-1 border-stone-400 text-white flex flex-col">
        <div className="p-2 flex justify-center items-center gap-3">
          <OutputIcon />
          <div className="text-lg font-bold">Output</div>
        </div>
        <div className="p-3 bg-white">
          <div className="bg-[#EAEAEA] w-full h-8 border-1 rounded-md flex justify-center items-center text-black text-xl">
            {data.value ? data.value : ""}
          </div>
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
    </>
  );
};

export default memo(OutputNode);
