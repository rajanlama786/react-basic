import React, { useReducer } from "react";
import logo from "./logo.svg";
import "./App.css";
import { useRef, useState } from "react";
import DragAndDrop from "./DragAndDrop";
import PostMeta from "./PostMeta";
import ComponentA from "./ComponentA";

export const CounterContext = React.createContext();

const data1 = [5, 10, 20, 50, 100, 200, 300];

const data = [
  {
    title: "group 1",
    items: [1, 2, 3],
  },
  {
    title: "group 2",
    items: [4, 5, 6],
  },
];

const initialState = {
  counter: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "increment":
      return { ...state, counter: state.counter + action.payload };
    case "decrement":
      return { ...state, counter: state.counter - action.payload };
    case "reset":
      return { ...state, counter: 0 };
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="App">
      <CounterContext.Provider value={{ counter: state.counter, dispatch }}>
        <ComponentA />
      </CounterContext.Provider>
      <PostMeta />
      {/* <DragAndDrop data={data} /> */}

      <DragAndDrop data={data1} />
    </div>
  );
}

export default App;
