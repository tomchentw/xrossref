/*global Parse*/

const UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.124 Safari/537.36";

export default function fetchPage ({headers={}, ...restOptions}) {
  headers["Content-Type"] = "text/html;charset=utf-8";
  headers["User-Agent"] = UA;

  return Parse.Cloud.httpRequest({
    headers,
    ...restOptions,
  });
}
