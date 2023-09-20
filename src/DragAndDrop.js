import logo from "./logo.svg";
import "./App.css";
import { useRef, useState } from "react";

function DragAndDrop({ data }) {
  const [list, setList] = useState(data);
  const [dragging, setDragging] = useState(false);
  const [startItem, setStartItem] = useState([]);
  const [newList, setNewList] = useState(data);

  const dragItem = useRef();
  const dragNode = useRef();
  const dragIndex = useRef();

  const handleDragStart = (e, params, index) => {
    console.log("drag starting..", params);
    dragItem.current = params;
    dragNode.current = e.target;
    dragNode.index = index;
    dragNode.current.addEventListener("dragend", handleDragEnd);
    setStartItem(params);
    setNewList(params);
    setTimeout(() => {
      setDragging(true);
    }, 0);
  };
  /*
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
*/
  const handleDragEnter = (e, params, index) => {
    console.log("drag enter..", params);
    const currentItem = dragItem.current;
    const currentIndex = dragNode.index;

    if (e.target !== dragNode.current) {
      console.log("Target is not the same");

      setList((oldList) => {
        let newList = JSON.parse(JSON.stringify(list));
        console.log(newList);
        console.log(currentIndex);
        console.log(index);
        console.log(currentItem);

        newList.splice(index, 0, currentItem);
        newList.splice(currentIndex, 1);
        return newList;
      });

      // setList((oldList) => {
      //   let newList = JSON.parse(JSON.stringify(oldList));

      //   // const x = newList.splice(1, 1); //REMOVE 1 ELEMENT STARTING FROM INDEX 1
      //   // const x = newList.splice(1, 0, "may"); //APPEND 1 ELEMENT IN INDEX 1
      //   // const x = newList.splice(1, 1, "MAY"); //REMOVE 1 ELEMENT STARTING FROM INDEX 1 AND ATTACH MAY THERE

      //   //newList = y.splice(currentIndex, 1);

      //   // let currentIndex = list.indexOf(curr entItem);
      //   // newList[currentIndex] = params;

      //   // newList.splice(
      //   //   index,
      //   //   0,
      //   //   newList[currentItem.grpI].items.splice(currentItem.itemI, 1)[0]
      //   // );

      //   // newList[params.grpI].items.splice(
      //   //   params.itemI,
      //   //   0,
      //   //   newList[currentItem.grpI].items.splice(currentItem.itemI, 1)[0]
      //   // );
      //   //console.log(newList);
      //   // dragItem.current = params;
      //   return newList;
      // });
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
    if (currentItem === params) {
      return "current dnd-item";
    }
    return "dnd-item";
  };

  const removeItem = (params) => {
    data.map((arr, index) => {
      for (var i = arr.length; i--; ) {
        if (arr[i] === params) {
          arr.splice(i, 1);
          setList(arr);
        }
      }
    });
  };

  return (
    <div className="dragndrop">
      {list.map((item, index) => (
        <>
          <div
            draggable
            className={dragging ? getStyles(item) : "dnd-item"}
            key={item}
            onDragStart={(e) => {
              handleDragStart(e, item, index);
            }}
            onDragEnter={
              dragging
                ? (e) => {
                    handleDragEnter(e, item, index);
                  }
                : null
            }
          >
            <div className="sortable removeable">
              {item}
              <div className="cross" onClick={(e) => removeItem(item)}>
                X
              </div>
            </div>
          </div>
        </>
      ))}
    </div>
  );
}

export default DragAndDrop;
