import React from "react";
import shortId from "shortid";
import PropTypes from "prop-types";

const FeedbackOptions = ({ feedbacks, onLeaveFeedback, capitalize }) => (
  <div className="stats">
    {Object.keys(feedbacks).map((key) => (
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

FeedbackOptions.propTypes = {
  options: PropTypes.objectOf(PropTypes.number),
  onLeaveFeedback: PropTypes.func.isRequired,
  capitalize: PropTypes.func.isRequired,
};

export default FeedbackOptions;
