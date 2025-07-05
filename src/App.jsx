import React, { use, useEffect, useState } from "react";

const API_URL = "/api/api/fe/wordle-words";
const WORD_LENGTH = 5

export default function App() {
  const [solution, setSolution] = useState("");
  const [guesses, setGuesses] = useState(Array(6).fill(null));

  useEffect(() => {
    const fetchWord = async () => {
      const response = await fetch(API_URL);
      const words = await response.json();
      const randomWord = words[Math.floor(Math.random() * words.length)];
      setSolution(randomWord);
    };
    fetchWord();
  }, []);

  return (
  <main className="h-screen flex-center flex-col gap-1">
    {guesses.map(guess => {
      return <Line guess={guess ?? ''}/>
    })}
    {solution}
  </main>
  );
}

function Line(guess){
  const tiles = []
  for (let i = 0; i < WORD_LENGTH; i++) {
    const char = guess[i]
    tiles.push(<div key={i} className="tile">{char}</div>)
  }
  return(
    <div className="flex gap-1">
      {tiles}
    </div>
  )
}