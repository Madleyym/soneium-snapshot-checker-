# Soneium OG Badge Eligibility Checker

A Node.js script to verify wallet eligibility for the Soneium OG Badge by checking against block 3747022 using the Blockscout API.

## About Soneium OG Badge

- 📸 Snapshot taken at block 3747022
- ✅ 426,994 wallets are eligible
- 🏆 Badges will be distributed as Soulbound Badges in the first week of March
- 🔒 Non-transferrable commemorative badge for early contributors

## Features

- Reads wallet addresses from a text file
- Verifies eligibility against the Soneium blockchain snapshot (block 3747022)
- Masks wallet addresses for privacy (e.g., `0x1234...5678`)
- Saves results to a separate output file
- Provides visual indicators for address status (✅, ❌, ⚠️)

## Prerequisites

- Node.js installed on your system
- NPM (Node Package Manager)

## Installation

1. Clone this repository or download the script
2. Install the required dependencies:

```bash
npm install axios
```

## Setup

1. Create a text file named `wallet.txt` in the same directory as the script
2. Add wallet addresses to check, one per line:

```text
0x1234567890abcdef1234567890abcdef12345678
0xabcdef1234567890abcdef1234567890abcdef12
```

## Usage

Run the script using Node.js:

```bash
node index.js
```

The script will:
1. Read addresses from `wallet.txt`
2. Check each address against the Soneium blockchain snapshot (block 3747022)
3. Save results to `result.txt`
4. Display progress in the console

## Output Format

The script generates two types of output:

1. Console output (real-time):
```
🔍 Starting address check...
✅ Address 0x1234...5678 found in the snapshot!
❌ Address 0xabcd...ef12 not found in the snapshot.
📁 Results saved in result.txt
```

2. File output (`result.txt`):
```
✅ 0x1234...5678 - Found in the snapshot!
❌ 0xabcd...ef12 - Not found in the snapshot.
```

## Status Indicators

- ✅ - Address eligible for OG Badge (found in snapshot)
- ❌ - Address not eligible (not found in snapshot)
- ⚠️ - Error checking address

## Error Handling

The script includes error handling for:
- API request failures
- File reading/writing issues
- Invalid wallet addresses

## Dependencies

- `axios`: For making HTTP requests to the Blockscout API
- `fs`: For file system operations (Node.js built-in)
- `path`: For handling file paths (Node.js built-in)

## API Reference

The script uses the Soneium Blockscout API:
- Endpoint: `https://soneium.blockscout.com/api`
- Snapshot Block: 3747022
- Reference Block: [0x9c1a6ef0f3d4cf2ff5844ae0727cdc1c2888650bd6f62bd97e9f8ffa6b8ae430](https://soneium.blockscout.com/block/0x9c1a6ef0f3d4cf2ff5844ae0727cdc1c2888650bd6f62bd97e9f8ffa6b8ae430)

## Important Notes

- The script checks eligibility based on the official snapshot at block 3747022
- Eligible wallets will receive their Soulbound Badge in the first week of March
- The OG Badge is non-transferrable and serves as recognition for early contributors
- Make sure to respect API rate limits when checking multiple addresses

## Support

If you encounter any issues or have questions:
1. Check the console output for error messages
2. Verify your wallet addresses are properly formatted
3. Ensure you have stable internet connection
4. Submit an issue if the problem persists