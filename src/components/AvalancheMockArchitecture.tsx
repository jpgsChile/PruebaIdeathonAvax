import React, { useState } from 'react';
import { useAvalanche } from '../context/AvalancheMockContext';
import { SOLIDITY_CONTRACT_SNIPPETS } from '../data/mockData';
import { Layers, Zap, Cpu, Code, Activity, Network, Check, Copy } from 'lucide-react';

export const AvalancheMockArchitecture: React.FC = () => {
  const { wallet, transactions, openTxModal } = useAvalanche();
  const [activeContractTab, setActiveContractTab] = useState<'SkillAgentRegistry' | 'SoulboundReputation' | 'ImpactVault'>('SkillAgentRegistry');
  const [copiedCode, setCopiedCode] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(SOLIDITY_CONTRACT_SNIPPETS[activeContractTab]);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="space-y-12">
      <div className="rounded-xl bg-gradient-to-b from-[#181d2a] to-[#0f121a] border border-slate-800 p-8 sm:p-10">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-mono-code text-[#E84142] uppercase tracking-wider mb-2">
            <span>Core Infrastructure</span>
            <span>·</span>
            <span>Avalanche Consensus & Subnet Architecture</span>
          </div>

          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            ¿Dónde y Por Qué Entra <span className="text-[#E84142]">Avalanche</span>?
          </h2>

          <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
            Una plataforma de Agentes de IA On-Chain e Identidad Verificable no puede operar en blockchains lentas o con gas prohibitivo. Avalanche es la única infraestructura que proporciona las 4 propiedades indispensables para que este sistema sea viable en producción.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-800">
          <div className="p-4 rounded-xl bg-[#121620] border border-slate-800 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-[#E84142]/10 border border-[#E84142]/30 flex items-center justify-center text-[#E84142]">
              <Zap className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-white">Finalidad Sub-Segundo</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Consenso Avalanche Snowman con confirmación irreversible en <strong>&lt;800 ms</strong>. Los agentes y jugadores no sufren lag.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#121620] border border-slate-800 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-[#E84142]/10 border border-[#E84142]/30 flex items-center justify-center text-[#E84142]">
              <Cpu className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-white">Micro-Gas para Agentes</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Tarifas de <strong>~$0.0004 USD</strong> por llamada. Permite que bots ejecuten miles de auditorías y micro-grants sin quebrar la tesorería.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#121620] border border-slate-800 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-[#E84142]/10 border border-[#E84142]/30 flex items-center justify-center text-[#E84142]">
              <Layers className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-white">Subnets & AppChains</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Posibilidad de lanzar una Subnet dedicada con 4,500 TPS aislada de la congestión de DEXs o NFTs externos.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#121620] border border-slate-800 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-[#E84142]/10 border border-[#E84142]/30 flex items-center justify-center text-[#E84142]">
              <Network className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-white">Teleport & ICM Nativo</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Avalanche Interchain Messaging permite que la reputación y los Soulbound Badges viajen entre Subnets sin puentes vulnerables.
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-xl bg-[#121620] border border-slate-800 p-6 space-y-4">
        <div>
          <span className="text-xs font-semibold text-[#E84142] uppercase tracking-wider">Benchmark Técnico</span>
          <h3 className="text-xl font-bold text-white mt-0.5">
            Comparativa de Redes para Agentes Autónomos & Web3
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Por qué Avalanche es superior para cargas de trabajo de IA automatizada frente a alternativas comunes.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400">
                <th className="py-3 px-4 font-semibold">Parámetro Clave</th>
                <th className="py-3 px-4 font-semibold text-[#E84142] bg-[#E84142]/5">Avalanche (C-Chain / Subnet)</th>
                <th className="py-3 px-4 font-semibold">Ethereum L1</th>
                <th className="py-3 px-4 font-semibold">Polygon PoS</th>
                <th className="py-3 px-4 font-semibold">Solana</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono-code">
              <tr>
                <td className="py-3 px-4 font-sans text-slate-300 font-medium">Tiempo de Finalidad</td>
                <td className="py-3 px-4 text-emerald-400 font-bold bg-[#E84142]/5">&lt;0.8 segundos (Instantáneo)</td>
                <td className="py-3 px-4 text-slate-400">12 a 15 minutos (Probabilística)</td>
                <td className="py-3 px-4 text-slate-400">2 a 4 segundos</td>
                <td className="py-3 px-4 text-slate-400">~12.8 segundos (Root finality)</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-sans text-slate-300 font-medium">Costo de Ejecución por Agente</td>
                <td className="py-3 px-4 text-emerald-400 font-bold bg-[#E84142]/5">~$0.0004 USD</td>
                <td className="py-3 px-4 text-rose-400">$8.00 a $45.00 USD</td>
                <td className="py-3 px-4 text-slate-400">~$0.02 USD</td>
                <td className="py-3 px-4 text-slate-400">~$0.001 USD</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-sans text-slate-300 font-medium">Aislamiento de Carga (Subnets)</td>
                <td className="py-3 px-4 text-emerald-400 font-bold bg-[#E84142]/5">Sí (L1s nativos dedicados)</td>
                <td className="py-3 px-4 text-slate-500">No (Red única compartida)</td>
                <td className="py-3 px-4 text-slate-400">Parcial (AppChains CDK)</td>
                <td className="py-3 px-4 text-slate-500">No (Monolítica)</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-sans text-slate-300 font-medium">Mensajería Entre Cadenas</td>
                <td className="py-3 px-4 text-emerald-400 font-bold bg-[#E84142]/5">Teleport / ICM con firmas BLS</td>
                <td className="py-3 px-4 text-slate-400">Bridges 3P (Riesgo de hack)</td>
                <td className="py-3 px-4 text-slate-400">AggLayer</td>
                <td className="py-3 px-4 text-slate-400">Wormhole</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-sans text-slate-300 font-medium">Huella Energética (ESG)</td>
                <td className="py-3 px-4 text-emerald-400 font-bold bg-[#E84142]/5">Neutral en Carbono (PoS Liviano)</td>
                <td className="py-3 px-4 text-slate-400">Bajo consumo post-Merge</td>
                <td className="py-3 px-4 text-slate-400">Bajo</td>
                <td className="py-3 px-4 text-slate-400">Bajo</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-xl bg-[#121620] border border-slate-800 p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono-code text-slate-400">
              <Code className="w-4 h-4 text-[#E84142]" />
              <span>Smart Contracts Desplegados en Avalanche (Mock Simulator)</span>
            </div>
            <h3 className="text-lg font-bold text-white mt-0.5">Código Fuente en Solidity 0.8.20</h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyCode}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors flex items-center gap-1.5 border border-slate-700"
            >
              {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedCode ? 'Copiado!' : 'Copiar Contrato'}</span>
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 p-1 bg-slate-900 rounded-lg border border-slate-800 w-fit">
          <button
            onClick={() => setActiveContractTab('SkillAgentRegistry')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              activeContractTab === 'SkillAgentRegistry'
                ? 'bg-[#E84142] text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            SkillAgentRegistry.sol (Track 01)
          </button>
          <button
            onClick={() => setActiveContractTab('SoulboundReputation')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              activeContractTab === 'SoulboundReputation'
                ? 'bg-[#E84142] text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            SoulboundSkillPass.sol (Track 02)
          </button>
          <button
            onClick={() => setActiveContractTab('ImpactVault')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              activeContractTab === 'ImpactVault'
                ? 'bg-[#E84142] text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            ImpactBountyVault.sol (Track 04)
          </button>
        </div>

        <div className="relative">
          <pre className="p-4 rounded-xl bg-[#090b10] border border-slate-800 text-xs font-mono-code text-slate-300 overflow-x-auto leading-relaxed max-h-[460px] overflow-y-auto">
            {SOLIDITY_CONTRACT_SNIPPETS[activeContractTab]}
          </pre>
        </div>
      </div>

      <div className="rounded-xl bg-[#121620] border border-slate-800 p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono-code text-slate-400">
              <Activity className="w-4 h-4 text-emerald-400" />
              <span>Simulador de Snowtrace Explorer (Avalanche Ledger)</span>
            </div>
            <h3 className="text-lg font-bold text-white mt-0.5">Historial de Bloques y Transacciones en Vivo</h3>
          </div>
          <div className="text-right">
            <span className="text-xs text-slate-400 block">Red Activa:</span>
            <span className="font-mono-code text-xs text-white font-semibold">{wallet.networkName}</span>
          </div>
        </div>

        <div className="space-y-2.5">
          {transactions.map(tx => (
            <div
              key={tx.hash}
              onClick={() => openTxModal(tx)}
              className="cursor-pointer p-4 rounded-xl bg-[#141822] hover:bg-[#181d29] border border-slate-800/70 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-mono-code font-bold text-[#E84142]">{tx.contractName}</span>
                  <span className="text-slate-500">·</span>
                  <span className="font-mono-code text-amber-300">{tx.method}()</span>
                  <span className="text-slate-500">·</span>
                  <span className="text-[11px] text-slate-400 font-mono-code">Bloque #{tx.blockNumber}</span>
                </div>
                <div className="font-mono-code text-[11px] text-slate-400 truncate">
                  Hash: {tx.hash}
                </div>
                <div className="text-slate-300 text-[11px]">{tx.description}</div>
              </div>

              <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-1 shrink-0 text-right pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800/60">
                <div className="font-mono-code text-emerald-400 font-semibold">
                  {tx.finalityTimeMs} ms (<span className="text-slate-400">{tx.gasUsedAvax} AVAX</span>)
                </div>
                <div className="text-[11px] text-slate-400">{tx.timestamp}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
