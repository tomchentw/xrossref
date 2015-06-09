const debug = require("debug")("RouteActions");
import {default as Rx} from "rx";
import {FuncSubject} from "rx-react";

import {default as RouteConstants} from "../constants/RouteConstants";

export const changeUrl = FuncSubject.create();

function applyChangeUrl () {
  return changeUrl.map((url) => {
    return {
      action: RouteConstants.changeUrl,
      payload: {url},
    };
  })
}

/**
 * Register our actions against an updates stream
 * each one of our actions will push operation to apply on the model
 * into the stream.
 */
export function register (updates) {
  Rx.Observable.merge(...[
    applyChangeUrl(),
  ])
    .subscribe(updates);
}
