import {
  default as Immutable,
} from "immutable";

import {
  default as React,
  Component,
  PropTypes,
} from "react";

import {
  default as AppBar,
} from "material-ui/lib/app-bar";

import {
  default as LeftNav,
} from "material-ui/lib/left-nav";

import {
  default as MenuItem,
} from "material-ui/lib/menus/menu-item";

import "normalize.css";

const HASH_REGEX = /\/?#(.+)/;
const REPO_NAME_REGEX = /\/(\S+)/;

export default class App extends Component {

  static propTypes = {
    onHashChange: PropTypes.func.isRequired,
    topPaths: PropTypes.object.isRequired,
    children: PropTypes.node.isRequired,
  };

  state = {
    isLeftNavOpen: false,
  };

  getMenuItemsFromTopPaths(topPaths) {
    return topPaths.map(topPath => {
      if (!HASH_REGEX.test(topPath)) {
        return (
          <MenuItem
            key={topPath}
            primaryText={topPath}
          />
        );
      }
      // /#ZmFjZWJvb2svcmVhY3QsIGFuZ3VsYXIvYW5ndWxhci5qcw==
      const hash = topPath.match(/\/?#(.+)/)[1]; // ZmFjZWJvb2svcmVhY3QsIGFuZ3VsYXIvYW5ndWxhci5qcw==
      const text = atob(hash) // facebook/react, angular/angular.js
        .split(/,\s+/) // ["facebook/react", "angular/angular.js"]
        .map(ownerRepoStr => {
          if (REPO_NAME_REGEX.test(ownerRepoStr)) {
            return ownerRepoStr.match(/\/(\S+)/)[1];
          } else {
            return ownerRepoStr;
          }
        })
        // [react, angular.js]
        .reduce((acc, name, index, { length: querySize }) => {
          const MAX_NAMES_LENGTH = 22;
          const stringSize = (count, str) => count + str.length + 2;
          const namesWithinLength = MAX_NAMES_LENGTH > acc.reduce(stringSize, 0);

          if (namesWithinLength) {
            acc.push(name); // [react, angular.js]
          }
          if (index + 1 === querySize) {
            const namesStr = acc.join(`, `).slice(0, MAX_NAMES_LENGTH);
            return namesWithinLength ? namesStr : `${namesStr} ... (${querySize})`;
            // "react, angular ... (2)"
          }
          return acc;
        }, []);

      return (
        <MenuItem
          key={hash}
          value={hash}
          primaryText={text}
          onTouchTap={::this.handleMenuItemTouchTap}
        />
      );
    }).toJS();
  }

  handleMenuItemTouchTap(e) {
    console.log(e.target.value)
    this.props.onHashChange(e.target.value);
  }

  handleLeftIconButtonTouchTap() {
    this.setState(state => ({isLeftNavOpen: !state.isLeftNavOpen}));
  }

  render() {
    const { props } = this;

    return (
      <div id="react-root">
        <AppBar
          title="Xrossref"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
          onLeftIconButtonTouchTap={::this.handleLeftIconButtonTouchTap}
        />
        <LeftNav
          docked={false}
          open={this.state.isLeftNavOpen}
        >
          <MenuItem>
            <a href="https://github.com/tomchentw/xrossref#credits">Credits</a>
          </MenuItem>
          <MenuItem
            primaryText="Top Paths"
            menuItems={this.getMenuItemsFromTopPaths(props.topPaths)}
          />
        </LeftNav>
        {props.children}
      </div>
    );
  }
}
