'use client';
import Image from "next/image";
import { TriviaProvider } from "./provieder/TriviaProvieder";
import Trivia from "./componets/Trivia";

export default function Home() {
  return (
    <div> 
      <TriviaProvider>
        <Trivia />
      </TriviaProvider>
    </div>
  );
}