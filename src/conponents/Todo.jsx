// 할일
export default function Todo({ item, setTodo }) {
  const deleteTodo = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/todo/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`HTTP 오류: ${response.status}`);
      }

      setTodo((prev) => prev.filter((el) => el.id !== id));
    } catch (err) {
      console.error("error : ", err);
    } finally {
      console.log("todo data 삭제 완료");
    }
  };
  return (
    <li>
      {item.content}
      <button type="button" onClick={() => deleteTodo(item.id)}>
        삭제
      </button>
    </li>
  );
}
