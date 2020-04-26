import React from 'react';

const Button = ({name, className="btn btn--primary btn--full", onClick, label, smallText, disabled}) => (
  <button
    type="button"
    name={name}
    className={className}
    onClick={onClick}
    disabled={disabled}
  >
    <span>{label}</span>
    {smallText && <small>{smallText}</small>}
  </button>
)

export default Button
