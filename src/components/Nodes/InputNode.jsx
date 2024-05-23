import React, { memo } from "react";
import InputIcon from "@mui/icons-material/Input";
import { Handle, Position } from "reactflow";

const InputNode = ({ data }) => {
  return (
    <>
      <div className="shadow-md rounded-md bg-[#7DB8EB] border-1 border-stone-400 text-white flex flex-col">
        <div className="p-2 flex justify-center items-center gap-3">
          <InputIcon />
          <div className="text-lg font-bold">Input</div>
        </div>
        <div className="p-3 bg-white">
          <input
            type="number"
            className="bg-[#EAEAEA] outline-none  text-black p-2 w-20 rounded-md text-center"
            onChange={(e) => (data.value = e.target.value)}
          />
        </div>
        <Handle
          type="source"
          position={Position.Right}
          className="bg-transparent border-none  h-7 w-4 -right-2"
        />
      </div>
    </>
  );
};

export default memo(InputNode);
