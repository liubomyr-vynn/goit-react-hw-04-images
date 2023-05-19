import React from 'react';

const Button = ({ onChange }) => {
  return (
    <div className="container">
      <button onClick={onChange} className="Button" type="button">
        Load more
      </button>
    </div>
  );
};

export default Button;
