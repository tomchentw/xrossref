import {
  default as React,
  Component,
  PropTypes,
} from "react";

import {
  default as Rx,
} from "rx";

import {
  default as ReposTable,
} from "../components/ReposTable";

export default class ReposTableContainer extends Component {

  static contextTypes = {
    repoActions: PropTypes.object,
    repoStore: PropTypes.object,
  }

  state = {
    windowWidth: 1000,
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
