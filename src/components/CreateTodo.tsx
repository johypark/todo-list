import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, todoState } from "../atoms";

interface IForm {
  todo: string;
}

function CreateTodo() {
  const setTodos = useSetRecoilState(todoState);
  const category = useRecoilValue(categoryState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const handleValid = ({ todo }: IForm) => {
    setTodos((oldTodos) => ({
      ...oldTodos,
      [category]: [{ text: todo, id: Date.now() }, ...oldTodos[category]],
    }));

    setValue("todo", "");
  };
  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <input
        {...register("todo", {
          required: "Please write a Todo",
        })}
        placeholder="Write a todo"
      />
      <button>Add</button>
    </form>
  );
}

export default CreateTodo;
