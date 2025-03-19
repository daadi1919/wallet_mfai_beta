'use client';

import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import Swap from '@/components/Swap';
import Staking from '@/components/Staking';
import LiquidityPool from '@/components/LiquidityPool';
import LPStaking from '@/components/LPStaking';

export default function Home() {
  const [account, setAccount] = useState('');
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = web3Provider.getSigner();
        const address = await signer.getAddress();
        setProvider(web3Provider);
        setAccount(address);
        setIsConnected(true);
      } catch (error) {
        console.error('Erreur lors de la connexion au wallet:', error);
      }
    } else {
      alert('Veuillez installer MetaMask!');
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-900 to-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Makeflouss AI Wallet</h1>
        
        <div className="bg-blue-800/30 rounded-lg p-6 mb-8">
          {!isConnected ? (
            <button
              onClick={connectWallet}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Connecter le Wallet
            </button>
          ) : (
            <div>
              <p className="mb-2">Adresse: {account}</p>
            </div>
          )}
        </div>

        {isConnected && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-800/30 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">Swap $MFAI</h2>
              <Swap provider={provider} account={account} />
            </div>

            <div className="bg-blue-800/30 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">Staking $MFAI</h2>
              <Staking provider={provider} account={account} />
            </div>

            <div className="bg-blue-800/30 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">Pool de liquidité MFAI/BNB</h2>
              <LiquidityPool provider={provider} account={account} />
            </div>

            <div className="bg-blue-800/30 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">Staking LP MFAI/BNB</h2>
              <LPStaking provider={provider} account={account} />
            </div>
          </div>
        )}
      </div>
    </main>
  );
} 