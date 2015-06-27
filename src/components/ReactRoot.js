import {default as Immutable} from "immutable";
import {default as React, PropTypes} from "react";
import {
  AppBar,
  LeftNav,
  MenuItem,
} from "material-ui";


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
      { type: MenuItem.Types.SUBHEADER, text: "Top Paths" },
    ]).concat(topPaths.map(topPath => {
      return {
        route: topPath,
        text: topPath,
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
