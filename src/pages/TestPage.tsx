import React, { useState, FormEvent, ChangeEvent } from "react";
import { useFetch } from "../hooks/useFetch";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

// Definición de la interfaz para una pregunta del test
interface Question {
  question: string; // Texto de la pregunta
  options: string[]; // Opciones de respuesta
}

// Definición de la interfaz para una respuesta del usuario
interface Answer {
  question: string; // Pregunta a la que corresponde la respuesta
  answer: string; // Opción seleccionada como respuesta
}

// Props del componente TestPage
interface TestPageProps {
  setResult: React.Dispatch<React.SetStateAction<any>>; // Función para establecer el resultado del test
}

// Componente para la página de test
export const TestPage: React.FC<TestPageProps> = ({ setResult }) => {
  
  // Estado para almacenar las respuestas del usuario
  const [resultForm, setResultForm] = useState<{ [key: string]: Answer }>({});
  
  // Obtener las preguntas del servidor mediante una solicitud HTTP
  const { data = [] as Question[] } = useFetch("http://localhost:3001/api/questions/");
  
  // Hook para realizar redirecciones de navegación
  const navigate = useNavigate();

  // Manejador para el envío del formulario
  const onTestSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Evitar comportamiento por defecto del formulario
    
    // Convertir las respuestas del usuario a un array
    const dataResult = Object.values(resultForm);

    // Enviar las respuestas al servidor para su procesamiento
    axios.post('http://localhost:3001/api/questions/result', dataResult)
      .then(response => {
        setResult(response.data); // Actualizar el resultado del test
      })
      .catch(error => {
        console.error('Error en la solicitud:', error); // Manejar errores de la solicitud
      });
    
    navigate("/result"); // Redirigir al usuario a la página de resultados
  };

  // Manejador para el cambio de opciones de respuesta
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target; // Obtener el nombre y el valor del input
    
    // Crear un nuevo objeto de respuesta
    const newAnswer: Answer = {
      question: name, // Nombre de la pregunta
      answer: value // Opción seleccionada como respuesta
    };

    // Actualizar el estado con la nueva respuesta del usuario
    setResultForm(prevState => ({
      ...prevState,
      [name]: newAnswer, // Agregar la nueva respuesta al estado
    }));
  };

  return (
    <div className="background-orange text-dark p-5">
      <div className="container bg-light p-4 rounded">
          <h1 className="text-center mb-4 text-dark" >TEST DE LOS SIMPSONS</h1>
          <p> Con este test demuestra qué tan experto eres en tu serie favorita Los Simpsons </p>
          <hr />
          <form onSubmit={onTestSubmit}>
            {/* Mapear las preguntas y opciones de respuesta */}
            {data?.map((item: Question, index: number) => (
              <div key={index} className="mb-4">
                <h5 className="text-dark">{item.question}</h5>
                {/* Mapear las opciones de respuesta */}
                {item?.options?.map((option: string, optionIndex: number) => (
                  <div key={optionIndex} className="form-check">
                    {/* Input de tipo radio para seleccionar la opción */}
                    <input
                      className="form-check-input input-dark"
                      type="radio"
                      name={item.question} // Nombre del input igual al texto de la pregunta
                      id={`option-${optionIndex}`}
                      value={option} // Valor de la opción
                      onChange={handleInput} // Manejador para el cambio de opción
                      required // Campo obligatorio
                    />
                    {/* Etiqueta para la opción de respuesta */}
                    <label className="form-check-label text-dark" htmlFor={`option-${optionIndex}`}>
                      {option} {/* Texto de la opción */}
                    </label>
                  </div>
                ))}
              </div>
            ))}
            {/* Botón para enviar las respuestas */}
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
