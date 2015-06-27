import {default as Immutable} from "immutable";
import {default as Rx} from "rx";
import {FuncSubject} from "rx-react";

import * as ParseAPI from "../api/Parse";
import {default as RouteConstants} from "../constants/RouteConstants";

export default class RouteActions {
  constructor (updates) {
    this.updates = updates;
    //
    this.changeUrl = FuncSubject.create();
    this.loadTopPaths = FuncSubject.create();
  }

  register () {
    /**
     * Register our actions against an updates stream
     * each one of our actions will push operation to apply on the model
     * into the stream.
     */
    return Rx.Observable.merge(...[
      this.applyChangeUrl(),
      this.applyLoadTopPaths(),
    ])
      .subscribe(this.updates);
  }

  applyChangeUrl () {
    return this.changeUrl.map((url) => {
      return {
        action: RouteConstants.changeUrl,
        payload: {url},
      };
    });
  }

  applyLoadTopPaths () {
    return this.loadTopPaths.flatMap(() => {
      return ParseAPI.getTopPaths()
        .then(Immutable.fromJS)
        .then((topPaths) => {
          return {
            action: RouteConstants.loadTopPathsSuccess,
            payload: {topPaths},
          };
        });
    });
  }
}

