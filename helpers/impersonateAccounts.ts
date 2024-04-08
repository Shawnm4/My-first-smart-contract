import hardhat from "hardhat";
const impersonateAccounts = async ({ accounts }: { accounts: string[] }) => {
  accounts.forEach(async (account) => {
    await hardhat.network.provider.request({
      method: "hardhat_impersonateAccount",
      params: [account],
    });
  });
};
export default impersonateAccounts;
