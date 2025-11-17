import { useEffect, useRef, useState } from "react";
import "./App.css";

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
// 시계
const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    setInterval(() => {
      setTime(new Date());
    }, 1000);
  }, []);
  return <div className="card clock">{time.toLocaleTimeString()}</div>;
};

// 스탑워치
const StopWatch = () => {
  const [time, setTime] = useState(0);
  const [isOn, setIsOn] = useState(false);
  const intervalRef = useRef(null);
  const formatTime = (seconds) => {
    const timeString = `${zero(Math.floor(seconds / 3600))} : ${zero(
      Math.floor((seconds % 3600) / 60)
    )} : ${zero(seconds % 60)}`;
    return timeString;
  };
  function zero(item) {
    return String(item).length < 2 ? `0${item}` : String(item);
  }

  const resetTime = () => {
    setIsOn(false);
    setTime(0);
  };
  useEffect(() => {
    if (isOn) {
      intervalRef.current = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      clearInterval(intervalRef.current);
    };
  }, [isOn]);
  return (
    <>
      <div className="card stop_watch_wrap">
        <div className="stop_watch_display">{formatTime(time)}</div>
        <div className="stop_watch_btn_wrap">
          <button type="button" onClick={() => setIsOn((prev) => !prev)}>
            {isOn ? "끄기" : "켜기"}
          </button>
          <button type="button" onClick={resetTime}>
            리셋
          </button>
        </div>
      </div>
    </>
  );
};

// 오늘의 명언
const Advice = () => {
  const { data, loading, error } = useFetch(
    "https://korean-advice-open-api.vercel.app/api/advice"
  );

  return (
    <div className="card advice_wrap">
      <h2>오늘의 명언</h2>
      {loading && <p>불러오는 중...</p>}
      {error && <p>에러발생!! 에러발생!!</p>}
      <p>
        <strong>{data?.author}</strong>
      </p>
      <p>{data?.authorProfile}</p>
      <p>{data?.message}</p>
    </div>
  );
};

// 할일 추가
const TodoInput = ({ setTodo }) => {
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
};

//할일 리스트
const TodoList = ({ todo, setTodo }) => {
  return (
    <div className="card todo_list_wrap">
      <ul>
        {todo?.map((item) => (
          <Todo key={item.id} item={item} setTodo={setTodo} />
        ))}
      </ul>
    </div>
  );
};
// 할일
const Todo = ({ item, setTodo }) => {
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
};

// 데이터 패치
export const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`HTTP 오류: ${response.status}`);
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error, setData };
};
export default App;
