import {default as React, PropTypes} from "react";

import {default as ReposTable} from "../components/ReposTable";
import {removeOne} from "../actions/RepoActions";

class ReposTableContainer extends React.Component {

  constructor(...args) {
    super(...args);
  }

  componentWillMount () {
    this.context.repoStore.repos.subscribe((repos) => {
      this.setState({
        repos,
      });
    });
  }

  render () {
    const {props, state} = this;

    return (
      <ReposTable repos={state.repos} />
    );
  }
}

export default ReposTableContainer;
