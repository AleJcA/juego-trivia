import { createContext } from "react";
import { PreguntaTrivia } from "../models/preguntaModel";

export interface TriviaContextType {
    preguntas: PreguntaTrivia[];
    preguntaActual: number;
    puntaje: number;
    respondidas: number;
    respuestaSeleccionada: boolean | null;
    esCorrecta: boolean | null;
    cargarPreguntas: (preguntas: PreguntaTrivia[]) => void;
    seleccionarRespuesta: (respuesta: boolean) => void;
    siguientePregunta: () => void;
    reiniciarTrivia: () => void;
}

export const TriviaContext = createContext<TriviaContextType>(
    {} as TriviaContextType
);

