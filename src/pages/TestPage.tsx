import React, { useState, FormEvent, ChangeEvent } from "react";
import { useFetch } from "../hooks/useFetch";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

interface Question {
  question: string;
  options: string[];
}

interface Answer {
  question: string;
  answer: string;
}

interface TestPageProps {
  setResult: React.Dispatch<React.SetStateAction<any>>;
}

export const TestPage: React.FC<TestPageProps> = ({ setResult }) => {
  
  const [resultForm, setResultForm] = useState<{ [key: string]: Answer }>({});
  const { data = [] as Question[] } = useFetch("http://localhost:3001/api/questions/");
  const navigate = useNavigate();

  const onTestSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const dataResult = Object.values(resultForm);

    axios.post('http://localhost:3001/api/questions/result', dataResult)
      .then(response => {
        setResult(response.data);
      })
      .catch(error => {
        console.error('Error en la solicitud:', error);
      });
    
    navigate("/result");
  };

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const newAnswer: Answer = {
      question: name,
      answer: value
    };

    setResultForm(prevState => ({
      ...prevState,
      [name]: newAnswer,
    }));
  };

  return (
    <div className="background-orange text-dark p-5">
      <div className="container bg-light p-4 rounded">
          <h1 className="text-center mb-4 text-dark" >TEST DE LOS SIMPSONS</h1>
          <p> Con este test demuestra que tan experto eres en tu serie favorita los simpsons </p>
          <hr />
          <form onSubmit={onTestSubmit}>
          {data?.map((item: Question, index: number) => (
            <div key={index} className="mb-4">
              <h5 className="text-dark">{item.question}</h5>
              {item?.options?.map((option: string, optionIndex: number) => (
                <div key={optionIndex} className="form-check">
                  <input
                    className="form-check-input input-dark"
                    type="radio"
                    name={item.question}
                    id={`option-${optionIndex}`}
                    value={option}
                    onChange={handleInput}
                    required
                  />
                  <label className="form-check-label text-dark" htmlFor={`option-${optionIndex}`}>
                    {option}
                  </label>
                </div>
              ))}
            </div>
          ))}
          <div className="text-center">
            <button type="submit" className="btn btn-primary">
              Enviar Respuestas
            </button>
          </div>
          </form>
    </div>
    </div>
  );
};
