import logo from "./logo.svg";
import "./App.css";
import { useRef, useState } from "react";

function DragAndDrop({ data }) {
  const [list, setList] = useState(data);
  const [dragging, setDragging] = useState(false);

  const dragItem = useRef();
  const dragNode = useRef();

  const handleDragStart = (e, params) => {
    console.log("drag starting..", params);
    dragItem.current = params;
    dragNode.current = e.target;
    dragNode.current.addEventListener("dragend", handleDragEnd);
    setTimeout(() => {
      setDragging(true);
    }, 0);
  };

  const handleDragEnter = (e, params) => {
    console.log("drag enter..", params);
    const currentItem = dragItem.current;
    if (e.target !== dragNode.current) {
      console.log("Target is not the same");
      setList((oldList) => {
        let newList = JSON.parse(JSON.stringify(oldList));
        newList[params.grpI].items.splice(
          params.itemI,
          0,
          newList[currentItem.grpI].items.splice(currentItem.itemI, 1)[0]
        );
        dragItem.current = params;
        return newList;
      });
    }
  };

  const handleDragEnd = () => {
    console.log("Ending drag ...");
    setDragging(false);
    dragNode.current.removeEventListener("dragend", handleDragEnd);
    dragItem.current = null;
    dragNode.current = null;
  };

  const getStyles = (params) => {
    const currentItem = dragItem.current;
    console.log(currentItem);
    console.log(params);
    if (
      currentItem.grpI === params.grpI &&
      currentItem.itemI === params.itemI
    ) {
      console.log(params.grpI);
      console.log(params.itemI);
      return "current dnd-item";
    }
    return "dnd-item";
  };

  return (
    <div className="dragndrop">
      {list.map((grp, grpI) => (
        <>
          <h2>React Sandbox</h2>
          {console.log(grp.title)}
          <div
            key={grp.title}
            className="dndgroup"
            onDragEnter={
              dragging && !grp.items.length
                ? (e) => handleDragEnter(e, { grpI, itemI: 0 })
                : ""
            }
          >
            <div className="group-title">{grp.title}</div>
            {grp.items.map((item, itemI) => (
              <div
                draggable
                className={dragging ? getStyles({ grpI, itemI }) : "dnd-item"}
                key={item}
                onDragStart={(e) => {
                  handleDragStart(e, { grpI, itemI });
                }}
                onDragEnter={
                  dragging
                    ? (e) => {
                        handleDragEnter(e, { grpI, itemI });
                      }
                    : null
                }
              >
                {item}
              </div>
            ))}
          </div>
        </>
      ))}
    </div>
  );
}

export default DragAndDrop;
