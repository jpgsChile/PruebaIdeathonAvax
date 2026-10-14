import React, { useState } from 'react';
import { useAvalanche } from '../context/AvalancheMockContext';
import { Check, Copy, X, ShieldCheck, Cpu } from 'lucide-react';

export const TransactionModal: React.FC = () => {
  const { activeModalTx, closeTxModal } = useAvalanche();
  const [copied, setCopied] = useState(false);

  if (!activeModalTx) return null;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-[#11141c] border border-slate-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800/80 bg-[#161a24]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#E84142]/10 border border-[#E84142]/30 flex items-center justify-center text-[#E84142]">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white">Detalle de Transacción Avalanche</h3>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span>{activeModalTx.network === 'avalanche-fuji' ? 'Avalanche Fuji Testnet' : 'SkillMesh L1 Subnet'}</span>
                <span>·</span>
                <span>Bloque #{activeModalTx.blockNumber}</span>
              </div>
            </div>
          </div>
          <button
            onClick={closeTxModal}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5 text-sm">
          <div className="flex items-center justify-between p-3.5 rounded-lg bg-emerald-950/30 border border-emerald-800/40 text-emerald-300">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span className="font-medium">Confirmada y Finalizada On-Chain</span>
            </div>
            <div className="text-xs font-mono-code text-emerald-400">
              Finalidad en {activeModalTx.finalityTimeMs} ms (<span className="text-emerald-300">sub-segundo</span>)
            </div>
          </div>

          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 py-2 border-b border-slate-800/60">
              <span className="text-slate-400">Hash de Transacción</span>
              <div className="sm:col-span-2 flex items-center justify-between gap-2">
                <span className="font-mono-code text-xs text-slate-200 truncate">{activeModalTx.hash}</span>
                <button
                  onClick={() => handleCopy(activeModalTx.hash)}
                  className="p-1 text-slate-400 hover:text-white transition-colors"
                  title="Copiar Hash"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 py-2 border-b border-slate-800/60">
              <span className="text-slate-400">Smart Contract</span>
              <div className="sm:col-span-2 flex items-center justify-between">
                <span className="font-mono-code text-xs text-[#E84142] font-semibold">{activeModalTx.contractName}</span>
                <span className="font-mono-code text-xs text-slate-400">{activeModalTx.to.slice(0, 10)}...</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 py-2 border-b border-slate-800/60">
              <span className="text-slate-400">Método Invocado</span>
              <div className="sm:col-span-2">
                <span className="px-2 py-0.5 rounded bg-slate-800 text-xs font-mono-code text-amber-300">
                  {activeModalTx.method}()
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 py-2 border-b border-slate-800/60">
              <span className="text-slate-400">Remitente (Caller / Agent)</span>
              <div className="sm:col-span-2">
                <span className="font-mono-code text-xs text-slate-300">{activeModalTx.from}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 py-2 border-b border-slate-800/60">
              <span className="text-slate-400">Valor Transferido</span>
              <div className="sm:col-span-2">
                <span className="font-mono-code font-semibold text-slate-100">{activeModalTx.valueAvax} AVAX</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 py-2 border-b border-slate-800/60">
              <span className="text-slate-400">Gas Utilizado (Tarifa Avalanche)</span>
              <div className="sm:col-span-2 flex items-center gap-2">
                <span className="font-mono-code text-emerald-400 text-xs">
                  {activeModalTx.gasUsedAvax} AVAX (~$0.0008 USD)
                </span>
                <span className="text-xs text-slate-400">@ 25 nAVAX/gas</span>
              </div>
            </div>
          </div>

          <div>
            <span className="text-xs uppercase tracking-wider text-slate-400 font-medium">Descripción Operativa</span>
            <p className="mt-1.5 p-3 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 text-xs leading-relaxed">
              {activeModalTx.description}
            </p>
          </div>

          <div>
            <span className="text-xs uppercase tracking-wider text-slate-400 font-medium">Decoded Calldata (Parámetros)</span>
            <pre className="mt-1.5 p-3 rounded-lg bg-black/60 border border-slate-800 text-slate-300 font-mono-code text-xs overflow-x-auto leading-relaxed">
              {JSON.stringify(activeModalTx.params, null, 2)}
            </pre>
          </div>
        </div>

        <div className="px-6 py-3.5 border-t border-slate-800/80 bg-[#161a24] flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-1.5 text-slate-400">
            <span>Snowtrace Mock Explorer</span>
            <span>·</span>
            <span>Avalanche Consensus Engine</span>
          </div>
          <button
            onClick={closeTxModal}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
