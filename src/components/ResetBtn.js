function ResetBtn({ matchedCards, dispatch }) {
  return (
    <button
      className={matchedCards.length === 16 ? "reset-btn" : "btn-disabled"}
      onClick={() => dispatch({ type: "reset" })}
      disabled={matchedCards.length === 16 ? false : true}
    >
      Reset
    </button>
  );
}

export default ResetBtn;
