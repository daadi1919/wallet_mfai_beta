import { useState } from 'react';
import { ethers } from 'ethers';

interface SwapProps {
  provider: ethers.providers.Web3Provider | null;
  account: string;
}

export default function Swap({ provider, account }: SwapProps) {
  const [amount, setAmount] = useState('');
  const [swapType, setSwapType] = useState<'buy' | 'sell'>('buy');

  const handleSwap = async () => {
    if (!provider || !account || !amount) return;

    try {
      // Logique de swap à implémenter avec PancakeSwap
      console.log('Swap en cours...', { amount, swapType });
    } catch (error) {
      console.error('Erreur lors du swap:', error);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex space-x-4 mb-4">
        <button
          className={`flex-1 py-2 px-4 rounded ${
            swapType === 'buy'
              ? 'bg-green-500 text-white'
              : 'bg-gray-700 text-gray-300'
          }`}
          onClick={() => setSwapType('buy')}
        >
          Acheter
        </button>
        <button
          className={`flex-1 py-2 px-4 rounded ${
            swapType === 'sell'
              ? 'bg-red-500 text-white'
              : 'bg-gray-700 text-gray-300'
          }`}
          onClick={() => setSwapType('sell')}
        >
          Vendre
        </button>
      </div>

      <div className="space-y-2">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder={`Montant en ${swapType === 'buy' ? 'BNB' : 'MFAI'}`}
          className="w-full p-2 rounded bg-blue-900/50 text-white placeholder-gray-400"
        />
        <button
          onClick={handleSwap}
          disabled={!amount}
          className="w-full py-2 px-4 rounded bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 disabled:cursor-not-allowed"
        >
          {swapType === 'buy' ? 'Acheter MFAI' : 'Vendre MFAI'}
        </button>
      </div>
    </div>
  );
} 