const debug = require("debug")("RouteActions");
import {default as Rx} from "rx";
import {FuncSubject} from "rx-react";

import {default as RouteConstants} from "../constants/RouteConstants";

export default class RouteActions {
  constructor (updates) {
    this.updates = updates;
    //
    this.changeUrl = FuncSubject.create();
  }

  register () {
    /**
     * Register our actions against an updates stream
     * each one of our actions will push operation to apply on the model
     * into the stream.
     */
    return Rx.Observable.merge(...[
      this.applyChangeUrl(),
    ])
      .subscribe(this.updates);
  }

  applyChangeUrl () {
    return this.changeUrl.map((url) => {
      return {
        action: RouteConstants.changeUrl,
        payload: {url},
      };
    })
  }
}

