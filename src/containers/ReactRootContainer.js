const debug = require("debug")("ReactRootContainer");
import {default as React} from "react";

import {default as ReactRoot} from "../components/ReactRoot";

import {default as createStores} from "../createStores";
import * as RepoActions from "../actions/RepoActions";

class ReactRootContainer extends React.Component {

  constructor(...args) {
    super(...args);
    this.state = createStores();
  }

  componentWillMount () {
    this.state.repoStore.repos.subscribe((repos) => {
      this.setState({
        repos,
      });
    });
  }

  render () {
    const {props, state} = this;

    return (
      <ReactRoot
        onSearchEnterKeyDown={RepoActions.searchAll}
        repos={state.repos}
      />
    );
  }
}

export default ReactRootContainer;
