import {default as React, PropTypes} from "react";
import {Styles, AppBar, TextField} from "material-ui";

import {default as ReposTable} from "./ReposTable";

const {ThemeManager, Colors} = Styles;

class ReactRoot extends React.Component {

  constructor(...args) {
    super(...args);
    this.themeManager = new ThemeManager();

    this.state = {
      searchTerm: "facebook/react, angular/angular.js",
    };
    this.handleTextFieldChanged = this.handleTextFieldChanged.bind(this);
    this.handleEnterKeyDown = this.handleEnterKeyDown.bind(this);
  }

  static get childContextTypes () {
    return {
      muiTheme: PropTypes.object
    };
  }

  getChildContext () {
    return {
      muiTheme: this.themeManager.getCurrentTheme()
    };
  }

  static get propTypes () {
    return {
      onSearchEnterKeyDown: PropTypes.func.isRequired,
    };
  }

  componentWillMount () {
    this.themeManager.setPalette({
      accent1Color: Colors.deepOrange500
    });
  }

  handleTextFieldChanged (e) {
    this.setState({
      searchTerm: e.target.value,
    });
  }

  handleEnterKeyDown (e) {
    this.props.onSearchEnterKeyDown(this.state.searchTerm);
  }

  render () {
    const {props, state} = this;

    return (
      <div id="react-root">
        <AppBar title="Xrossref" iconClassNameRight="muidocs-icon-navigation-expand-more" />
        <TextField
          style={{width: 400}}
          hintText="Enter GitHub repo (with author's name)"
          value={state.searchTerm}
          onChange={this.handleTextFieldChanged}
          onEnterKeyDown={this.handleEnterKeyDown}
          floatingLabelText="Compare several repos with ," />
        <ReposTable repos={props.repos} />
      </div>
    );
  }
}

export default ReactRoot;
