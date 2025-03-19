import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

interface StakingProps {
  provider: ethers.providers.Web3Provider | null;
  account: string;
}

export default function Staking({ provider, account }: StakingProps) {
  const [stakedAmount, setStakedAmount] = useState('0');
  const [rewards, setRewards] = useState('0');
  const [amount, setAmount] = useState('');

  const handleStake = async () => {
    if (!provider || !account || !amount) return;

    try {
      // Logique de staking à implémenter
      console.log('Staking en cours...', amount);
    } catch (error) {
      console.error('Erreur lors du staking:', error);
    }
  };

  const handleUnstake = async () => {
    if (!provider || !account) return;

    try {
      // Logique d'unstaking à implémenter
      console.log('Unstaking en cours...');
    } catch (error) {
      console.error('Erreur lors du unstaking:', error);
    }
  };

  const handleClaimRewards = async () => {
    if (!provider || !account) return;

    try {
      // Logique de claim des récompenses à implémenter
      console.log('Réclamation des récompenses en cours...');
    } catch (error) {
      console.error('Erreur lors de la réclamation des récompenses:', error);
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-blue-900/30 p-4 rounded">
          <p className="text-sm text-gray-400">Montant staké</p>
          <p className="text-xl">{stakedAmount} MFAI</p>
        </div>
        <div className="bg-blue-900/30 p-4 rounded">
          <p className="text-sm text-gray-400">Récompenses</p>
          <p className="text-xl">{rewards} MFAI</p>
        </div>
      </div>

      <div className="space-y-2">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Montant à staker"
          className="w-full p-2 rounded bg-blue-900/50 text-white placeholder-gray-400"
        />
        <button
          onClick={handleStake}
          disabled={!amount}
          className="w-full py-2 px-4 rounded bg-green-500 hover:bg-green-600 disabled:bg-gray-600 disabled:cursor-not-allowed"
        >
          Staker
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={handleUnstake}
          className="py-2 px-4 rounded bg-red-500 hover:bg-red-600"
        >
          Unstake
        </button>
        <button
          onClick={handleClaimRewards}
          className="py-2 px-4 rounded bg-yellow-500 hover:bg-yellow-600"
        >
          Réclamer
        </button>
      </div>
    </div>
  );
} 