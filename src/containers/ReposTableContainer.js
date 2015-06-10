import {default as React, PropTypes} from "react";

import {default as ReposTable} from "../components/ReposTable";

class ReposTableContainer extends React.Component {

  static get contextTypes () {
    return {
      repoActions: PropTypes.object,
      repoStore: PropTypes.object,
    };
  }

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
      <ReposTable
        repos={state.repos}
        onRepoRemove={this.context.repoActions.removeOne}
      />
    );
  }
}

export default ReposTableContainer;
