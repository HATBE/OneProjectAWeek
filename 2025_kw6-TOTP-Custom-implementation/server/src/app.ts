import jsSHA from "jssha";
import cors from "cors";

const period = 30;

const base32tohex = (base32) => {
  const base32chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
  const cleanBase32 = base32.replace(/=+$/, "").toUpperCase();

  const bits = [...cleanBase32]
    .map((char) => {
      const val = base32chars.indexOf(char);
      if (val === -1) throw new Error("Invalid base32 character in key");
      return val.toString(2).padStart(5, "0");
    })
    .join("");

  return (
    bits
      .match(/.{8}/g)
      ?.map((byte) => parseInt(byte, 2).toString(16).padStart(2, "0"))
      .join("") || ""
  );
};

const generateTOTP = (key: string) => {
  const timestamp = Math.floor(Date.now() / 1000);

  let time = Math.round(Math.floor(timestamp / period))
    .toString(16)
    .padStart(2, "0")
    .padStart(16, "0");

  const sha = new jsSHA("SHA-1", "HEX");

  sha.setHMACKey(base32tohex(key), "HEX");
  sha.update(time);

  const hmac = sha.getHMAC("HEX");

  const offset = parseInt(hmac.slice(-1), 16);

  let otp = (
    parseInt(hmac.slice(offset * 2, offset * 2 + 8), 16) &
    parseInt("7fffffff", 16)
  ).toString();

  const start = Math.max(otp.length - 6, 0);

  const token = otp.substring(start, start + 6).padStart(6, "0");

  const exp = (Math.floor(timestamp / period) + 1) * period;

  return { token, exp };
};

import express from "express";
const app = express();
const port = 3000;

app.use(
  "*",
  cors({
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
    origin: "http://localhost:4200",
    credentials: true,
  })
);

app.get("/:token", (req, res) => {
  res.json(generateTOTP(req.params.token));
});

app.listen(port, () => {
  return console.log(`App is listening at http://localhost:${port}`);
});
