import useFetch from "../customHooks/useFetch.jsx";

// 오늘의 명언
export default function StopWatch() {
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
}
