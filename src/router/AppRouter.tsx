import React, { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { TestPage } from "../pages/TestPage";
import { ResultPage } from "../pages/ResultPage";

interface Result {
  score: number;
  answers?: {
    question: string;
    correctAnswer: string;
    isCorrect: boolean;
  }[];
}

export const AppRouter: React.FC = () => {
  const [result, setResult] = useState<Result>({ score: 0, answers: [] });

  return (
    <Routes>
      <Route path="/test" element={<TestPage setResult={setResult} />} />
      <Route path="/result" element={<ResultPage result={result} />} />
      <Route path="/*" element={<Navigate to="/test" />} />
    </Routes>
  );
};
