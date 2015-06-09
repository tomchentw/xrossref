import {default as React} from "react";
import {Styles, AppBar, TextField} from "material-ui";

const {ThemeManager, Colors} = Styles;

class ReactRoot extends React.Component {

  constructor(...args) {
    super(...args);
    this.themeManager = new ThemeManager();
  }

  static get childContextTypes () {
    return {
      muiTheme: React.PropTypes.object
    };
  }

  getChildContext () {
    return {
      muiTheme: this.themeManager.getCurrentTheme()
    };
  }

  componentWillMount () {
    this.themeManager.setPalette({
      accent1Color: Colors.deepOrange500
    });
  }

  render () {
    const {props, state} = this;

    return (
      <div id="react-root">
        <AppBar title="Xrossref" iconClassNameRight="muidocs-icon-navigation-expand-more" />
        <TextField
          style={{width: 400}}
          hintText="Enter GitHub repo (with author's name)"
          defaultValue="facebook/react, angular/angular"
          floatingLabelText="Compare several repos with ," />
      </div>
    );
  }
}

export default ReactRoot;
