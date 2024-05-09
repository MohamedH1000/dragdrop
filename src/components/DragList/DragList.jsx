import Button from "@mui/material/Button";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import InputIcon from "@mui/icons-material/Input";
import OutputIcon from "@mui/icons-material/Output";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import CancelIcon from "@mui/icons-material/Cancel";

const DragList = ({ visible }) => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };
  return (
    <div className={`flex flex-col gap-1 ${visible ? "" : "duration-300"}`}>
      <Button
        className="w-full h-[50px]"
        variant="contained"
        style={{ backgroundColor: "transparent", cursor: "grab" }}
        onDragStart={(event) => onDragStart(event, "input")}
        draggable
      >
        <div className="flex justify-between w-full">
          <div className="max-sm:text-[10px]">
            <InputIcon />
            &nbsp;&nbsp; Input
          </div>
          <div className="max-sm:hidden">
            <DragHandleIcon />
          </div>
        </div>
      </Button>
      <Button
        className="w-full h-[50px]"
        variant="contained"
        style={{ backgroundColor: "transparent", cursor: "grab" }}
        onDragStart={(event) => onDragStart(event, "output")}
        draggable
      >
        <div className="flex justify-between w-full">
          <div className="max-sm:text-[10px]">
            <OutputIcon />
            &nbsp;&nbsp; Output
          </div>
          <div className="max-sm:hidden">
            <DragHandleIcon />
          </div>
        </div>
      </Button>
      <Button
        className="w-full h-[50px]"
        variant="contained"
        style={{ backgroundColor: "transparent", cursor: "grab" }}
        onDragStart={(event) => onDragStart(event, "add")}
        draggable
      >
        <div className="flex justify-between w-full">
          <div className="max-sm:text-[10px]">
            <AddCircleIcon />
            &nbsp;&nbsp; Add
          </div>
          <div className="max-sm:hidden">
            <DragHandleIcon />
          </div>
        </div>
      </Button>
      <Button
        className="w-full h-[50px]"
        variant="contained"
        style={{ backgroundColor: "transparent", cursor: "grab" }}
        onDragStart={(event) => onDragStart(event, "substract")}
        draggable
      >
        <div className="flex justify-between w-full">
          <div className="max-sm:text-[10px]">
            <RemoveCircleIcon />
            &nbsp;&nbsp; Substract
          </div>
          <div className="max-sm:hidden">
            <DragHandleIcon />
          </div>
        </div>
      </Button>
      <Button
        className="w-full h-[50px]"
        variant="contained"
        style={{ backgroundColor: "transparent", cursor: "grab" }}
        onDragStart={(event) => onDragStart(event, "multiply")}
        draggable
      >
        <div className="flex justify-between w-full">
          <div className="max-sm:text-[10px]">
            <CancelIcon />
            &nbsp;&nbsp; Multiply
          </div>
          <div className="max-sm:hidden">
            <DragHandleIcon />
          </div>
        </div>
      </Button>
      <Button
        className="w-full h-[50px] text-center"
        variant="contained"
        style={{ backgroundColor: "transparent", cursor: "grab" }}
        onDragStart={(event) => onDragStart(event, "divide")}
        draggable
      >
        <div className="flex justify-between w-full items-center">
          <div className="flex ">
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
            &nbsp;&nbsp;{" "}
            <div className="max-sm:text-[10px] max-sm:mt-2">Divide</div>
          </div>
          <div className="max-sm:hidden">
            <DragHandleIcon />
          </div>
        </div>
      </Button>
    </div>
  );
};

export default DragList;
