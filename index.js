const axios = require("axios");
const fs = require("fs");
const path = require("path");

const BLOCKSCOUT_API_BASE = "https://soneium.blockscout.com/api";
const SNAPSHOT_BLOCK = 3747022; 
const REQUEST_DELAY = 500; 

const inputFile = path.join(__dirname, "wallet.txt");
const outputFile = path.join(__dirname, "result.txt");

const isValidAddress = (address) => {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
};

const maskWalletAddress = (address) =>
  `${address.slice(0, 6)}...${address.slice(-4)}`;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const checkWalletEligibility = async (walletAddress) => {
  if (!isValidAddress(walletAddress)) {
    return `❌ ${walletAddress} - Invalid wallet address format`;
  }

  const apiUrl = `${BLOCKSCOUT_API_BASE}?module=account&action=txlist&address=${walletAddress}&block=${SNAPSHOT_BLOCK}`;

  try {
    const response = await axios.get(apiUrl);

    if (response.data.status !== "1") {
      throw new Error(response.data.message || "API returned error status");
    }

    const transactions = response.data.result;
    const maskedAddress = maskWalletAddress(walletAddress);

    if (transactions && transactions.length > 0) {
      const txCount = transactions.length;
      console.log(
        `✅ Address ${maskedAddress} found in the snapshot! (${txCount} transactions)`
      );
      return `✅ ${maskedAddress} - Found in the snapshot with ${txCount} transactions`;
    } else {
      console.log(`❌ Address ${maskedAddress} not found in the snapshot.`);
      return `❌ ${maskedAddress} - Not found in the snapshot.`;
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    console.error(`Failed to check address ${walletAddress}:`, errorMessage);
    return `⚠️ ${maskWalletAddress(
      walletAddress
    )} - Check failed: ${errorMessage}`;
  }
};

const main = async () => {
  console.log(
    `🔍 Starting eligibility check for Soneium OG Badge (Block ${SNAPSHOT_BLOCK})...\n`
  );

  try {
    if (!fs.existsSync(inputFile)) {
      throw new Error(`Input file not found: ${inputFile}`);
    }

    const walletAddresses = fs
      .readFileSync(inputFile, "utf-8")
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    if (walletAddresses.length === 0) {
      throw new Error("No wallet addresses found in input file");
    }

    console.log(`📋 Found ${walletAddresses.length} addresses to check\n`);

    const results = [];

    for (const [index, wallet] of walletAddresses.entries()) {
      const result = await checkWalletEligibility(wallet);
      results.push(result);

      if (index < walletAddresses.length - 1) {
        await sleep(REQUEST_DELAY);
      }
    }

    fs.writeFileSync(outputFile, results.join("\n"), "utf-8");
    console.log(`\n✨ Results saved in ${outputFile}`);

    const eligible = results.filter((r) => r.includes("✅")).length;
    const ineligible = results.filter((r) => r.includes("❌")).length;
    const errors = results.filter((r) => r.includes("⚠️")).length;

    console.log("\n📊 Summary:");
    console.log(`Eligible: ${eligible}`);
    console.log(`Not eligible: ${ineligible}`);
    console.log(`Errors: ${errors}`);
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
};

main();
