import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const icons = ["🐛", "💰", "🎓", "📎", "💻", "🕸️", "🌟", "🐈‍⬛"];
    setCards(icons.concat(icons).sort(() => Math.random() - 0.5));
  }, []);

  console.log(cards);
  return (
    <div className="App">
      <div className="container">
        {cards.map((card, index) => (
          <div className="card empty" key={index}>
            {/* {card} */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
