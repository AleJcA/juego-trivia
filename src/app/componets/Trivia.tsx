'use client'
import { useContext, useEffect } from 'react'

import { PreguntaTrivia } from '../models/preguntaModel'
import { TriviaContext } from '../context/TriviaContext'

export default function Trivia() {

  const {
    preguntas,
    preguntaActual,
    puntaje,
    respuestaSeleccionada,
    esCorrecta,
    seleccionarRespuesta,
    siguientePregunta,
    cargarPreguntas,
    reiniciarTrivia
  } = useContext(TriviaContext)
  // 🔹 Cargar preguntas simuladas
  useEffect(() => {
    const preguntasSimuladas: PreguntaTrivia[] = [
      {
        idPregunas: '1',
        DescripcionPregunta: 'React es una librería de JavaScript',
        opcionRespuesta1: true,
        opcionRespuesta2: false,
        respuestaCorrecta: true,
        puntajePregunta: 1
      },
      {
        idPregunas: '2',
        DescripcionPregunta: 'useEffect se ejecuta antes del render',
        opcionRespuesta1: true,
        opcionRespuesta2: false,
        respuestaCorrecta: false,
        puntajePregunta: 1
      },
      {
        idPregunas: '3',
        DescripcionPregunta: 'Next.js usa React',
        opcionRespuesta1: true,
        opcionRespuesta2: false,
        respuestaCorrecta: true,
        puntajePregunta: 1
      },
      {
        idPregunas: '4',
        DescripcionPregunta: 'TypeScript es un superset de JavaScript',
        opcionRespuesta1: true,
        opcionRespuesta2: false,
        respuestaCorrecta: true,
        puntajePregunta: 1
      },
      {
        idPregunas: '5',
        DescripcionPregunta: 'useState sirve solo para estilos',
        opcionRespuesta1: true,
        opcionRespuesta2: false,
        respuestaCorrecta: false,
        puntajePregunta: 1
      }
    ]

    cargarPreguntas(preguntasSimuladas)
  }, [])

  const totalPreguntas = preguntas.length

  // 🧠 PANTALLA FINAL
  if (preguntaActual >= totalPreguntas) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-900 to-black flex items-center justify-center p-6">
        <div className="w-full max-w-xl bg-neutral-950 border border-neutral-800 rounded-2xl shadow-xl p-8 space-y-6 text-center">
          
          <h1 className="text-2xl font-semibold text-white">
            ¡Trivia finalizada!
          </h1>

          <p className="text-neutral-400">
            Tu puntaje final es
          </p>

          <p className="text-4xl font-bold text-emerald-400">
            {puntaje} / {totalPreguntas}
          </p>

          <button
            onClick={reiniciarTrivia}
            className="w-full py-3 rounded-xl font-semibold bg-white text-black hover:bg-neutral-200 transition-all"
          >
            Reiniciar trivia
          </button>
        </div>
      </div>
    )
  }

  const pregunta = preguntas[preguntaActual]
  if (!pregunta) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-900 to-black flex items-center justify-center p-6">
      <div className="w-full max-w-xl bg-neutral-950 border border-neutral-800 rounded-2xl shadow-xl p-8 space-y-6">
        

        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-white">Trivia Verdadero / Falso</h1>
          <div className="text-sm text-neutral-400">
            Pregunta {preguntaActual + 1} / {totalPreguntas}
          </div>
        </div>


        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 flex items-center justify-between">
          <span className="text-neutral-400 text-sm">Puntaje</span>
          <span className="text-2xl font-bold text-emerald-400">{puntaje}</span>
        </div>


        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
          <p className="text-white text-lg leading-relaxed">
            {pregunta.DescripcionPregunta}
          </p>
        </div>


        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={() => seleccionarRespuesta(true)}
            className={`p-4 rounded-xl border transition-all text-white font-medium
              ${respuestaSeleccionada === true
                ? 'border-emerald-500 bg-emerald-500/10'
                : 'border-neutral-700 hover:border-neutral-500'}
            `}
          >
            Verdadero
          </button>

          <button
            onClick={() => seleccionarRespuesta(false)}
            className={`p-4 rounded-xl border transition-all text-white font-medium
              ${respuestaSeleccionada === false
                ? 'border-rose-500 bg-rose-500/10'
                : 'border-neutral-700 hover:border-neutral-500'}
            `}
          >
            Falso
          </button>
        </div>


        {respuestaSeleccionada !== null && (
          <div className="rounded-xl p-4 text-center text-sm font-medium
            bg-neutral-900 border border-neutral-800">
            {esCorrecta ? (
              <span className="text-emerald-400">Respuesta correcta</span>
            ) : (
              <span className="text-rose-400">Respuesta incorrecta</span>
            )}
          </div>
        )}

        <button
          disabled={respuestaSeleccionada === null}
          onClick={siguientePregunta}
          className={`w-full py-3 rounded-xl font-semibold transition-all
            ${respuestaSeleccionada !== null
              ? 'bg-white text-black hover:bg-neutral-200'
              : 'bg-neutral-800 text-neutral-500 cursor-not-allowed'}
          `}
        >
          Siguiente pregunta
        </button>
      </div>
    </div>
  )
}
