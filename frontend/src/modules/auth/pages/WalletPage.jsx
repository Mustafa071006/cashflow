function WalletPage() {
  return <h1 className="text-3xl font-bold">Wallet</h1>;
}

const [selectedWallet, setSelectedWallet] = useState(null);
const [deleteOpen, setDeleteOpen] = useState(false);
const handleDeleteClick = (wallet) => { setSelectedWallet(wallet); setDeleteOpen(true);};

export default WalletPage;