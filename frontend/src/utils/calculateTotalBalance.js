export default function calculateTotalBalance(wallets) {
  return wallets.reduce(
    (total, wallet) => total + Number(wallet.balance),
    0
  );
}