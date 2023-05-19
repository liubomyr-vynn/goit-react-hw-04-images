import React, { Component } from 'react';

class Button extends Component {
  render() {
    return (
      <div className="container">
        <button onClick={this.props.onChange} className="Button" type="button">
          Load more
        </button>
      </div>
    );
  }
}
export default Button;
