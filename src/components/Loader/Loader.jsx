import React, { Component } from 'react';
import { ThreeDots } from 'react-loader-spinner';

class Loader extends Component {
  render() {
    return (
      <div className="loader">
        <ThreeDots
          height="80"
          width="80"
          radius="9"
          color="#4fa94d"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClassName=""
          visible={true}
        />
      </div>
    );
  }
}
export default Loader;
