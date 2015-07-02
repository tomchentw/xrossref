import {default as Immutable} from "immutable";
import {default as React, PropTypes} from "react";
import {
  AppBar,
  LeftNav,
  MenuItem,
} from "material-ui";

require("normalize.css");

class ReactRoot extends React.Component {

  static get propTypes () {
    return {
      topPaths: PropTypes.object.isRequired,
      children: PropTypes.element.isRequired,
    };
  }

  constructor(...args) {
    super(...args);
  }

  getMenuItemsFromTopPaths (topPaths) {
    return new Immutable.List([
      {
        type: MenuItem.Types.LINK,
        payload: "https://github.com/tomchentw/xrossref#credits",
        text: "Credits",
      },
      { type: MenuItem.Types.SUBHEADER, text: "Top Paths" },
    ]).concat(topPaths.map(topPath => {
      // /#ZmFjZWJvb2svcmVhY3QsIGFuZ3VsYXIvYW5ndWxhci5qcw==
      const hash = topPath.match(/\/?#(.+)/)[1]; // ZmFjZWJvb2svcmVhY3QsIGFuZ3VsYXIvYW5ndWxhci5qcw==
      const text = atob(hash) // facebook/react, angular/angular.js
        .split(/,\s+/) // ["facebook/react", "angular/angular.js"]
        .map(ownerRepoStr => ownerRepoStr.match(/\/(\S+)/)[1]) // [react, angular.js]
        .join(", "); // react, angular.js

      return {
        route: topPath,
        text: text,
      };
    })).toJS();
  }

  render () {
    const {props, state} = this;
    const menuItems = this.getMenuItemsFromTopPaths(props.topPaths);

    return (
      <div id="react-root">
        <AppBar
          title="Xrossref"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
          onLeftIconButtonTouchTap={() => this.refs.leftNav.toggle()}
        />
        <LeftNav ref="leftNav"
          docked={false}
          isInitiallyOpen={false}
          menuItems={menuItems}
        />
        {props.children}
      </div>
    );
  }
}

export default ReactRoot;
