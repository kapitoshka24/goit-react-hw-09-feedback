import React from "react";
import shortId from "shortid";
import PropTypes from "prop-types";

const Statistics = ({ feedbacks, capitalize, total, positivePercentage }) => (
  <>
    <h2>Statistics</h2>

    {Object.entries(feedbacks).map(([key, value]) => (
      <p key={shortId.generate()}>
        {capitalize(key)}: {value}
      </p>
    ))}

    <p>Total: {total()}</p>
    <p>Positive feedback: {positivePercentage()}%</p>
  </>
);

Statistics.propTypes = {
  options: PropTypes.objectOf(PropTypes.number),
  total: PropTypes.func.isRequired,
  positivePercentage: PropTypes.func.isRequired,
  capitalize: PropTypes.func.isRequired,
};

export default Statistics;
