const CryptoJS = require("crypto-js");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const encrypt = () => {
  fs.readFile(
    path.join(path.dirname(__dirname), "server/planning.txt"),
    "utf8",
    async (err, data) => {
      if (err) {
        console.error(err);
        return;
      }

      // Encrypt
      const ciphertext = CryptoJS.AES.encrypt(
        data,
        process.env.CRYPTO_SECRET_KEY
      ).toString();

      console.log(ciphertext);
    }
  );
};

const decrypt = () => {
  fs.readFile(
    path.join(path.dirname(__dirname), "server/planning.txt"),
    "utf8",
    async (err, data) => {
      if (err) {
        console.error(err);
        return;
      }

      // Decrypt
      const bytes = CryptoJS.AES.decrypt(data, process.env.CRYPTO_SECRET_KEY);
      const originalText = bytes.toString(CryptoJS.enc.Utf8);

      console.log(originalText); // 'my message'
    }
  );
};

encrypt();
// decrypt();
