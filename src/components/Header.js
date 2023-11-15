function Header({ matchedCards }) {
  const text = matchedCards.length !== 16 ? "Memory Card Game" : "You won!";

  return (
    <h2 className={matchedCards.length === 16 ? "victory-text" : "text"}>
      {text}
    </h2>
  );
}

export default Header;
