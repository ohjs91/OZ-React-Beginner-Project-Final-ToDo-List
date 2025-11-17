import { useEffect, useRef, useState } from "react";
import "./App.css";
import TodoList from "./conponents/TodoList";
import TodoInput from "./conponents/TodoInput";
import Clock from "./conponents/Clock";
import StopWatch from "./conponents/StopWatch";
import Advice from "./conponents/Advice";
import useFetch from "./customHooks/useFetch";
// 데이터 패치
// export const useFetch = (url) => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(url);

//         if (!response.ok) {
//           throw new Error(`HTTP 오류: ${response.status}`);
//         }

//         const result = await response.json();
//         setData(result);
//       } catch (err) {
//         setError(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [url]);

//   return { data, loading, error, setData };
// };
function App() {
  const { data, loading, setData, error } = useFetch(
    "http://localhost:3000/todo"
  );
  return (
    <>
      {loading && <p>불러오는 중...</p>}
      {error && <p>에러발생!! 에러발생!!</p>}
      <Advice />
      <Clock />
      <StopWatch />
      <TodoInput setTodo={setData} />
      <TodoList todo={data} setTodo={setData} />
    </>
  );
}

export default App;
