import React from "react";
import Statistics from "./components/Statistics";
import FeedbackOptions from "./components/FeedbackOptions";
import Section from "./components/Section";
import Notification from "./components/Notification";
import "./styles/main.scss";
import { useSelector } from "react-redux";
import { getFeedbacks } from "./redux/feedbacks/feedbacks-selectors";

export default function App() {
  const feedbacks = useSelector(getFeedbacks);

  const checkIfEmpty =
    Object.values(feedbacks).reduce((prev, curr) => prev + curr, 0) !== 0;

  return (
    <>
      <Section title="Please leave your feedback">
        <FeedbackOptions></FeedbackOptions>
      </Section>
      {checkIfEmpty ? (
        <Section>
          <Statistics />
        </Section>
      ) : (
        <Notification message="No feedback given" />
      )}
    </>
  );
}
