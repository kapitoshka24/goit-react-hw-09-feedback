import React, { useReducer } from "react";
import Statistics from "./components/Statistics";
import FeedbackOptions from "./components/FeedbackOptions";
import Section from "./components/Section";
import Notification from "./components/Notification";
import "./styles/main.scss";

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

export default function App() {
  const [feedbacks, dispatchFeedbacks] = useReducer(reducer, initialState);

  const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const onLeaveFeedback = (evt) => {
    const key = evt.target.innerHTML.toLowerCase();

    switch (key) {
      case "good":
        dispatchFeedbacks({ type: "good" });
        break;
      case "neutral":
        dispatchFeedbacks({ type: "neutral" });
        break;
      case "bad":
        dispatchFeedbacks({ type: "bad" });
        break;
      default:
        throw new Error();
    }
  };

  const countTotalFeedback = () => {
    return Object.values(feedbacks).reduce((prev, curr) => (prev += curr), 0);
  };

  const countPositiveFeedbackPercentage = () => {
    return countTotalFeedback() !== 0
      ? ((feedbacks.good / countTotalFeedback()) * 100).toFixed()
      : 0;
  };

  return (
    <>
      <Section title="Please leave your feedback">
        <FeedbackOptions
          feedbacks={feedbacks}
          onLeaveFeedback={onLeaveFeedback}
          capitalize={capitalize}
        ></FeedbackOptions>
      </Section>
      {countTotalFeedback() ? (
        <Section>
          <Statistics
            feedbacks={feedbacks}
            capitalize={capitalize}
            total={countTotalFeedback}
            positivePercentage={countPositiveFeedbackPercentage}
          />
        </Section>
      ) : (
        <Notification message="No feedback given" />
      )}
    </>
  );
}
