function GameArea({
  cards,
  flippedIndexes,
  matchedCards,
  dispatch,
  difficulty,
}) {
  return (
    <div
      className={`container ${
        difficulty === "easy"
          ? "easy"
          : difficulty === "medium"
          ? "med"
          : "hard"
      }`}
    >
      {cards.map((card, index) => (
        <div
          className={`card ${
            flippedIndexes.includes(index) ? "selected" : "empty"
          } ${matchedCards.includes(card) ? "matched" : ""}
          
          `}
          key={index}
          onClick={() => dispatch({ type: "flipCard", payload: index })}
          disabled={matchedCards.includes(card) ? true : false}
        >
          {(flippedIndexes.includes(index) || matchedCards.includes(card)) &&
            card}
        </div>
      ))}
    </div>
  );
}

export default GameArea;
