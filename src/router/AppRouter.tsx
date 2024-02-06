import React, { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { TestPage } from "../pages/TestPage";
import { ResultPage } from "../pages/ResultPage";

// Definición de la interfaz para el objeto de resultado del test
interface Result {
  score: number; // Puntaje obtenido en el test
  answers?: { // Array de respuestas del usuario
    question: string; // Pregunta
    correctAnswer: string; // Respuesta correcta
    isCorrect: boolean; // Indicador de si la respuesta fue correcta o no
  }[];
}

// Componente principal de enrutamiento de la aplicación
export const AppRouter: React.FC = () => {
  // Estado para almacenar el resultado del test
  const [result, setResult] = useState<Result>({ score: 0, answers: [] });

  return (
    <Routes>
      {/* Ruta para la página de prueba */}
      <Route path="/test" element={<TestPage setResult={setResult} />} />
      
      {/* Ruta para la página de resultados */}
      <Route path="/result" element={<ResultPage result={result} />} />
      
      {/* Ruta de redirección por defecto que dirige al usuario a la página de prueba */}
      <Route path="/*" element={<Navigate to="/test" />} />
    </Routes>
  );
};
