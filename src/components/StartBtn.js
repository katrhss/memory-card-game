function StartBtn({ dispatch }) {
  return (
    <button
      className="btn start-btn"
      onClick={() => dispatch({ type: "startGame" })}
    >
      Start
    </button>
  );
}

export default StartBtn;
