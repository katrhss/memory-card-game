import { useEffect, useReducer } from "react";
import "../App.css";
import GameArea from "./GameArea";
import ResetBtn from "./ResetBtn";
import Header from "./Header";

const icons = ["🐛", "💰", "🎓", "📎", "💻", "🕸️", "🌟", "🐈"];

const initialState = {
  cards: [],
  matchedCards: [],
  flippedIndexes: [],

  // "loading", "started", "oneFlipped", "twoFlipped", "finished"
  status: "loading",
};

function reducer(state, action) {
  switch (action.type) {
    case "startGame":
      return {
        ...state,
        cards: icons.concat(icons).sort(() => Math.random() - 0.5),
        status: "started",
      };
    case "flipCard":
      if (state.flippedIndexes.length === 0)
        return {
          ...state,
          flippedIndexes: [action.payload],
          status: "oneFlipped",
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
      if (state.flippedIndexes.length === 1)
        return {
          ...state,
          flippedIndexes: [state.flippedIndexes[0], action.payload],
          status: "wrongFlipped",
        };
    /* falls through */

    case "wrongGuess":
      return { ...state, flippedIndexes: [] };
    case "reset":
      return {
        ...initialState,
        cards: icons.concat(icons).sort(() => Math.random() - 0.5),
      };
    default:
      throw new Error("Invalid action");
  }
}

function App() {
  // const [cards, setCards] = useState([]);
  // const [matchedCards, setMatchedCards] = useState([]);
  // const [flippedIndexes, setFlippedIndexes] = useState([]);

  const [{ cards, matchedCards, flippedIndexes, status }, dispatch] =
    useReducer(reducer, initialState);

  useEffect(() => {
    if (status !== "wrongFlipped") return;

    const timer = setTimeout(() => {
      dispatch({ type: "wrongGuess" });
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [status]);

  useEffect(() => {
    dispatch({ type: "startGame" });
  }, []);

  return (
    <div className="App">
      <Header matchedCards={matchedCards} />
      <GameArea
        cards={cards}
        flippedIndexes={flippedIndexes}
        matchedCards={matchedCards}
        dispatch={dispatch}
      />

      <ResetBtn matchedCards={matchedCards} dispatch={dispatch} />
    </div>
  );
}

export default App;
