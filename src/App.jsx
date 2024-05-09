import { useState } from "react";
import DragList from "./components/DragList/DragList";
import DropContainer from "./components/DropContainer/DropContainer";
import Header from "./components/Header/Header";

function App() {
  const [visible, setVisible] = useState(true);
  return (
    <div>
      <Header setVisible={setVisible} visible={visible} />
      <div className="flex w-full h-screen mt-3">
        <div
          className={`bg-[#343843]  ${
            visible ? "w-[20%] max-lg:w-[40%]" : "max-sm:hidden"
          }`}
        >
          <DragList visible={visible} />
        </div>
        <div className={`${visible ? "w-[80%] max-lg:w-[60%]" : "w-[100%]"}`}>
          <DropContainer />
        </div>
      </div>
    </div>
  );
}

export default App;
