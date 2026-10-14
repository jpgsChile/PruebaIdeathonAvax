import React, { useState } from 'react';
import { useAvalanche } from '../context/AvalancheMockContext';
import { Droplets, ChevronDown, Check, Shield } from 'lucide-react';
import { NetworkType } from '../types';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const { wallet, switchNetwork, claimFaucet } = useAvalanche();
  const [isNetworkMenuOpen, setIsNetworkMenuOpen] = useState(false);
  const [faucetJustClaimed, setFaucetJustClaimed] = useState(false);

  const handleClaim = () => {
    claimFaucet();
    setFaucetJustClaimed(true);
    setTimeout(() => setFaucetJustClaimed(false), 2200);
  };

  const navItems = [
    { id: 'tracks', label: 'Tracks de Hackathon' },
    { id: 'agents', label: 'POC Agentes On-Chain' },
    { id: 'identity', label: 'Identidad & Reputación' },
    { id: 'gaming', label: 'Gaming Arena' },
    { id: 'impact', label: 'Impacto Real' },
    { id: 'architecture', label: '¿Dónde entra Avalanche?' },
    { id: 'pitch', label: 'Pitch One-Pager' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#0b0d13]/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element) */}
        <button
          onClick={() => setActiveTab('tracks')}
          className="text-left group flex items-center gap-2.5 whitespace-nowrap shrink-0"
        >
          <div className="w-8 h-8 rounded-lg bg-[#E84142] flex items-center justify-center text-white font-bold text-sm shadow-sm group-hover:scale-105 transition-transform">
            ▲
          </div>
          <span className="text-lg font-extrabold tracking-tight text-white">
            SkillMesh <span className="text-[#E84142] font-semibold">AVAX</span>
          </span>
        </button>

        {/* Zone 2: Navigation Links (Single-line clean text) */}
        <nav className="hidden xl:flex items-center gap-6 text-xs font-medium text-slate-300">
          {navItems.map(item => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`whitespace-nowrap shrink-0 transition-colors py-1 relative ${
                  isActive ? 'text-white font-semibold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#E84142] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 Primary Action (Wallet & Faucet Controls) */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={handleClaim}
            disabled={faucetJustClaimed}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors whitespace-nowrap shrink-0 ${
              faucetJustClaimed
                ? 'bg-emerald-950/60 border-emerald-600/50 text-emerald-300'
                : 'bg-slate-900 border-slate-700/80 text-slate-200 hover:border-slate-500 hover:text-white'
            }`}
            title="Reclamar +10 AVAX en el simulador de testnet"
          >
            <Droplets className="w-3.5 h-3.5 text-[#E84142]" />
            <span>{faucetJustClaimed ? '+10 AVAX Añadidos!' : 'Faucet (+10 AVAX)'}</span>
          </button>

          <div className="relative">
            <button
              onClick={() => setIsNetworkMenuOpen(!isNetworkMenuOpen)}
              className="flex items-center gap-2 px-3 py-1.5 bg-[#161a24] border border-slate-800 rounded-lg hover:border-slate-700 transition-colors text-xs"
            >
              <div className="w-2 h-2 rounded-full bg-[#E84142]" />
              <span className="font-mono-code font-bold text-white tabular-nums">
                {wallet.balanceAvax.toFixed(2)} AVAX
              </span>
              <span className="text-slate-500 hidden sm:inline">|</span>
              <span className="font-mono-code text-slate-300 hidden sm:inline">
                {wallet.address.slice(0, 6)}...{wallet.address.slice(-4)}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {isNetworkMenuOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-[#161a24] border border-slate-800 rounded-xl shadow-2xl py-2 z-50 text-xs">
                <div className="px-3 py-2 border-b border-slate-800/80">
                  <div className="text-slate-400 font-medium">Billetera Avalanche Conectada</div>
                  <div className="font-mono-code text-slate-200 text-[11px] truncate mt-0.5">
                    {wallet.address}
                  </div>
                </div>

                <div className="px-3 py-2">
                  <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold mb-1.5">
                    Seleccionar Red Avalanche
                  </div>
                  <div className="space-y-1">
                    <button
                      onClick={() => {
                        switchNetwork('avalanche-fuji');
                        setIsNetworkMenuOpen(false);
                      }}
                      className={`w-full flex items-center justify-between p-2 rounded-lg text-left transition-colors ${
                        wallet.network === 'avalanche-fuji'
                          ? 'bg-[#E84142]/15 text-white border border-[#E84142]/40'
                          : 'text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <div>
                        <div className="font-medium">Avalanche Fuji C-Chain</div>
                        <div className="text-[10px] text-slate-400 font-mono-code">ChainID: 43113 · Testnet</div>
                      </div>
                      {wallet.network === 'avalanche-fuji' && <Check className="w-4 h-4 text-[#E84142]" />}
                    </button>

                    <button
                      onClick={() => {
                        switchNetwork('skillmesh-subnet');
                        setIsNetworkMenuOpen(false);
                      }}
                      className={`w-full flex items-center justify-between p-2 rounded-lg text-left transition-colors ${
                        wallet.network === 'skillmesh-subnet'
                          ? 'bg-[#E84142]/15 text-white border border-[#E84142]/40'
                          : 'text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <div>
                        <div className="font-medium">SkillMesh L1 Subnet</div>
                        <div className="text-[10px] text-slate-400 font-mono-code">Custom AppChain · 4,500 TPS</div>
                      </div>
                      {wallet.network === 'skillmesh-subnet' && <Check className="w-4 h-4 text-[#E84142]" />}
                    </button>
                  </div>
                </div>

                <div className="px-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <Shield className="w-3 h-3 text-emerald-400" /> Reputación On-Chain
                  </span>
                  <span className="font-mono-code font-bold text-emerald-400">{wallet.reputationScore}/100</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="xl:hidden flex items-center gap-2 overflow-x-auto px-4 py-2 border-t border-slate-800/80 bg-[#0e111a] no-scrollbar">
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`text-xs px-3 py-1 rounded-md whitespace-nowrap transition-colors ${
              activeTab === item.id ? 'bg-[#E84142] text-white font-medium' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </header>
  );
};
