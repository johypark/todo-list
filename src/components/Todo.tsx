import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { categoryState, ITodo, todoState } from "../atoms";

function Todo({ text, id }: ITodo) {
  const [todos, setTodos] = useRecoilState(todoState);
  const category = useRecoilValue(categoryState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setTodos((oldTodos) => {
      const targetIndex = oldTodos[category].findIndex(
        (todo) => todo.id === id
      );
      const sourceCategory = [...oldTodos[category]];
      const destinationCategory = [...oldTodos[name]];
      sourceCategory.splice(targetIndex, 1);
      destinationCategory.push({ text, id });

      return {
        ...oldTodos,
        [category]: sourceCategory,
        [name]: destinationCategory,
      };
    });
  };
  return (
    <li>
      <span>{text}</span>
      {Object.keys(todos).map(
        (value) =>
          value !== category && (
            <button key={value} name={value} onClick={onClick}>
              {value}
            </button>
          )
      )}
    </li>
  );
}

export default Todo;
