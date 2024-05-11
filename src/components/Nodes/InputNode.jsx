import React, { memo } from "react";
import InputIcon from "@mui/icons-material/Input";
import { Handle, Position } from "reactflow";
import TextField from "@mui/material/TextField";

const InputNode = ({ data }) => {
  return (
    <>
      <div className="shadow-md rounded-md bg-[#7DB8EB] border-1 border-stone-400 text-white flex flex-col">
        <div className="p-2 flex justify-center items-center gap-3">
          <InputIcon />
          <div className="text-lg font-bold">{data.label}</div>
        </div>
        <div className="p-3 bg-white">
          <TextField
            type="number"
            size="small"
            className="bg-[#EAEAEA]"
            onChange={(e) => (data.value = e.target.value)}
          />
        </div>
        <Handle
          type="source"
          position={Position.Right}
          className="bg-[#FF0000]  h-7 w-4 -right-2"
        />
      </div>
    </>
  );
};

export default memo(InputNode);
