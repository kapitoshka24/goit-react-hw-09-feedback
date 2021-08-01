import React from "react";
import shortId from "shortid";
import { useSelector } from "react-redux";
import { getFeedbacks } from "../redux/feedbacks/feedbacks-selectors";

export default function Statistics() {
  const feedbacks = useSelector(getFeedbacks);

  const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const countTotalFeedback = () => {
    if (feedbacks)
      return Object.values(feedbacks).reduce((prev, curr) => (prev += curr), 0);
  };

  const countPositiveFeedbackPercentage = () => {
    return countTotalFeedback() !== 0
      ? ((feedbacks.good / countTotalFeedback()) * 100).toFixed()
      : 0;
  };

  return (
    <>
      <h2>Statistics</h2>

      {Object.entries(feedbacks).map(([key, value]) => (
        <p key={shortId.generate()}>
          {capitalize(key)}: {value}
        </p>
      ))}

      <p>Total: {countTotalFeedback()}</p>
      <p>Positive feedback: {countPositiveFeedbackPercentage()}%</p>
    </>
  );
}
