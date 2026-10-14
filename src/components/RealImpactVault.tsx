import React, { useState } from 'react';
import { useAvalanche } from '../context/AvalancheMockContext';
import { HeartHandshake, Send, CheckCircle2 } from 'lucide-react';

export const RealImpactVault: React.FC = () => {
  const { bounties, submitImpactProof, wallet, isExecutingAgent } = useAvalanche();
  const [selectedBountyId, setSelectedBountyId] = useState<string>(bounties[0].id);
  const [proofUrl, setProofUrl] = useState<string>('https://github.com/avaxskills/spanish-guides-pr-42');
  const [proofSummary, setProofSummary] = useState<string>(
    'Completada la traducción de 8 módulos de Avalanche CLI y Subnet-EVM con glosario de términos validado.'
  );
  const [submittedTxHash, setSubmittedTxHash] = useState<string | null>(null);

  const currentBounty = bounties.find(b => b.id === selectedBountyId) || bounties[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!proofUrl.trim()) return;

    setSubmittedTxHash(null);
    try {
      const tx = await submitImpactProof(selectedBountyId, proofUrl, proofSummary);
      setSubmittedTxHash(tx.hash);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-8">
      <div className="rounded-xl bg-[#121620] border border-slate-800 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono-code text-amber-400">
            <span>Track 04</span>
            <span>·</span>
            <span>Web3 for Real Impact</span>
            <span>·</span>
            <span>Transparencia y Bounties Comunitarios</span>
          </div>
          <h2 className="text-2xl font-bold text-white mt-1">Impact Vaults: Desembolsos Comunitarios Automatizados</h2>
          <p className="text-slate-400 text-sm mt-1 max-w-2xl leading-relaxed">
            Eliminamos la burocracia y la falta de transparencia en donaciones y micro-grants. Los fondos se custodian en <strong>Smart Contracts en Avalanche</strong> y se transfieren a los ejecutores en el instante en que el agente auditor <strong>Gaia</strong> valida las pruebas de impacto.
          </p>
        </div>
        <div className="flex flex-col items-end gap-1 shrink-0 text-right">
          <span className="text-xs text-slate-400">Ventaja Ecológica de Avalanche:</span>
          <span className="font-mono-code text-sm font-semibold text-emerald-400">0.0005% de Energía</span>
          <span className="text-[11px] text-slate-500">Consenso PoS neutral en carbono</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-6 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-white">Bounties Comunitarios Activos</h3>
            <span className="text-xs text-slate-400 font-mono-code">Escrow en Avalanche</span>
          </div>

          <div className="space-y-4">
            {bounties.map(bounty => {
              const isSelected = bounty.id === selectedBountyId;
              const percentFunded = Math.round((bounty.claimedAvax / bounty.allocatedAvax) * 100);

              return (
                <div
                  key={bounty.id}
                  onClick={() => setSelectedBountyId(bounty.id)}
                  className={`cursor-pointer rounded-xl p-5 border transition-all text-left flex flex-col justify-between ${
                    isSelected
                      ? 'bg-[#181d29] border-amber-500 ring-1 ring-amber-500/40 shadow-lg'
                      : 'bg-[#121620] border-slate-800 hover:border-slate-700 hover:bg-[#151924]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-amber-400">{bounty.organization}</span>
                      <span className="font-mono-code text-xs font-bold text-white">
                        {bounty.claimedAvax} / {bounty.allocatedAvax} AVAX
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-white mb-2">{bounty.title}</h4>

                    <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden mb-3">
                      <div
                        className="bg-amber-400 h-full transition-all duration-300"
                        style={{ width: `${percentFunded}%` }}
                      />
                    </div>

                    <div className="text-xs text-slate-300 space-y-1">
                      <div>
                        <strong className="text-slate-400">Métrica de Impacto:</strong> {bounty.impactMetric}
                      </div>
                      <div>
                        <strong className="text-slate-400">Beneficiarios:</strong> {bounty.beneficiaries}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                    <span>Verificado por: {bounty.verificationAgent}</span>
                    <span className="font-semibold text-amber-400">
                      {bounty.status === 'financiado' ? '100% Completado' : 'Fondos Disponibles'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="lg:col-span-6 space-y-6">
          <div className="rounded-xl bg-[#121620] border border-slate-800 p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono-code text-slate-400">Bounty Seleccionado</span>
                <h3 className="text-base font-bold text-white mt-0.5">{currentBounty.title}</h3>
              </div>
              <div className="p-2.5 rounded-lg bg-amber-950/30 border border-amber-800/40 text-amber-400 shrink-0">
                <HeartHandshake className="w-5 h-5" />
              </div>
            </div>

            <div className="text-xs space-y-2">
              <span className="text-slate-400 uppercase tracking-wider font-semibold block">
                Requisitos de Validación On-Chain
              </span>
              <p className="p-3 rounded-lg bg-[#0d1017] border border-slate-800 text-slate-300 leading-relaxed">
                {currentBounty.proofRequirements}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Enlace a la Evidencia / Prueba (GitHub PR, Hash IPFS o Reporte)
                </label>
                <input
                  type="text"
                  value={proofUrl}
                  onChange={e => setProofUrl(e.target.value)}
                  disabled={isExecutingAgent}
                  className="w-full bg-[#0d1017] border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-amber-400 transition-colors font-mono-code"
                  placeholder="https://..."
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Resumen de Entregables Cumplidos
                </label>
                <textarea
                  value={proofSummary}
                  onChange={e => setProofSummary(e.target.value)}
                  rows={3}
                  disabled={isExecutingAgent}
                  className="w-full bg-[#0d1017] border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-amber-400 transition-colors leading-relaxed"
                />
              </div>

              <div className="p-3 rounded-lg bg-[#161a25] border border-slate-800 text-[11px] text-slate-400 leading-relaxed">
                Al enviar la prueba, el agente <strong>Gaia-ImpactVerifier</strong> ejecuta la auditoría del entregable en Avalanche Fuji y transfiere de <strong>2.5 a 5.0 AVAX</strong> directo a tu wallet <code>{wallet.address.slice(0, 10)}...</code>.
              </div>

              <button
                type="submit"
                disabled={isExecutingAgent || !proofUrl.trim()}
                className={`w-full py-2.5 rounded-lg font-semibold text-white transition-all shadow-md flex items-center justify-center gap-2 ${
                  isExecutingAgent
                    ? 'bg-slate-800 text-slate-400 cursor-not-allowed'
                    : 'bg-amber-600 hover:bg-amber-500 shadow-amber-600/20'
                }`}
              >
                <Send className="w-4 h-4" />
                <span>
                  {isExecutingAgent
                    ? 'Gaia está auditando la prueba...'
                    : 'Enviar Prueba & Desembolsar Fondos'}
                </span>
              </button>
            </form>

            {submittedTxHash && (
              <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-700/60 text-emerald-200 text-xs space-y-2">
                <div className="flex items-center gap-2 font-semibold text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>¡Fondos desembolsados exitosamente por el Smart Contract!</span>
                </div>
                <p className="text-slate-300">
                  El agente validó la evidencia y ejecutó <code>ImpactBountyVault.verifyAndDisburse()</code>. Los AVAX han sido acreditados a tu saldo.
                </p>
                <div className="font-mono-code text-[11px] text-slate-300 truncate">
                  TxHash Avalanche: {submittedTxHash}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
