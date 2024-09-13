import PropTypes from "prop-types";

export const taskPropType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
});

export const onDeletePropType = PropTypes.func.isRequired;
