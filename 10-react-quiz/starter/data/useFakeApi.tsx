import { useEffect, useState } from "react";
import { QuizItem } from "./quizReducer";
export const QUIZ_URL = "http://localhost:3000/questions";

function useFakeApi() {
  const [data, setData] = useState<QuizItem[]>([]);

  useEffect(() => {
    const fetchAll = async function () {
      const res = await fetch(QUIZ_URL);

      if (!res.ok) console.log("Danger Error Alert");

      const data = await res.json();

      setData(data);
      console.log(data);
    };
    fetchAll();
  }, []);

  return data;
}

export default useFakeApi;
