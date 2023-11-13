import { useEffect, useState } from "react";
import "./App.css";

const icons = ["🐛", "💰", "🎓", "📎", "💻", "🕸️", "🌟", "🐈"];

function App() {
  const [cards, setCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [flippedIndexes, setFlippedIndexes] = useState([]);

  const text = matchedCards.length !== 16 ? "Memory Card Game" : "You won!";

  function handleClick(index) {
    if (flippedIndexes.length === 0) setFlippedIndexes([index]);

    if (
      flippedIndexes.length === 1 &&
      flippedIndexes[0] !== index &&
      cards[flippedIndexes[0]] === cards[index]
    ) {
      setMatchedCards([
        ...matchedCards,
        cards[flippedIndexes[0]],
        cards[index],
      ]);
    }

    if (flippedIndexes.length === 1) {
      console.log("Im here");
      setFlippedIndexes([flippedIndexes[0], index]);
      setTimeout(() => {
        setFlippedIndexes([]);
      }, 1000);
    }
  }

  function handleReset() {
    setCards(icons.concat(icons).sort(() => Math.random() - 0.5));
    setFlippedIndexes([]);
    setMatchedCards([]);
  }

  useEffect(() => {
    setCards(icons.concat(icons).sort(() => Math.random() - 0.5));
  }, []);

  return (
    <div className="App">
      <h2 className={matchedCards.length === 16 ? "victory-text" : "text"}>
        {text}
      </h2>
      <div className="container">
        {cards.map((card, index) => (
          <div
            className={`card ${
              flippedIndexes.includes(index) ? "selected" : "empty"
            } ${matchedCards.includes(card) ? "matched" : ""}`}
            key={index}
            onClick={() => handleClick(index)}
          >
            {(flippedIndexes.includes(index) || matchedCards.includes(card)) &&
              card}
          </div>
        ))}
      </div>

      <button
        className={matchedCards.length === 16 ? "reset-btn" : "btn-disabled"}
        onClick={handleReset}
        disabled={matchedCards.length === 16 ? false : true}
      >
        Reset
      </button>
    </div>
  );
}

export default App;
