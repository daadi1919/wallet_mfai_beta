import { useState } from 'react';
import { ethers } from 'ethers';

interface LiquidityPoolProps {
  provider: ethers.providers.Web3Provider | null;
  account: string;
}

export default function LiquidityPool({ provider, account }: LiquidityPoolProps) {
  const [mfaiAmount, setMfaiAmount] = useState('');
  const [bnbAmount, setBnbAmount] = useState('');
  const [lpBalance, setLpBalance] = useState('0');

  const handleAddLiquidity = async () => {
    if (!provider || !account || !mfaiAmount || !bnbAmount) return;

    try {
      // Logique d'ajout de liquidité à implémenter
      console.log('Ajout de liquidité en cours...', { mfaiAmount, bnbAmount });
    } catch (error) {
      console.error('Erreur lors de l\'ajout de liquidité:', error);
    }
  };

  const handleRemoveLiquidity = async () => {
    if (!provider || !account) return;

    try {
      // Logique de retrait de liquidité à implémenter
      console.log('Retrait de liquidité en cours...');
    } catch (error) {
      console.error('Erreur lors du retrait de liquidité:', error);
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-blue-900/30 p-4 rounded mb-4">
        <p className="text-sm text-gray-400">Vos tokens LP</p>
        <p className="text-xl">{lpBalance} LP-MFAI/BNB</p>
      </div>

      <div className="space-y-2">
        <input
          type="number"
          value={mfaiAmount}
          onChange={(e) => setMfaiAmount(e.target.value)}
          placeholder="Montant MFAI"
          className="w-full p-2 rounded bg-blue-900/50 text-white placeholder-gray-400"
        />
        <input
          type="number"
          value={bnbAmount}
          onChange={(e) => setBnbAmount(e.target.value)}
          placeholder="Montant BNB"
          className="w-full p-2 rounded bg-blue-900/50 text-white placeholder-gray-400"
        />
        <button
          onClick={handleAddLiquidity}
          disabled={!mfaiAmount || !bnbAmount}
          className="w-full py-2 px-4 rounded bg-green-500 hover:bg-green-600 disabled:bg-gray-600 disabled:cursor-not-allowed"
        >
          Ajouter de la liquidité
        </button>
      </div>

      <button
        onClick={handleRemoveLiquidity}
        className="w-full py-2 px-4 rounded bg-red-500 hover:bg-red-600"
      >
        Retirer la liquidité
      </button>
    </div>
  );
} 