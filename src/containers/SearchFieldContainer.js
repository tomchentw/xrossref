import {
  default as React,
  Component,
  PropTypes
} from "react";

import {
  TextField,
} from "material-ui";

export default class SearchFieldContainer extends Component {

  static contextTypes = {
    muiTheme: PropTypes.object,
    repoActions: PropTypes.object,
    routeStore: PropTypes.object,
  }

  state = {
  }

  componentDidMount () {
    const {currentHash} = this.context.routeStore;
    currentHash
      .map(atob)
      .subscribe(searchTerm => {
        this.setState({ searchTerm });
      });
  }

  handleChange = () => {
    this.setState({
      searchTerm: this.refs.searchField.getValue(),
    });
  }

  handleEnterKeyDown = () => {
    this.context.repoActions.searchAll(this.state.searchTerm);
  }

  render () {
    const {state} = this;

    return (
      <TextField
        ref="searchField"
        style={{width: "100%"}}
        hintText="Enter GitHub repo (with author's name)"
        value={state.searchTerm}
        onChange={this.handleChange}
        onEnterKeyDown={this.handleEnterKeyDown}
        floatingLabelText="Compare several repos with ," />
    );
  }
}
