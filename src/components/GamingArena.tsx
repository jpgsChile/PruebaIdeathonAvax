import React, { useState } from 'react';
import { useAvalanche } from '../context/AvalancheMockContext';
import { Swords, CheckCircle2, AlertTriangle, Code2, Sparkles } from 'lucide-react';
import { GamingQuest } from '../types';

export const GamingArena: React.FC = () => {
  const { quests, solveQuest, isExecutingAgent } = useAvalanche();
  const [selectedQuestId, setSelectedQuestId] = useState<string>(quests[0].id);
  const [codeEditor, setCodeEditor] = useState<string>(quests[0].starterCode);
  const [feedback, setFeedback] = useState<{ success: boolean; message: string; txHash?: string } | null>(null);

  const currentQuest = quests.find(q => q.id === selectedQuestId) || quests[0];

  const handleSelectQuest = (quest: GamingQuest) => {
    setSelectedQuestId(quest.id);
    setCodeEditor(quest.starterCode);
    setFeedback(null);
  };

  const handleApplyFix = () => {
    if (selectedQuestId === 'quest-01') {
      setCodeEditor(`// Solución aplicada con patrón ReentrancyGuard
function withdraw(uint256 amount) external nonReentrant {
    require(balances[msg.sender] >= amount, "Saldo insuficiente");
    balances[msg.sender] -= amount; // Efecto primero
    (bool sent, ) = msg.sender.call{value: amount}("");
    require(sent, "Fallo transferencia");
}`);
    } else if (selectedQuestId === 'quest-02') {
      setCodeEditor(`function validateUserOp(UserOperation calldata userOp) external returns (uint256) {
    require(isAgentAuthorized(userOp.sender), "Agente no autorizado");
    require(userOp.callDataValue <= MAX_AGENT_TRANSACTION_LIMIT, "Excede limite permitido");
    return 0; // Exito
}`);
    } else {
      setCodeEditor(`function receiveTeleportMessage(bytes calldata warpMessage) external {
    bytes32 sourceChainID = extractSource(warpMessage);
    require(sourceChainID == C_CHAIN_ID, "Cadena origen invalida");
    emit TrophyCrossChainReceived(msg.sender);
}`);
    }
  };

  const handleSubmitSolution = async () => {
    setFeedback(null);
    const result = await solveQuest(currentQuest.id, codeEditor);
    setFeedback({
      success: result.success,
      message: result.message,
      txHash: result.tx?.hash
    });
  };

  return (
    <div className="space-y-8">
      <div className="rounded-xl bg-[#121620] border border-slate-800 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono-code text-emerald-400">
            <span>Track 03</span>
            <span>·</span>
            <span>Gaming & Interactive Experiences</span>
            <span>·</span>
            <span>Árbitros de IA & Logros On-Chain</span>
          </div>
          <h2 className="text-2xl font-bold text-white mt-1">Skill Arena: Desafíos Interactivos Gamificados</h2>
          <p className="text-slate-400 text-sm mt-1 max-w-2xl leading-relaxed">
            Mecánicas donde el código y la lógica del jugador son evaluados en tiempo real por un <strong>Árbitro de Inteligencia Artificial</strong> en Avalanche. Resuelve misiones de seguridad, gana experiencia (XP) y recibe micro-pagos inmediatos en AVAX con finalidad en sub-segundos.
          </p>
        </div>
        <div className="flex flex-col items-end gap-1 shrink-0 text-right">
          <span className="text-xs text-slate-400">Subnet Gaming Advantage:</span>
          <span className="font-mono-code text-sm font-semibold text-emerald-400">4,500 TPS Dedicados</span>
          <span className="text-[11px] text-slate-500">Sin spikes de gas por DEXs externas</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-xl bg-[#121620] border border-slate-800 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-white">Misiones Disponibles en la Arena</h3>
              <span className="text-xs text-slate-400 font-mono-code">{quests.length} Retos</span>
            </div>

            <div className="space-y-3">
              {quests.map(quest => {
                const isSelected = quest.id === selectedQuestId;
                return (
                  <button
                    key={quest.id}
                    onClick={() => handleSelectQuest(quest)}
                    className={`w-full text-left p-4 rounded-xl border transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'bg-[#181d29] border-emerald-500 ring-1 ring-emerald-500/40 shadow-lg'
                        : 'bg-[#141822] border-slate-800/80 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] font-mono-code text-slate-300">
                        {quest.difficulty}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono-code font-bold text-xs text-emerald-400">
                          +{quest.rewardAvax} AVAX
                        </span>
                        <span className="font-mono-code text-xs text-amber-300">+{quest.xpPoints} XP</span>
                      </div>
                    </div>

                    <h4 className="text-sm font-bold text-white mb-1">{quest.title}</h4>
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {quest.objective}
                    </p>

                    <div className="mt-3 pt-2.5 border-t border-slate-800/60 flex items-center justify-between text-[11px]">
                      <span className="text-slate-500">{quest.category}</span>
                      {quest.completed ? (
                        <span className="text-emerald-400 font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Completada
                        </span>
                      ) : (
                        <span className="text-slate-400">Pendiente de resolución</span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-xl bg-[#121620] border border-slate-800 p-6 space-y-5">
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                  <span>Misión Activa</span>
                  <span>·</span>
                  <span className="text-emerald-400 font-semibold">{currentQuest.category}</span>
                </div>
                <h3 className="text-lg font-bold text-white">{currentQuest.title}</h3>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">{currentQuest.scenario}</p>
              </div>

              <div className="p-3 rounded-lg bg-emerald-950/30 border border-emerald-800/40 text-right shrink-0">
                <div className="text-[10px] uppercase text-emerald-400 font-semibold">Recompensa</div>
                <div className="text-sm font-bold font-mono-code text-white mt-0.5">
                  +{currentQuest.rewardAvax} AVAX
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                  <Code2 className="w-4 h-4 text-emerald-400" />
                  <span>Editor de Smart Contract en Solidity</span>
                </div>
                <button
                  onClick={handleApplyFix}
                  className="text-xs text-[#E84142] hover:text-[#ff5c5d] font-semibold flex items-center gap-1 underline underline-offset-4"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Aplicar Solución de Ejemplo</span>
                </button>
              </div>

              <textarea
                value={codeEditor}
                onChange={e => setCodeEditor(e.target.value)}
                rows={9}
                disabled={isExecutingAgent}
                className="w-full bg-[#0a0d13] border border-slate-800 rounded-lg p-3.5 font-mono-code text-xs text-emerald-300 focus:outline-none focus:border-emerald-500 leading-relaxed transition-colors selection:bg-emerald-900"
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <div className="text-xs text-slate-400">
                Árbitro On-Chain: <strong className="text-white">Valkyrie-Arbiter</strong>
              </div>

              <button
                onClick={handleSubmitSolution}
                disabled={isExecutingAgent}
                className={`w-full sm:w-auto px-6 py-2.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-md ${
                  isExecutingAgent
                    ? 'bg-slate-800 text-slate-400 cursor-not-allowed'
                    : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/20'
                }`}
              >
                <Swords className="w-4 h-4" />
                <span>
                  {isExecutingAgent ? 'El Árbitro IA está evaluando...' : 'Enviar Solución al Árbitro IA'}
                </span>
              </button>
            </div>

            {feedback && (
              <div
                className={`p-4 rounded-xl border flex items-start gap-3 text-xs leading-relaxed ${
                  feedback.success
                    ? 'bg-emerald-950/40 border-emerald-700/60 text-emerald-200'
                    : 'bg-amber-950/40 border-amber-700/60 text-amber-200'
                }`}
              >
                {feedback.success ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                )}
                <div className="flex-1">
                  <div className="font-semibold">{feedback.success ? '¡Validación Exitosa!' : 'Revisión Necesaria'}</div>
                  <div className="mt-0.5">{feedback.message}</div>
                  {feedback.txHash && (
                    <div className="mt-2 font-mono-code text-[11px] text-slate-300 truncate">
                      TxHash Avalanche: {feedback.txHash}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
