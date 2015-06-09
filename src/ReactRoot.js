import {default as React} from "react";

class ReactRoot extends React.Component {

  constructor (...args) {
    super(...args);
    this.state = {
    };
  }

  render () {
    const {props, state} = this;

    return (
      <div id="react-root">
        REACT_ROOT!
      </div>
    );
  }
}

export default ReactRoot;
