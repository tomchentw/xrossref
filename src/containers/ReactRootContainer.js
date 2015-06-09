import {default as React} from "react";

import {default as ReactRoot} from "../components/ReactRoot";
import {default as createStores} from "./createStores";


class ReactRootContainer extends React.Component {

  constructor(...args) {
    args[0] = createStores();
    super(...args);
  }

  render () {
    const {props, state} = this;

    return (
      <ReactRoot {...props} />
    );
  }
}

export default ReactRootContainer;
