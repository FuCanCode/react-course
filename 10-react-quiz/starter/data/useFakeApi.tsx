import { useEffect, useState } from "react";
const QUIZ_URL = "http://localhost:3000/questions";

interface QuizItem {
  id: string;
  question: string;
  options: string[];
  correctOption: number;
  points: number;
}

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
