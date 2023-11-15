function StartingPage({ dispatch, difficulty }) {
  return (
    <div>
      <h2 className="text">Welcome, pick difficulty</h2>
      <select
        value={difficulty}
        onChange={(e) =>
          dispatch({ type: "changeDifficulty", payload: e.target.value })
        }
      >
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
    </div>
  );
}

export default StartingPage;
