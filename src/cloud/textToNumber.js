export default function textToNumber (text) {
  return parseInt(
    text.replace(",", "")
  , 10);
}
