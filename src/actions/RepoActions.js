import {default as Rx} from "rx";
import {default as fetch} from "isomorphic-fetch";

export const searchAll = new Rx.Subject();

/**
 * Register our actions against an updates stream
 * each one of our actions will push operation to apply on the model
 * into the stream.
 */
export function register (updates) {
  searchAll.flatMap((terms="") => {
    return Rx.Observable.from(terms.split(",")).flatMap((ownerRepoStr) => {
      return fetch(`https://api.github.com/repos/${ ownerRepoStr }`)
        .then(res => res.json());
    });
  }).subscribe(updates);
}
