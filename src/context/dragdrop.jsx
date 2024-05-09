import { createContext, useState } from "react";

const DragAndDrop = createContext("");

const DragProvider = ({ children }) => {
  const sum = (a, b) => {
    return a + b;
  };

  const substract = (a, b) => {
    return a - b;
  };

  const multiply = (a, b) => {
    return a * b;
  };
  const divide = (a, b) => {
    return a / b;
  };
  return (
    <DragAndDrop.Provider value={(sum, substract, multiply, divide)}>
      {children}
    </DragAndDrop.Provider>
  );
};

export default DragProvider;
