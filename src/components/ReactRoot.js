import {default as React, PropTypes} from "react";
import {Styles, AppBar, TextField} from "material-ui";
import {Table, Column} from "fixed-data-table";

require("fixed-data-table/dist/fixed-data-table.css");

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
    const {repos} = props;
    const rowGetter = (rowIndex) => repos[rowIndex];

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
        <Table
          rowHeight={50}
          rowGetter={rowGetter}
          rowsCount={repos.length}
          width={1000}
          height={600}
          headerHeight={50}>
          <Column
            label="Name"
            width={100}
            dataKey="name"
          />
          <Column
            label="Stars"
            width={60}
            dataKey="stargazers_count"
          />
          <Column
            label="Forks"
            width={60}
            dataKey="forks_count"
          />
          <Column
            label="Open Issues"
            width={60}
            dataKey="open_issues"
          />
        </Table>
      </div>
    );
  }
}

export default ReactRoot;
