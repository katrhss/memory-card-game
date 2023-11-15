function GameArea({ cards, flippedIndexes, matchedCards, dispatch }) {
  return (
    <div className="container">
      {cards.map((card, index) => (
        <div
          className={`card ${
            flippedIndexes.includes(index) ? "selected" : "empty"
          } ${matchedCards.includes(card) ? "matched" : ""}`}
          key={index}
          onClick={() => dispatch({ type: "flipCard", payload: index })}
        >
          {(flippedIndexes.includes(index) || matchedCards.includes(card)) &&
            card}
        </div>
      ))}
    </div>
  );
}

export default GameArea;
