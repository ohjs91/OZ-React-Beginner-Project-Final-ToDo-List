import { useEffect, useRef, useState } from "react";
import "./App.css";
import TodoList from "./conponents/TodoList";
import TodoInput from "./conponents/TodoInput";
import Clock from "./conponents/Clock";
import StopWatch from "./conponents/StopWatch";
import Advice from "./conponents/Advice";
import useFetch from "./customHooks/useFetch";

function App() {
  const { data, loading, setData, error } = useFetch(
    "http://localhost:3000/todo"
  );
  const [todo, setTodo] = useState([]);
  useEffect(() => {
    if (data) setTodo(data);
  }, [data]);
  return (
    <>
      {loading && <p>불러오는 중...</p>}
      {error && <p>에러발생!! 에러발생!!</p>}
      <Advice />
      <Clock />
      <StopWatch />
      <TodoInput setTodo={setTodo} />
      <TodoList todo={todo} setTodo={setTodo} />
    </>
  );
}

export default App;
