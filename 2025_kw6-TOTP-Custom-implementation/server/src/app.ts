import jsSHA from "jssha";

const period = 30;

const base32tohex = (base32) => {
  const base32chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";

  let bits = "";

  let hex = "";

  const _base32 = base32.replace(/=+$/, "");

  for (let i = 0; i < _base32.length; i++) {
    const val = base32chars.indexOf(base32.charAt(i).toUpperCase());

    if (val === -1) throw new Error("Invalid base32 character in key");

    bits += val.toString(2).padStart(5, "0");
  }

  for (let i = 0; i + 8 <= bits.length; i += 8) {
    const chunk = bits.substr(i, 8);

    hex = hex + parseInt(chunk, 2).toString(16).padStart(2, "0");
  }

  return hex;
};

const generateTOTP = (key: string) => {
  const timestamp = Date.now();
  const epoch = Math.floor(timestamp) / 1000;

  let time = Math.round(epoch / period)
    .toString(16)
    .padStart(16, "0");

  const sha = new jsSHA("SHA-1", "HEX");

  sha.setHMACKey(base32tohex(key), "HEX"); //fix
  sha.update(time);

  const hmac = sha.getHMAC("HEX");

  const offset = parseInt(hmac.substring(hmac.length - 1), 16);

  let otp = (
    parseInt(hmac.substring(offset * 2, 8), 16) & parseInt("7fffffff", 16)
  ).toString();

  const start = Math.max(otp.length - 6, 0);

  otp = otp.substring(start, start + 6);

  const expires =
    Math.ceil((timestamp + 1) / (timestamp * 1000)) * timestamp * 1000;

  return { otp, expires };
};

console.log(generateTOTP("JBSWY3DPEHPK3PXP"));

/*
import express from "express";
const app = express();
const port = 3000;

app.get("/", (req, res) => {});

app.listen(port, () => {
  return console.log(`App is listening at http://localhost:${port}`);
});
*/
