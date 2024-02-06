import { useNavigate } from "react-router-dom";

interface Result {
  score: number;
  answers?: {
    question: string;
    correctAnswer: string;
    isCorrect: boolean;
  }[];
}
const styleSuccess: React.CSSProperties = {
  color: "green",
};

const styleError: React.CSSProperties = {
  color: "red",
};

export const ResultPage: React.FC<{ result: Result }> = ({ result }) => {
  const navigate = useNavigate();
  const IconCheck = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="green"
      className="bi bi-check-circle"
      viewBox="0 0 16 16"
    >
      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
      <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05" />
    </svg>
  );

  const iconError = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="red"
      className="bi bi-x-circle"
      viewBox="0 0 16 16"
    >
      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
    </svg>
  );

  return (
    <div className="background-orange text-dark p-5">
      <div className="container bg-light p-4 rounded">
        <h4 className="text-center mb-4 text-dark">RESULTADOS DEL TEST</h4>
        <h6>
          Respuestas correctas: {result.score} / {result.answers?.length}
        </h6>
        <hr />
        <form>
          {result.answers?.map((item, index) => (
            <div key={index} className="mb-4">
              <h5 className="text-dark">
                {item.question} {item.isCorrect ? IconCheck : iconError}
              </h5>
              <span className="bi bi-check"></span>
              <p style={item.isCorrect ? styleSuccess : styleError}>
                Respuesta correcta: {item.correctAnswer}
              </p>
            </div>
          ))}
        </form>

        <button 
        type="submit" 
        className="btn btn-primary" 
        onClick={() => {
          navigate("/test");
        }}
        >
          Volver a realizar la prueba
        </button>
      </div>
    </div>
  );
};
