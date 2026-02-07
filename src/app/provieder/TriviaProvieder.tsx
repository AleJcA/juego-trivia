"use client";

import { useState } from "react";
import { TriviaContext } from "../context/TriviaContext";
import { PreguntaTrivia } from "../models/preguntaModel";

export const TriviaProvider = ({ children }: { children: React.ReactNode }) => {
  const [preguntas, setPreguntas] = useState<PreguntaTrivia[]>([]);
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [puntaje, setPuntaje] = useState(0);
  const [respondidas, setRespondidas] = useState(0);

  const [respuestaSeleccionada, setRespuestaSeleccionada] =
    useState<boolean | null>(null);
  const [esCorrecta, setEsCorrecta] = useState<boolean | null>(null);


  const cargarPreguntas = (lista: PreguntaTrivia[]) => {
    setPreguntas(lista.slice(0, 5));
    reiniciarTrivia();
  };


  const seleccionarRespuesta = (respuesta: boolean) => {
    if (respuestaSeleccionada !== null) return;

    const pregunta = preguntas[preguntaActual];
    const correcta = respuesta === pregunta.respuestaCorrecta;

    setRespuestaSeleccionada(respuesta);
    setEsCorrecta(correcta);
    setRespondidas((prev) => prev + 1);

    if (correcta) {
      setPuntaje((prev) => prev + pregunta.puntajePregunta);
    }
  };


  const siguientePregunta = () => {
    setRespuestaSeleccionada(null);
    setEsCorrecta(null);
    setPreguntaActual((prev) => prev + 1);
  };

  const reiniciarTrivia = () => {
    setPreguntaActual(0);
    setPuntaje(0);
    setRespondidas(0);
    setRespuestaSeleccionada(null);
    setEsCorrecta(null);
  };

  return (
    <TriviaContext.Provider
      value={{
        preguntas,
        preguntaActual,
        puntaje,
        respondidas,
        respuestaSeleccionada,
        esCorrecta,
        cargarPreguntas,
        seleccionarRespuesta,
        siguientePregunta,
        reiniciarTrivia,
      }}
    >
      {children}
    </TriviaContext.Provider>
  );
};

