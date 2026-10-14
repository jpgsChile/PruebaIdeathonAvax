import React, { useState } from 'react';
import { useAvalanche } from '../context/AvalancheMockContext';
import { Bot, Play, CheckCircle2, ExternalLink, Terminal, Lock } from 'lucide-react';
import { OnChainTransaction } from '../types';

export const AgentSimulator: React.FC = () => {
  const { agents, wallet, runAgentTask, openTxModal, transactions, isExecutingAgent, agentExecutionStep } = useAvalanche();
  const [selectedAgentId, setSelectedAgentId] = useState<string>(agents[0].id);
  const [taskInput, setTaskInput] = useState<string>(
    'Auditar contrato Vault y emitir firma de verificación para emisión de Soulbound Pass'
  );
  const [taskParams, setTaskParams] = useState<string>(
    JSON.stringify({ targetContract: '0x3F91...A84B', severityDetected: 'none', validationHash: '0xab49...88c2' }, null, 2)
  );
  const [lastExecutedTx, setLastExecutedTx] = useState<OnChainTransaction | null>(null);

  const currentAgent = agents.find(a => a.id === selectedAgentId) || agents[0];

  const presets = [
    {
      title: 'Auditoría de Seguridad & Certificación',
      agentId: 'agent-sentinel',
      task: 'Auditar contrato Vault y emitir firma de verificación para emisión de Soulbound Pass',
      params: { targetContract: '0x3F91...A84B', riskScore: 'Low', checkReentrancy: true }
    },
    {
      title: 'Arbitraje de Torneo de Gaming',
      agentId: 'agent-arbiter',
      task: 'Evaluar respuesta de partida PvP, verificar anti-cheat y acreditar 1.5 AVAX al ganador',
      params: { matchId: 'match_9041', winner: wallet.address, gameMetricScore: 98 }
    },
    {
      title: 'Verificación de Impacto Comunitario',
      agentId: 'agent-impact',
      task: 'Validar reporte de taller universitario y autorizar liberación de 5.0 AVAX del Impact Vault',
      params: { bountyId: 'bounty-01', proofsValidated: 3, attendanceCount: 65 }
    }
  ];

  const handleApplyPreset = (preset: typeof presets[0]) => {
    setSelectedAgentId(preset.agentId);
    setTaskInput(preset.task);
    setTaskParams(JSON.stringify(preset.params, null, 2));
  };

  const handleExecute = async () => {
    try {
      let parsedParams = {};
      try {
        parsedParams = JSON.parse(taskParams);
      } catch {
        parsedParams = { rawInput: taskParams };
      }

      const tx = await runAgentTask(selectedAgentId, taskInput, parsedParams);
      setLastExecutedTx(tx);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-8">
      <div className="rounded-xl bg-[#121620] border border-slate-800 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono-code text-[#E84142]">
            <span>Track 01</span>
            <span>·</span>
            <span>AI Agents On-Chain</span>
            <span>·</span>
            <span>Automatización Verificable</span>
          </div>
          <h2 className="text-2xl font-bold text-white mt-1">Consola de Ejecución Autónoma de Agentes</h2>
          <p className="text-slate-400 text-sm mt-1 max-w-2xl leading-relaxed">
            Los agentes de SkillMesh poseen <strong>Session Keys con presupuestos acotados</strong> (ERC-4337 / Subnet Auth). Cada acción evalúa reglas deterministas, emite firmas criptográficas y ejecuta smart contracts en Avalanche con finalidad &lt;800ms.
          </p>
        </div>
        <div className="flex flex-col items-end gap-1 shrink-0 text-right">
          <span className="text-xs text-slate-400">Gas en Avalanche Fuji:</span>
          <span className="font-mono-code text-sm font-semibold text-emerald-400">~0.0004 AVAX (&lt;$0.001 USD)</span>
          <span className="text-[11px] text-slate-500">Sin colapso de comisiones para bots</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-xl bg-[#121620] border border-slate-800 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-white">Selecciona el Agente Especializado</h3>
              <span className="text-xs text-slate-400 font-mono-code">3 Agentes Listos</span>
            </div>

            <div className="space-y-2.5">
              {agents.map(agent => {
                const isSelected = agent.id === selectedAgentId;
                return (
                  <button
                    key={agent.id}
                    onClick={() => setSelectedAgentId(agent.id)}
                    className={`w-full text-left p-3.5 rounded-lg border transition-all flex items-start gap-3 ${
                      isSelected
                        ? 'bg-[#181d29] border-[#E84142] ring-1 ring-[#E84142]/40'
                        : 'bg-[#141822] border-slate-800/80 hover:border-slate-700'
                    }`}
                  >
                    <div className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-[#E84142] shrink-0 mt-0.5">
                      <Bot className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-white text-sm">{agent.name}</span>
                        <span className="text-[11px] font-mono-code text-emerald-400">
                          {agent.reputationScore} Rep
                        </span>
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5 truncate">{agent.role}</div>
                      <div className="text-[11px] text-slate-500 font-mono-code mt-1.5 truncate">
                        Wallet: {agent.walletAddress.slice(0, 10)}...{agent.walletAddress.slice(-4)}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="rounded-xl bg-[#121620] border border-slate-800 p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-white">
                <Lock className="w-4 h-4 text-[#E84142]" />
                <span>Políticas de Seguridad On-Chain (Session Key)</span>
              </div>
              <span className="text-[11px] font-mono-code text-slate-400">ERC-4337 Bounded</span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between py-1.5 border-b border-slate-800/60">
                <span className="text-slate-400">Límite Diario Autorizado</span>
                <span className="font-mono-code text-white font-medium">
                  {currentAgent.maxDailyBudgetAvax} AVAX
                </span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-slate-800/60">
                <span className="text-slate-400">Gas Consumido Hoy</span>
                <span className="font-mono-code text-emerald-400">
                  {currentAgent.spentTodayAvax} AVAX
                </span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-slate-800/60">
                <span className="text-slate-400">Tareas Verificadas Totales</span>
                <span className="font-mono-code text-slate-200">
                  {currentAgent.completedTasksCount} ejecuciones
                </span>
              </div>
              <div>
                <span className="text-slate-400 block mb-1.5">Permisos de Contrato Específicos:</span>
                <div className="space-y-1">
                  {currentAgent.contractPermissions.map((perm, idx) => (
                    <div
                      key={idx}
                      className="px-2.5 py-1 rounded bg-black/40 border border-slate-800 font-mono-code text-[11px] text-amber-300"
                    >
                      {perm}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed pt-2 border-t border-slate-800/60">
              * Si el agente intenta llamar un contrato fuera de esta lista o sobrepasar el límite de gas, la transacción revierte a nivel de EVM en Avalanche.
            </p>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-6">
          <div>
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2.5">
              Cargar Misiones Rápidas de Prueba
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {presets.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => handleApplyPreset(preset)}
                  className="p-2.5 rounded-lg bg-[#121620] hover:bg-[#161a25] border border-slate-800 text-left transition-colors"
                >
                  <div className="text-xs font-semibold text-white truncate">{preset.title}</div>
                  <div className="text-[11px] text-slate-400 truncate mt-0.5">Preset #{idx + 1}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-xl bg-[#121620] border border-slate-800 p-6 space-y-5">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Directiva / Instrucción para el Agente On-Chain
              </label>
              <textarea
                value={taskInput}
                onChange={e => setTaskInput(e.target.value)}
                rows={2}
                disabled={isExecutingAgent}
                className="w-full bg-[#0d1017] border border-slate-800 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-[#E84142] transition-colors leading-relaxed"
                placeholder="Ingresa la orden para el agente..."
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-medium text-slate-300">
                  Parámetros Criptográficos / Payload (JSON)
                </label>
                <span className="text-[11px] text-slate-400 font-mono-code">calldata payload</span>
              </div>
              <textarea
                value={taskParams}
                onChange={e => setTaskParams(e.target.value)}
                rows={4}
                disabled={isExecutingAgent}
                className="w-full bg-[#0d1017] border border-slate-800 rounded-lg p-3 font-mono-code text-xs text-slate-300 focus:outline-none focus:border-[#E84142] transition-colors"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="text-xs text-slate-400">
                <span>Agente:</span> <strong className="text-white">{currentAgent.name}</strong>
              </div>

              <button
                onClick={handleExecute}
                disabled={isExecutingAgent || !taskInput.trim()}
                className={`px-5 py-2.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all shadow-md ${
                  isExecutingAgent
                    ? 'bg-slate-800 text-slate-400 cursor-not-allowed'
                    : 'bg-[#E84142] hover:bg-[#d03637] text-white shadow-[#E84142]/20'
                }`}
              >
                <Play className="w-4 h-4 fill-current" />
                <span>{isExecutingAgent ? 'Ejecutando en Avalanche...' : 'Ejecutar Acción On-Chain'}</span>
              </button>
            </div>
          </div>

          {agentExecutionStep && (
            <div className="rounded-xl bg-[#161a25] border border-slate-700/80 p-5 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-white">Pipeline de Ejecución Verificable</span>
                <span className="font-mono-code text-emerald-400">
                  Paso {agentExecutionStep.stepIndex} de 4
                </span>
              </div>

              <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#E84142] h-full transition-all duration-500"
                  style={{ width: `${(agentExecutionStep.stepIndex / 4) * 100}%` }}
                />
              </div>

              <div className="pt-1">
                <div className="text-xs font-semibold text-white">{agentExecutionStep.title}</div>
                <div className="text-xs text-slate-400 mt-0.5">{agentExecutionStep.description}</div>
              </div>
            </div>
          )}

          {lastExecutedTx && !isExecutingAgent && (
            <div className="rounded-xl bg-emerald-950/20 border border-emerald-800/40 p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Transacción de Agente Confirmada en Bloque #{lastExecutedTx.blockNumber}</span>
                </div>
                <button
                  onClick={() => openTxModal(lastExecutedTx)}
                  className="text-xs font-semibold text-slate-200 hover:text-white flex items-center gap-1 underline underline-offset-4"
                >
                  <span>Ver en Snowtrace Explorer</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="font-mono-code text-xs text-slate-300 truncate bg-black/40 p-2.5 rounded border border-emerald-900/30">
                TxHash: {lastExecutedTx.hash}
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Finalidad: {lastExecutedTx.finalityTimeMs} ms</span>
                <span>Gas: {lastExecutedTx.gasUsedAvax} AVAX</span>
                <span>Método: {lastExecutedTx.method}()</span>
              </div>
            </div>
          )}

          <div className="rounded-xl bg-[#121620] border border-slate-800 p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-white">
                <Terminal className="w-4 h-4 text-[#E84142]" />
                <span>Registro de Transacciones Recientes (Ledger de Avalanche)</span>
              </div>
              <span className="text-[11px] font-mono-code text-slate-400">
                {transactions.length} transacciones
              </span>
            </div>

            <div className="space-y-2">
              {transactions.slice(0, 4).map(tx => (
                <div
                  key={tx.hash}
                  onClick={() => openTxModal(tx)}
                  className="cursor-pointer p-3 rounded-lg bg-[#141822] hover:bg-[#181d29] border border-slate-800/60 flex items-center justify-between gap-3 text-xs transition-colors"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono-code text-[#E84142] font-semibold">{tx.contractName}</span>
                      <span className="text-slate-500">·</span>
                      <span className="font-mono-code text-amber-300">{tx.method}()</span>
                    </div>
                    <div className="text-slate-400 text-[11px] truncate mt-0.5">{tx.description}</div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="font-mono-code text-emerald-400 text-[11px]">
                      {tx.finalityTimeMs} ms
                    </div>
                    <div className="text-[10px] text-slate-400">{tx.timestamp}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
