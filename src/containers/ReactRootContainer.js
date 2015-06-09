const debug = require("debug")("ReactRootContainer");
import {default as React} from "react";

import {default as ReactRoot} from "../components/ReactRoot";

import * as RepoActions from "../actions/RepoActions";

class ReactRootContainer extends React.Component {

  constructor(...args) {
    super(...args);
    this.state = {
      repos: [],
    };
  }

  componentWillMount () {
    this.props.repoStore.repos.subscribe((repos) => {
      this.setState({
        repos,
      });
    });
  }

  render () {
    const {props, state} = this;

    return (
      <ReactRoot {...props}
        onSearchEnterKeyDown={RepoActions.searchAll}
        repos={state.repos}
      />
    );
  }
}

export default ReactRootContainer;
