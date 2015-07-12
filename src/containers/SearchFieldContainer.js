import {default as React, PropTypes} from "react";
import {TextField} from "material-ui";

class SearchFieldContainer extends React.Component {

  static get contextTypes () {
    return {
      muiTheme: PropTypes.object,
      repoActions: PropTypes.object,
      routeStore: PropTypes.object,
    };
  }

  constructor(...args) {
    super(...args);

    this.state = {
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleEnterKeyDown = this.handleEnterKeyDown.bind(this);
  }

  componentDidMount () {
    const {currentHash} = this.context.routeStore;
    currentHash
      .map(atob)
      .subscribe(searchTerm => {
        this.setState({ searchTerm });
      });
  }

  handleChange () {
    this.setState({
      searchTerm: this.refs.searchField.getValue(),
    });
  }

  handleEnterKeyDown () {
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

export default SearchFieldContainer;
