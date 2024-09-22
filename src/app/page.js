// app/page.tsx
"use client";

import { useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult
} from "@hello-pangea/dnd";

export default function Home() {
  const [data, setData] = useState([
    {
      id: "1",
      title: "병수의 할일"
    },
    {
      id: "2",
      title: "현진의 할일"
    },
    {
      id: "3",
      title: "준석의 할일"
    },
    {
      id: "4",
      title: "민희의 할일"
    }
  ]);

  const onDragEnd = (result) => {
    const { destination, source } = result;

    // 타입 에러 제거
    if (!destination) {
      return;
    }

    // 같은 위치로 이동하면 아무것도 안함
    if (destination.index === source.index) {
      return;
    }

    // 정렬하기
    const copyData = [...data];
    const [removed] = copyData.splice(source.index, 1);
    copyData.splice(destination.index, 0, removed);
    setData(copyData);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="todo-lists" direction="horizontal">
        {(provided) => (
          <ol
            className="flex gap-x-3 h-full"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {data.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided) => (
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="border border-black"
                  >
                    {item.title}
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  );
}
