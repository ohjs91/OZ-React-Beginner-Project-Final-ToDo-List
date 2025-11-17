import Todo from "./Todo";

// 할일 리스트
export default function TodoList({ todo, setTodo }) {
  return (
    <div className="card todo_list_wrap">
      <ul>
        {todo?.map((item) => (
          <Todo key={item.id} item={item} setTodo={setTodo} />
        ))}
      </ul>
    </div>
  );
}
