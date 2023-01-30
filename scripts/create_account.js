/**
 * This example creates a new database and account
 */

require("dotenv").config({ path: "../.env" });
const { AccountManager, CoinType } = require("@iota/wallet");

export default async function create_account() {
  try {
    const manager = await createAccountManager();

    const account = await manager.createAccount({
      alias: "Stefan",
    });
    console.log("Account created:", account);

    const secondAccount = await manager.createAccount({
      alias: "Kaja",
    });
    console.log("Account created:", secondAccount);
  } catch (error) {
    console.log("Error: ", error);
  }
  return [account, secondAccount];
}

async function createAccountManager() {
  const accountManagerOptions = {
    storagePath: "./accounts-database",
    clientOptions: {
      nodes: ["https://api.testnet.shimmer.network"],
      localPow: true,
    },
    coinType: CoinType.Shimmer,
    secretManager: {
      Stronghold: {
        snapshotPath: `./wallet.stronghold`,
        password: `${process.env.SH_PASSWORD}`,
      },
    },
  };

  const manager = new AccountManager(accountManagerOptions);
  await manager.storeMnemonic(process.env.MNEMONIC);
  return manager;
}
