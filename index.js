const axios = require("axios");
const fs = require("fs");
const path = require("path");

const inputFile = path.join(__dirname, "wallet.txt");
const outputFile = path.join(__dirname, "result.txt");

const maskWalletAddress = (address) =>
  `${address.slice(0, 6)}...${address.slice(-4)}`;

const checkWalletEligibility = async (walletAddress) => {
  const apiUrl = `https://soneium.blockscout.com/api?module=account&action=txlist&address=${walletAddress}`;
  try {
    const response = await axios.get(apiUrl);
    const transactions = response.data.result;
    const maskedAddress = maskWalletAddress(walletAddress);

    if (transactions && transactions.length > 0) {
      console.log(`✅ Address ${maskedAddress} found in the snapshot!`);
      return `✅ ${maskedAddress} - Found in the snapshot!`;
    } else {
      console.log(`❌ Address ${maskedAddress} not found in the snapshot.`);
      return `❌ ${maskedAddress} - Not found in the snapshot.`;
    }
  } catch (error) {
    console.error("Failed to check address:", error.message);
    return `⚠️ ${maskWalletAddress(walletAddress)} - Check failed: ${
      error.message
    }`;
  }
};

const main = async () => {
  try {
    const walletAddresses = fs
      .readFileSync(inputFile, "utf-8")
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);
    const results = [];

    console.log("🔍 Starting address check...\n");

    for (const wallet of walletAddresses) {
      const result = await checkWalletEligibility(wallet);
      results.push(result);
    }

    fs.writeFileSync(outputFile, results.join("\n"), "utf-8");
    console.log(`\n📁 Results saved in ${outputFile}`);
  } catch (error) {
    console.error("Failed to process:", error.message);
  }
};

main();
