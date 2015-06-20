import {default as React, PropTypes} from "react";
import {AppBar} from "material-ui";


class ReactRoot extends React.Component {

  static get propTypes () {
    return {
      children: PropTypes.renderable,
    };
  }

  constructor(...args) {
    super(...args);
  }

  render () {
    const {props, state} = this;

    return (
      <div id="react-root">
        <AppBar title="Xrossref" iconClassNameRight="muidocs-icon-navigation-expand-more" />
        {props.children}
      </div>
    );
  }
}

export default ReactRoot;
