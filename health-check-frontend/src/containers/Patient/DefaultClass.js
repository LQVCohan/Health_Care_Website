import React, { Component, Fragment } from "react";

import "./DefaultClass.scss";

class DefaultClass extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  async componentDidUpdate(prevProps, prevState, snapshot) {}
  async componentDidMount() {}

  render() {
    return <div> </div>;
  }
}
const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default DefaultClass;
