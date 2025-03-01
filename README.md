# Wallet Eligibility Checker

A Node.js script to check wallet addresses against the Soneium blockchain snapshot using the Blockscout API.

## Features

- Reads wallet addresses from a text file
- Checks each address against the Soneium blockchain
- Masks wallet addresses for privacy (e.g., `0x1234...5678`)
- Saves results to a separate output file
- Provides visual indicators for address status (✅, ❌, ⚠️)

## Installation

1. Clone this repository or download the script
2. Install the required dependencies:

```bash
npm install axios
```

## Setup

1. Create a text file named `wallet.txt` in the same directory as the script
2. Add wallet addresses to check, one per line:

```text example
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
2. Check each address against the Soneium blockchain
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

- ✅ - Address found in snapshot
- ❌ - Address not found in snapshot
- ⚠️ - Error checking address

## Error Handling

The script includes error handling for:
- API request failures
- File reading/writing issues
- Invalid wallet addresses

## Note

This script uses the Soneium Blockscout API. Make sure you have proper access and respect API rate limits.