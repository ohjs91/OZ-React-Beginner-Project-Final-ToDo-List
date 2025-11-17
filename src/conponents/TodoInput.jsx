import { useRef } from "react";
// 할일 추가
export default function TodoInput({ setTodo }) {
  const inputValue = useRef(null);
  const addTodo = async () => {
    if (inputValue.current.value.length <= 0) {
      alert("할일을 입력해 주세요");
      return;
    }
    const newTodo = {
      // id: Number(new Date()),
      content: inputValue.current.value,
    };
    try {
      const response = await fetch("http://localhost:3000/todo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTodo),
      });

      if (!response.ok) {
        throw new Error(`HTTP 오류: ${response.status}`);
      }

      const result = await response.json();

      setTodo((prev) => [...prev, result]);
    } catch (err) {
      console.error("error : ", err);
    } finally {
      console.log("todo data 추가 완료");
    }

    inputValue.current.value = "";
  };
  return (
    <div className="card todo_input_wrap">
      <input type="text" ref={inputValue} />
      <button type="button" onClick={addTodo}>
        추가
      </button>
    </div>
  );
}
