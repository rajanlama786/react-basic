import React, { useReducer } from "react";
export const CounterContext = React.createContext();

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

const Counter = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      {state.counter}
      <button onClick={() => dispatch({ type: "increment", payload: 5 })}>
        Click Me Increment
      </button>
      <button onClick={() => dispatch({ type: "decrement", payload: 5 })}>
        Click Me Decrement
      </button>
    </div>
  );
};
