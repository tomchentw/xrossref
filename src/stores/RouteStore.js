const debug = require("debug")("RouteStore");
import {default as Rx} from "rx";

import {default as RouteConstants} from "../constants/RouteConstants";

export default class RouteStore {
  // our store expose 2 streams :
  // `updates`: that should receive actions to be applied on our list of currentUrl
  // `currentUrl`: an observable that will contains our up to date list of currentUrl
  constructor (updates, storesMap, currentUrl) {
    this.updates = updates;
    this.storesMap = storesMap;
    this.currentUrl = new Rx.BehaviorSubject(currentUrl);

    Rx.Observable.merge(...[
      this.handleChangeUrl(),
    ])
      .subscribe(this.currentUrl);
  }

  handleChangeUrl () {
    return this.updates
      .filter(({action}) => RouteConstants.removeOne === action)
      .map(({payload: {url}}) => {
        return url;
      });
  }
}
