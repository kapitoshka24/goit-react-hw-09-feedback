import React, { useEffect, useReducer } from "react";
import shortId from "shortid";
import { useDispatch } from "react-redux";
import { addFeedback } from "../redux/feedbacks/feedbacks-actions";

const initialState = { good: 0, neutral: 0, bad: 0 };
const reducer = (state, action) => {
  switch (action.type) {
    case "good":
      return { ...state, good: state.good + 1 };
    case "neutral":
      return { ...state, neutral: state.neutral + 1 };
    case "bad":
      return { ...state, bad: state.bad + 1 };
    default:
      throw new Error();
  }
};

export default function FeedbackOptions() {
  const dispatch = useDispatch();

  const [state, dispatchState] = useReducer(reducer, initialState);
  useEffect(() => dispatch(addFeedback(state)), [dispatch, state]);

  const onLeaveFeedback = (evt) => {
    const key = evt.target.innerHTML.toLowerCase();

    switch (key) {
      case "good":
        dispatchState({ type: "good" });
        break;
      case "neutral":
        dispatchState({ type: "neutral" });
        break;
      case "bad":
        dispatchState({ type: "bad" });
        break;
      default:
        throw new Error();
    }
  };

  const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div className="stats">
      {Object.keys(state).map((key) => (
        <button
          className="stats__btn"
          key={shortId.generate()}
          onClick={onLeaveFeedback}
        >
          {capitalize(key)}
        </button>
      ))}
    </div>
  );
}
