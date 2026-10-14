/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AvalancheProvider } from './context/AvalancheMockContext';
import { Header } from './components/Header';
import { TrackOverview } from './components/TrackOverview';
import { AgentSimulator } from './components/AgentSimulator';
import { IdentityReputation } from './components/IdentityReputation';
import { GamingArena } from './components/GamingArena';
import { RealImpactVault } from './components/RealImpactVault';
import { AvalancheMockArchitecture } from './components/AvalancheMockArchitecture';
import { PitchDeckSummary } from './components/PitchDeckSummary';
import { TransactionModal } from './components/TransactionModal';
import { ExternalLink, Sparkles, Layers, ShieldCheck, Heart } from 'lucide-react';

function AppContent() {
  const [activeTab, setActiveTab] = useState<string>('tracks');

  return (
    <div className="min-h-screen bg-[#0b0d13] text-slate-100 flex flex-col selection:bg-[#E84142]/30 selection:text-white">
      {/* Top Navigation conforming to Universal Frontend Design Top Bar Contract */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {activeTab === 'tracks' && <TrackOverview onSelectTrackAction={setActiveTab} />}
        {activeTab === 'agents' && <AgentSimulator />}
        {activeTab === 'identity' && <IdentityReputation />}
        {activeTab === 'gaming' && <GamingArena />}
        {activeTab === 'impact' && <RealImpactVault />}
        {activeTab === 'architecture' && <AvalancheMockArchitecture />}
        {activeTab === 'pitch' && <PitchDeckSummary />}
      </main>

      {/* Snowtrace Explorer Modal */}
      <TransactionModal />

      {/* Clean Footer (No fake telemetry tickers or pseudo-technical clutter) */}
      <footer className="border-t border-slate-800/80 bg-[#0c0e15] py-8 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white">SkillMesh AVAX</span>
            <span>·</span>
            <span>Diseñado para el Hackathon AvaxSkills (avaxskills.com)</span>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => setActiveTab('architecture')}
              className="hover:text-slate-200 transition-colors"
            >
              Arquitectura Avalanche
            </button>
            <button
              onClick={() => setActiveTab('pitch')}
              className="hover:text-slate-200 transition-colors"
            >
              Dossier de Presentación
            </button>
            <a
              href="https://www.avaxskills.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              <span>Sitio Oficial AvaxSkills</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <AvalancheProvider>
      <AppContent />
    </AvalancheProvider>
  );
}
