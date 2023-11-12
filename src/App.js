import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [cards, setCards] = useState([]);
  const [showCard, setShowCard] = useState(false);
  const [selectedCard, setSelectedCard] = useState();

  function handleClick(index) {
    setSelectedCard(index);
  }

  useEffect(() => {
    const icons = ["🐛", "💰", "🎓", "📎", "💻", "🕸️", "🌟", "🐈"];
    setCards(icons.concat(icons).sort(() => Math.random() - 0.5));
  }, []);

  return (
    <div className="App">
      <div className="container">
        {cards.map((card, index) => (
          <div
            className={`card ${selectedCard === index ? "selected" : "empty"}`}
            key={index}
            onClick={() => handleClick(index)}
          >
            {selectedCard === index && card}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
