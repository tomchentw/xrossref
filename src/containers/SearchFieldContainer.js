import {
  default as React,
  Component,
  PropTypes,
} from "react";

import {
  TextField,
} from "material-ui";

export default class SearchFieldContainer extends Component {

  static contextTypes = {
    repoActions: PropTypes.object,
    routeStore: PropTypes.object,
  };

  state = {
  };

  componentDidMount() {
    const { currentHash } = this.context.routeStore;
    currentHash
      .map(atob)
      .subscribe(searchTerm => {
        this.setState({ searchTerm });
      });
  }

  handleChange(event) {
    this.setState({
      searchTerm: event.target.value,
    });
  }

  handleEnterKeyDown() {
    this.context.repoActions.searchAll(this.state.searchTerm);
  }

  render() {
    const { state } = this;

    return (
      <TextField
        style={{ width: `100%` }}
        hintText="Enter GitHub repo (with author's name)"
        value={state.searchTerm}
        onChange={::this.handleChange}
        onEnterKeyDown={::this.handleEnterKeyDown}
        floatingLabelText="Compare several repos with ,"
      />
    );
  }
}
