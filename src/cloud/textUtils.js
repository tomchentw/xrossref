export function textToNumber(text) {
  return parseInt(
    text.replace(`,`, ``)
  , 10);
}

export function parseTextIntoNum(text, regExp, defaultIfNotExist = 0) {
  if (regExp.test(text)) {
    return textToNumber(text.match(regExp)[1]);
  } else {
    return defaultIfNotExist;
  }
}
