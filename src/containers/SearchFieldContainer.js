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
    const {currentUrl} = this.context.routeStore;
    currentUrl
      .take(1)
      .map(atob)
      .subscribe(searchTerm => {
        this.setState({ searchTerm });
      });
  }

  handleChange (e) {
    this.setState({
      searchTerm: this.refs.searchField.getValue(),
    });
  }

  handleEnterKeyDown (e) {
    this.context.repoActions.searchAll(this.state.searchTerm);
  }

  render () {
    const {props, state} = this;

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
