import React, { useEffect, useState } from "react";

const API_URL = "/api/api/fe/wordle-words";
const WORD_LENGTH = 5;

export default function App() {
  const [solution, setSolution] = useState("");
  const [guesses, setGuesses] = useState(Array(6).fill(null));
  const [currentGuess, setCurrentGuess] = useState("");
  const [isGameOver, setIsGameOver] = useState(false);

  // Keyboard input
  useEffect(() => {
    const handleType = (event) => {
      if (isGameOver) return;

      if (event.key === "Enter") {
        if (currentGuess.length < WORD_LENGTH) return;

        const newGuesses = [...guesses];
        newGuesses[guesses.findIndex((val) => val == null)] = currentGuess;
        setGuesses(newGuesses);
        setCurrentGuess("");

        if (solution === currentGuess) {
          setIsGameOver(true);
        }

        return;
      }

      if (event.key === "Backspace") {
        setCurrentGuess(currentGuess.slice(0, -1));
        return;
      }

      const isLetter = /^[a-z]{1}$/i.test(event.key);
      if (isLetter && currentGuess.length < WORD_LENGTH) {
        setCurrentGuess((old) => old + event.key.toLowerCase());
      }
    };

    window.addEventListener("keydown", handleType);
    return () => {
      window.removeEventListener("keydown", handleType);
    };
  }, [currentGuess, isGameOver, solution, guesses]);

  // Fetching Word
  useEffect(() => {
    const fetchWord = async () => {
      const response = await fetch(API_URL);
      const words = await response.json();
      const randomWord = words[Math.floor(Math.random() * words.length)];
      setSolution(randomWord.toLowerCase());
    };
    fetchWord();
  }, []);

  return (
    <main className="h-screen flex-center flex-col gap-1">
      {guesses.map((guess, i) => {
        const currentGuessIndex = guesses.findIndex((val) => val == null);
        const isCurrentGuess = i === currentGuessIndex;
        const isFinale = isGameOver || i < currentGuessIndex;

        return (
          <Line
            key={i}
            guess={isCurrentGuess ? currentGuess : guess ?? ""}
            solution={solution}
            isFinale={isFinale}
          />
        );
      })}
      {solution}
    </main>
  );
}

function Line({ guess, isFinale, solution }) {
  const tiles = [];

  for (let i = 0; i < WORD_LENGTH; i++) {
    const char = guess[i];
    let className = "";

    if (isFinale) {
      if (char === solution[i]) {
        className = "correct";
      } else if (solution.includes(char)) {
        className = "close";
      } else {
        className = "incorrect";
      }
    }

    tiles.push(
      <div key={i} className={`tile ${className}`}>
        {char}
      </div>
    );
  }

  return <div className="flex gap-1">{tiles}</div>;
}
