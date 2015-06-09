import {default as React, PropTypes} from "react";
import {TextField} from "material-ui";

import {searchAll} from "../actions/RepoActions";

class SearchFieldContainer extends React.Component {

  static get contextTypes () {
    return {
      muiTheme: PropTypes.object,
      repoStore: PropTypes.object,
    };
  }

  static get defaultProps () {
    return {
      searchTerm: "facebook/react, angular/angular.js",
    };
  }

  constructor(...args) {
    super(...args);

    this.handleEnterKeyDown = this.handleEnterKeyDown.bind(this);
  }

  handleEnterKeyDown (e) {
    searchAll(this.refs.searchField.getValue());
  }

  render () {
    const {props, state} = this;

    return (
      <TextField
        ref="searchField"
        style={{width: 400}}
        hintText="Enter GitHub repo (with author's name)"
        defaultValue={props.searchTerm}
        onEnterKeyDown={this.handleEnterKeyDown}
        floatingLabelText="Compare several repos with ," />
    );
  }
}

export default SearchFieldContainer;
