import logo from "./logo.svg";
import "./App.css";
import { useRef, useState } from "react";
import DragAndDrop from "./DragAndDrop";
import PostMeta from "./PostMeta";

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

function App() {
  return (
    <div className="App">
      <PostMeta />
      <DragAndDrop data={data} />
    </div>
  );
}

export default App;
