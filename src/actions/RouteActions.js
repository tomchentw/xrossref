import {
  default as Immutable,
} from "immutable";

import {
  default as Rx,
} from "rx";

import {
  FuncSubject,
} from "rx-react";

import * as ParseAPI from "../api/ParseAPI";

import {
  default as RouteConstants,
} from "../constants/RouteConstants";

export default class RouteActions {
  constructor(updates) {
    this.updates = updates;
    //
    this.changeHash = FuncSubject.create();
    this.loadTopPaths = FuncSubject.create();
  }

  register() {
    /**
     * Register our actions against an updates stream
     * each one of our actions will push operation to apply on the model
     * into the stream.
     */
    return Rx.Observable.merge(...[
      this.applyChangeHash(),
      this.applyLoadTopPaths(),
    ])
      .subscribe(this.updates);
  }

  applyChangeHash() {
    return this.changeHash.map((hash) => ({
      action: RouteConstants.changeHash,
      payload: { hash },
    }));
  }

  applyLoadTopPaths() {
    return this.loadTopPaths.flatMap(() => (
      ParseAPI.getTopPaths()
        .then(Immutable.fromJS)
        .then((topPaths) => ({
          action: RouteConstants.loadTopPathsSuccess,
          payload: { topPaths },
        }))
    ));
  }
}
