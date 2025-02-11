import { useState } from "react";

type Item = {
  id: number;
  item_name: string;
};

export default function Todo() {
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState<Item[]>([]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setTodo(event.target.value);
  }

  function handleAdd() {
    if (todo === "") {
      alert("Item cannot be empty");
      return;
    }

    setTodoList((prevState) => {
      return [
        ...prevState,
        {
          id: prevState.length + 1,
          item_name: todo,
        },
      ];
    });
  }

  function handleDelete(id: number) {
    setTodoList((prevState) => {
      return prevState.filter((todo) => todo.id != id);
    });
  }

  return (
    <>
      <div>
        <h3>Create new item</h3>
        <input type="text" onChange={handleChange} value={todo} />
        <button onClick={handleAdd}>Add</button>
      </div>
      <div>
        <ul>
          {todoList.map((todo: Item) => {
            return (
              <li key={todo.item_name} style={{ marginBottom: "0.5rem" }}>
                {todo.item_name}{" "}
                <button onClick={() => handleDelete(todo.id)}>Delete</button>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
