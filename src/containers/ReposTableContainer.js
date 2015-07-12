import {default as React, PropTypes} from "react";
import {default as Rx} from "rx";

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
    this.state = {
      windowWidth: 1000,
    };
  }

  componentWillMount () {
    this.context.repoStore.repos.subscribe((repos) => {
      this.setState({
        repos,
      });
    });
  }

  componentDidMount () {
    this.resizeDisposable = Rx.Observable.fromEvent(window, "resize")
      .debounce(100)
      .startWith(0)
      .subscribe(() => this.setState({windowWidth: window.innerWidth}));
  }

  componentWillUnmount () {
    this.resizeDisposable.dispose();
  }

  render () {
    const {state} = this;

    return (
      <ReposTable
        windowWidth={state.windowWidth}
        repos={state.repos}
        onRepoRemove={this.context.repoActions.removeOne}
      />
    );
  }
}

export default ReposTableContainer;
