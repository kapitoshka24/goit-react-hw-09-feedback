import { createReducer } from "@reduxjs/toolkit";
import * as actions from "./feedbacks-actions";

const initialValue = { good: 0, neutral: 0, bad: 0 };

const feedbacks = createReducer(initialValue, {
  [actions.addFeedback]: (_, { payload }) => payload,
});

export default feedbacks;
