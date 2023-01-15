import numeral from "numeral";

const SHORT_NUMBER_FORMAT = "0,0"; // 140 || 1,400

const LONG_NUMBER_FORMAT = "0.0a"; // 14k

const LARGE_NUMBER_THRESHOLD = 10000;

export function formatNumber(number) {
  return numeral(number).format(
    number >= LARGE_NUMBER_THRESHOLD ? LONG_NUMBER_FORMAT : SHORT_NUMBER_FORMAT
  );
}
