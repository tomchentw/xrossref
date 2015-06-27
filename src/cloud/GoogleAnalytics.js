/*global Parse*/

import {jws} from "jsrsasign";
import {default as Immutable} from "immutable";

const GRANT_TYPE = "urn:ietf:params:oauth:grant-type:jwt-bearer";

const ENCODED_HEADER = JSON.stringify({
  "alg": "RS256",
  "typ": "JWT",
});

const PROJECT_FIRST_RELEASE_DATE = "2015-06-09";

function getClaim () {
  const iat = Math.floor(Date.now() / 1000);

  return {
    "iss": "536590570788-benkvjcgudodbv6586ea29ivglh0viuk@developer.gserviceaccount.com",
    "scope": "https://www.googleapis.com/auth/analytics.readonly",
    "aud": "https://www.googleapis.com/oauth2/v3/token",
    "exp": iat + 3600,
    "iat": iat,
  };
}

function parseJsonResponse (httpResponse) {
  return JSON.parse(httpResponse.text);
}

function convertGAResultToSortedList ({rows}) {
  return Immutable.fromJS(rows || [])
    .sortBy(list => parseInt(list.last(), 10))
    .reverse()
    .map(list => list.first())
    .toJS();
}

Parse.Cloud.define("topPaths", function(request, response) {
  Parse.Cloud.useMasterKey();

  new Parse.Query("Secret")
    .get("rPq5zSI7pQ")
    .then(secret => secret.get("value"))
    .then(key => {
      const encodedClaim = JSON.stringify(getClaim());
      return jws.JWS.sign(null, ENCODED_HEADER, encodedClaim, key);
    })
    .then(jwt => {
      return Parse.Cloud.httpRequest({
        url: "https://www.googleapis.com/oauth2/v3/token",
        method: "POST",
        body: {
          "grant_type": GRANT_TYPE,
          "assertion": jwt,
        },
      })
        .then(parseJsonResponse, parseJsonResponse)
        .then(({access_token}) => { return access_token; });
    })
    .then(access_token => {
      return Parse.Cloud.httpRequest({
        url: "https://www.googleapis.com/analytics/v3/data/ga",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        params: {
          "ids": `ga:${ process.env.GOOGLE_ANALYTICS_ID }`,
          "start-date": PROJECT_FIRST_RELEASE_DATE,
          "end-date": "yesterday",
          "metrics": "ga:sessions",
          "dimensions": "ga:pagePath",
          "access_token": access_token,
        },
      })
        .then(parseJsonResponse, parseJsonResponse)
        .then(convertGAResultToSortedList);
    })
    .then(response.success, response.error);
});
