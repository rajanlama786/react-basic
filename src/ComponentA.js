import React, { useContext } from "react";
import { Counter } from "./Counter";
import { CounterContext } from "./App";

const ComponentA = () => {
  const countercontext = useContext(CounterContext);
  console.log(countercontext);
  const { state, dispatch } = countercontext;
  return (
    <div>
      <button onClick={{ type: "increment", payload: 5 }}>
        Click Me Increment
      </button>
      <button onClick={{ type: "decrement", payload: 5 }}>
        Click Me Decrement
      </button>
    </div>
  );
};

export default ComponentA;
