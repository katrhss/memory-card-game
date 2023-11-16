import { useEffect, useReducer } from "react";
import "../App.css";
import GameArea from "./GameArea";
import ResetBtn from "./ResetBtn";
import Header from "./Header";
import StartingPage from "./StartingPage";
import StartBtn from "./StartBtn";

const icons = [
  "🐛",
  "💰",
  "🎓",
  "📎",
  "💻",
  "🕸️",
  "🌟",
  "🐈",
  "⚛️",
  "🪝",
  "🎉",
  "🔥",
];
const easy = icons.sort(() => Math.random() - 0.5).slice(0, 8);
const medium = icons.sort(() => Math.random() - 0.5).slice(0, 10);
const hard = icons.sort(() => Math.random() - 0.5).slice(0, 12);

const initialState = {
  cards: [],
  matchedCards: [],
  flippedIndexes: [],
  difficulty: "easy",
  // "loading", "started","playing" "wrongFlipped", "finished"
  status: "loading",
};

function reducer(state, action) {
  switch (action.type) {
    case "startGame":
      return {
        ...state,
        cards:
          state.difficulty === "easy"
            ? easy.concat(easy).sort(() => Math.random() - 0.5)
            : state.difficulty === "medium"
            ? medium.concat(medium).sort(() => Math.random() - 0.5)
            : hard.concat(hard).sort(() => Math.random() - 0.5),
        status: "started",
      };
    case "flipCard":
      if (state.status === "wrongFlipped") return state;
      if (state.flippedIndexes.length === 0)
        return {
          ...state,
          flippedIndexes: [action.payload],
          status: "started",
        };

      if (
        state.flippedIndexes.length === 1 &&
        state.flippedIndexes[0] !== action.payload &&
        state.cards[state.flippedIndexes[0]] === state.cards[action.payload]
      )
        return {
          ...state,
          matchedCards: [
            ...state.matchedCards,
            state.cards[state.flippedIndexes[0]],
            state.cards[action.payload],
          ],
          flippedIndexes: [],
        };
      if (state.flippedIndexes[0] === action.payload) return state;
      if (state.flippedIndexes.length === 1)
        return {
          ...state,
          flippedIndexes: [state.flippedIndexes[0], action.payload],
          status: "wrongFlipped",
        };
    /* falls through */

    case "wrongGuess":
      return { ...state, flippedIndexes: [], status: "started" };

    case "reset":
      return {
        ...initialState,
        cards: icons.concat(icons).sort(() => Math.random() - 0.5),
      };
    case "changeDifficulty":
      return { ...state, difficulty: action.payload };
    case "finished":
      return { ...state, status: "finished" };
    default:
      throw new Error("Invalid action");
  }
}

function App() {
  const [
    { cards, matchedCards, flippedIndexes, difficulty, status },
    dispatch,
  ] = useReducer(reducer, initialState);

  useEffect(() => {
    if (status !== "wrongFlipped") return;

    const timer = setTimeout(() => {
      dispatch({ type: "wrongGuess" });
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [status]);

  return (
    <div className="App">
      <Header matchedCards={matchedCards} cards={cards} status={status} />
      {status === "loading" ? (
        <>
          <StartingPage dispatch={dispatch} difficulty={difficulty} />
          <StartBtn dispatch={dispatch} />
        </>
      ) : (
        <>
          <GameArea
            cards={cards}
            flippedIndexes={flippedIndexes}
            matchedCards={matchedCards}
            dispatch={dispatch}
            difficulty={difficulty}
          />
          <ResetBtn
            matchedCards={matchedCards}
            dispatch={dispatch}
            cards={cards}
          />
        </>
      )}
    </div>
  );
}

export default App;
