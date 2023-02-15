import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { categoryState, todoSelector, todoState } from "../atoms";
import CreateCategory from "./CreateCategory";
import CreateTodo from "./CreateTodo";
import Todo from "./Todo";

function TodoList() {
  const todos = useRecoilValue(todoSelector);
  const todo = useRecoilValue(todoState);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };

  return (
    <div>
      <h1>Todos</h1>
      <hr />
      <CreateCategory />
      <hr />
      <select value={category} onInput={onInput}>
        {Object.keys(todo).map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      <CreateTodo />
      {todos?.map((todo) => (
        <Todo key={todo.id} {...todo} />
      ))}
    </div>
  );
}

export default TodoList;
