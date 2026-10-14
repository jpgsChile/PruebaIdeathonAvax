import React, { useState } from 'react';
import { useAvalanche } from '../context/AvalancheMockContext';
import { Fingerprint, Award, ShieldCheck, Plus, ExternalLink, Key } from 'lucide-react';
import { SoulboundCredential } from '../types';

export const IdentityReputation: React.FC = () => {
  const { wallet, credentials, mintNewCredential, openTxModal, isExecutingAgent } = useAvalanche();
  const [newSkillTitle, setNewSkillTitle] = useState('Avalanche Warp Messaging Specialist');
  const [newSkillScore, setNewSkillScore] = useState(95);
  const [isMinting, setIsMinting] = useState(false);
  const [selectedCredential, setSelectedCredential] = useState<SoulboundCredential | null>(credentials[0]);

  const handleMint = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillTitle.trim()) return;

    setIsMinting(true);
    try {
      await mintNewCredential(newSkillTitle, newSkillScore, 'agent-sentinel');
      setSelectedCredential(credentials[0]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsMinting(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="rounded-xl bg-[#121620] border border-slate-800 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono-code text-indigo-400">
            <span>Track 02</span>
            <span>·</span>
            <span>Digital Identity & Reputation</span>
            <span>·</span>
            <span>Soulbound Tokens ERC-5192</span>
          </div>
          <h2 className="text-2xl font-bold text-white mt-1">Identidad Digital & Pasaporte de Habilidades On-Chain</h2>
          <p className="text-slate-400 text-sm mt-1 max-w-2xl leading-relaxed">
            Demuestra lo que sabes y lo que has construido de forma auditable. Cada habilidad completada es evaluada por un agente auditor y acuñada como un <strong>Soulbound Token intransferible</strong> en Avalanche, portable hacia cualquier Subnet mediante Avalanche Interchain Messaging.
          </p>
        </div>
        <div className="flex flex-col items-end gap-1 shrink-0 text-right">
          <span className="text-xs text-slate-400">Puntuación de Confianza:</span>
          <span className="font-mono-code text-lg font-bold text-emerald-400">
            {wallet.reputationScore} / 100
          </span>
          <span className="text-[11px] text-slate-500">Avalanche Verifiable Trust</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 space-y-6">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1c2233] via-[#141926] to-[#0c0e15] border border-slate-700/80 p-6 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-700/60 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-400/40 flex items-center justify-center text-indigo-400">
                  <Fingerprint className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-white">SkillMesh Soulbound Pass</div>
                  <div className="text-[10px] text-slate-400 font-mono-code">ERC-5192 Non-Transferable</div>
                </div>
              </div>
              <div className="px-2.5 py-1 rounded bg-emerald-950/60 border border-emerald-800 text-[11px] font-mono-code text-emerald-300">
                Verificado On-Chain
              </div>
            </div>

            <div className="my-6 space-y-4">
              <div>
                <span className="text-[11px] text-slate-400 uppercase tracking-wider">Titular de la Identidad</span>
                <div className="font-mono-code text-sm text-slate-100 font-semibold truncate mt-0.5">
                  {wallet.address}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div>
                  <span className="text-[11px] text-slate-400 uppercase tracking-wider">Badges Acuñados</span>
                  <div className="text-xl font-bold text-white font-mono-code tabular-nums mt-0.5">
                    {credentials.length} SBTs
                  </div>
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 uppercase tracking-wider">Nivel de Confianza</span>
                  <div className="text-xl font-bold text-emerald-400 font-mono-code tabular-nums mt-0.5">
                    Tier 1 (Senior)
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-700/60 flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-indigo-400" />
                <span>Avalanche C-Chain Fuji</span>
              </span>
              <span className="font-mono-code text-[11px]">ChainID: 43113</span>
            </div>
          </div>

          <div className="rounded-xl bg-[#121620] border border-slate-800 p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-white">
                <Plus className="w-4 h-4 text-[#E84142]" />
                <span>Atestar Nueva Habilidad con Agente IA</span>
              </div>
              <span className="text-[11px] font-mono-code text-slate-400">Simulador de Atestación</span>
            </div>

            <form onSubmit={handleMint} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Título de la Habilidad o Competencia
                </label>
                <input
                  type="text"
                  value={newSkillTitle}
                  onChange={e => setNewSkillTitle(e.target.value)}
                  className="w-full bg-[#0d1017] border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-indigo-400 transition-colors"
                  placeholder="ej. Rust Subnet Developer"
                  disabled={isMinting || isExecutingAgent}
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-slate-300 font-medium">Puntuación / Calificación de Evaluación</label>
                  <span className="font-mono-code text-indigo-400 font-semibold">{newSkillScore} / 100</span>
                </div>
                <input
                  type="range"
                  min="80"
                  max="100"
                  value={newSkillScore}
                  onChange={e => setNewSkillScore(Number(e.target.value))}
                  className="w-full accent-indigo-500 cursor-pointer"
                  disabled={isMinting || isExecutingAgent}
                />
              </div>

              <div className="p-3 rounded-lg bg-[#161a25] border border-slate-800 text-[11px] text-slate-400 leading-relaxed">
                El agente <strong>Sentinel-Auditor</strong> verificará criptográficamente la prueba, invocará <code>SoulboundSkillPass.mintAttestation()</code> y bloqueará el token de por vida en la dirección del titular.
              </div>

              <button
                type="submit"
                disabled={isMinting || isExecutingAgent || !newSkillTitle.trim()}
                className={`w-full py-2.5 rounded-lg font-semibold text-white transition-all shadow-md flex items-center justify-center gap-2 ${
                  isMinting || isExecutingAgent
                    ? 'bg-slate-800 text-slate-400 cursor-not-allowed'
                    : 'bg-indigo-600 hover:bg-indigo-500 shadow-indigo-600/20'
                }`}
              >
                <Award className="w-4 h-4" />
                <span>
                  {isMinting || isExecutingAgent ? 'Atestando en Avalanche...' : 'Emitir Soulbound Pass On-Chain'}
                </span>
              </button>
            </form>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-white">
              Credenciales Soulbound en tu Billetera ({credentials.length})
            </h3>
            <span className="text-xs text-slate-400">Totalmente verificables e inmutables</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {credentials.map(cred => {
              const isSelected = selectedCredential?.id === cred.id;
              return (
                <div
                  key={cred.id}
                  onClick={() => setSelectedCredential(cred)}
                  className={`cursor-pointer rounded-xl p-4 border transition-all text-left flex flex-col justify-between ${
                    isSelected
                      ? 'bg-[#181d29] border-indigo-500 ring-1 ring-indigo-500/40 shadow-lg'
                      : 'bg-[#121620] border-slate-800 hover:border-slate-700 hover:bg-[#151924]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono-code text-slate-400">
                        Token #{cred.tokenId}
                      </span>
                      <span className="text-xs font-mono-code font-bold text-emerald-400">
                        {cred.score} / 100
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-white mb-1">{cred.title}</h4>
                    <div className="text-[11px] text-slate-400 mb-2">{cred.category}</div>

                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {cred.skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] text-slate-300 font-mono-code"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                    <span>Emisor: {cred.issuerAgent}</span>
                    <span className="font-mono-code text-slate-500">{cred.issueDate}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {selectedCredential && (
            <div className="rounded-xl bg-[#121620] border border-slate-800 p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-semibold text-white">
                    Inspección Criptográfica de la Credencial #{selectedCredential.tokenId}
                  </span>
                </div>
                <button
                  onClick={() => {
                    const matchTx = {
                      hash: selectedCredential.txHash,
                      blockNumber: 4381024,
                      timestamp: selectedCredential.issueDate,
                      from: '0x9B81aE4aC7D4f2B0193E3d354Fcf8A0E46F280D1',
                      to: '0x2F7819B14E91d0A4F35C83416a2E9cE67bF74a58',
                      contractName: 'SoulboundSkillPass.sol',
                      method: 'mintAttestation',
                      params: {
                        recipient: selectedCredential.issuedTo,
                        tokenId: selectedCredential.tokenId,
                        title: selectedCredential.title,
                        score: selectedCredential.score
                      },
                      valueAvax: 0,
                      gasUsedAvax: 0.00038,
                      gasPriceGwei: 25.0,
                      finalityTimeMs: 680,
                      status: 'confirmed' as const,
                      network: wallet.network,
                      description: `Emisión de Soulbound Token para ${selectedCredential.title}`
                    };
                    openTxModal(matchTx);
                  }}
                  className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 underline underline-offset-4"
                >
                  <span>Ver Transacción On-Chain</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-slate-400 block mb-1">Criterio de Evaluación Cumplido:</span>
                  <p className="p-3 rounded-lg bg-[#0d1017] border border-slate-800 text-slate-300 leading-relaxed">
                    {selectedCredential.criteria}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-2.5 rounded bg-black/40 border border-slate-800">
                    <span className="text-[10px] text-slate-500 uppercase block">Metadata URI (IPFS)</span>
                    <span className="font-mono-code text-[11px] text-slate-300 truncate block mt-0.5">
                      {selectedCredential.metadataUri}
                    </span>
                  </div>
                  <div className="p-2.5 rounded bg-black/40 border border-slate-800">
                    <span className="text-[10px] text-slate-500 uppercase block">Hash de Bloqueo EIP-5192</span>
                    <span className="font-mono-code text-[11px] text-emerald-400 truncate block mt-0.5">
                      Locked: true (Intransferible)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
