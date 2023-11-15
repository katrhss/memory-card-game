function ResetBtn({ matchedCards, dispatch, cards }) {
  return (
    <button
      className={
        matchedCards.length === cards.length ? "reset-btn" : "btn-disabled"
      }
      onClick={() => dispatch({ type: "reset" })}
      disabled={matchedCards.length === cards.length ? false : true}
    >
      Reset
    </button>
  );
}

export default ResetBtn;
