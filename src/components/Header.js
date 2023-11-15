function Header({ matchedCards, cards, status }) {
  const text =
    matchedCards.length !== cards.length || status === "loading"
      ? "Memory Card Game"
      : "You won!";

  return (
    <h2
      className={
        matchedCards.length === cards.length ? "victory-text" : "title"
      }
    >
      {text}
    </h2>
  );
}

export default Header;
