import React, { useReducer } from "react";
import Statistics from "./components/Statistics";
import FeedbackOptions from "./components/FeedbackOptions";
import Section from "./components/Section";
import Notification from "./components/Notification";
import "./styles/main.scss";

const initialState = { good: 0, neutral: 0, bad: 0 };
const reducer = (state, { type }) => {
  return { ...state, [type]: state[type] + 1 };
};

export default function App() {
  const [feedbacks, dispatchFeedbacks] = useReducer(reducer, initialState);

  const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const onLeaveFeedback = (evt) => {
    const key = evt.target.innerHTML.toLowerCase();
    dispatchFeedbacks({ type: key });
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
