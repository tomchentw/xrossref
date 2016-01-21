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
} from "material-ui/lib/menu/menu-item";

import "normalize.css";

const HASH_REGEX = /\/?#(.+)/;
const REPO_NAME_REGEX = /\/(\S+)/;

export default class App extends Component {

  static propTypes = {
    onHashChange: PropTypes.func.isRequired,
    topPaths: PropTypes.object.isRequired,
    children: PropTypes.node.isRequired,
  };

  getMenuItemsFromTopPaths(topPaths) {
    return new Immutable.List([
      {
        type: MenuItem.Types.LINK,
        payload: `https://github.com/tomchentw/xrossref#credits`,
        text: `Credits`,
      },
      { type: MenuItem.Types.SUBHEADER, text: `Top Paths` },
    ]).concat(topPaths.map(topPath => {
      if (!HASH_REGEX.test(topPath)) {
        return {
          hash: ``,
          text: topPath,
        };
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
            return namesWithinLength ? namesStr : `${ namesStr } ... (${ querySize })`;
            // "react, angular ... (2)"
          }
          return acc;
        }, []);

      return {
        hash,
        text,
      };
    })).toJS();
  }

  handleLeftNavChange(e, key, payload) {
    this.props.onHashChange(payload.hash);
  }

  handleLeftIconButtonTouchTap() {
    this.refs.leftNav.toggle();
  }

  render() {
    const { props } = this;
    const menuItems = this.getMenuItemsFromTopPaths(props.topPaths);

    return (
      <div id="react-root">
        <AppBar
          title="Xrossref"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
          onLeftIconButtonTouchTap={::this.handleLeftIconButtonTouchTap}
        />
        <LeftNav ref="leftNav"
          docked={false}
          isInitiallyOpen={false}
          menuItems={menuItems}
          onChange={::this.handleLeftNavChange}
        />
        {props.children}
      </div>
    );
  }
}
