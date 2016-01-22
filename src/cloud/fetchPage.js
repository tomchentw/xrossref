/* global Parse */

/* eslint-disable max-len */
const UA = `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.124 Safari/537.36`;
/* eslint-enable max-len */

export default function fetchPage(options) {
  return Parse.Cloud.httpRequest({
    ...options,
    headers: {
      ...(options.headers || {}),
      "Content-Type": `text/html;charset=utf-8`,
      "User-Agent": UA,
    },
  });
}
