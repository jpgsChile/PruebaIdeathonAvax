import React, { useState } from 'react';
import { Copy, Check, FileText, Sparkles, Award, ArrowRight, ShieldCheck } from 'lucide-react';

export const PitchDeckSummary: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const pitchMarkdown = `# SkillMesh AVAX — Propuesta para AvaxSkills Hackathon

## 1. Resumen Ejecutivo (One-Liner)
**SkillMesh AVAX** es un protocolo descentralizado de Agentes de IA On-Chain con permisos acotados (Session Keys), emisión de Pasaportes de Identidad Verificables (Soulbound NFTs ERC-5192), arbitraje gamificado en tiempo real y Vaults de impacto comunitario automatizados sobre la red Avalanche.

---

## 2. Alineación con los Tracks de AvaxSkills

### Track 01: AI Agents On-Chain (IA y automatización verificable) [TRACK PRINCIPAL]
* **Problema:** Los agentes de IA en Web2 operan como oráculos de texto sin capacidad de firma segura, o como bots con llaves privadas completas que representan un riesgo catastrófico de pérdida de fondos.
* **Solución SkillMesh:** Se implementa \`SkillAgentRegistry.sol\` con Session Keys (ERC-4337 acotado). Cada agente posee un límite diario estricto en AVAX y una lista blanca de métodos ejecutables. Todo razonamiento genera una prueba verificable on-chain.
* **Por qué Avalanche:** Finalidad sub-segundo (<800ms) y micro-gas (<$0.001 USD) indispensables para que agentes ejecuten tareas de alta frecuencia.

### Track 02: Digital Identity & Reputation
* **Problema:** Los perfiles profesionales están fragmentados y no verificados criptográficamente.
* **Solución SkillMesh:** Emisión de \`SoulboundSkillPass.sol\` (ERC-5192). Los agentes auditores atestan habilidades técnicas reales y emiten credenciales intransferibles que construyen un Trust Score on-chain.
* **Por qué Avalanche:** Avalanche Warp Messaging (AWM / Teleport) permite que esta reputación viaje de forma nativa entre la C-Chain y Subnets dedicadas.

### Track 03: Gaming & Interactive Experiences
* **Problema:** Los logros en juegos Web3 no tienen interoperabilidad ni arbitraje en tiempo real.
* **Solución SkillMesh:** Skill Arena con retos gamificados de smart contracts donde un Agente Árbitro evalúa el código del jugador en vivo, acredita XP y desbloquea trofeos on-chain con micro-pagos en AVAX.
* **Por qué Avalanche:** Posibilidad de Subnets dedicadas a 4,500 TPS sin fricción de gas para jugadores.

### Track 04: Web3 for Real Impact
* **Problema:** La opacidad y el gasto administrativo en donaciones e incentivos comunitarios.
* **Solución SkillMesh:** \`ImpactBountyVault.sol\` donde los fondos permanecen en escrow y el agente de IA valida las pruebas de impacto antes de liberar los fondos directo a los ejecutores.
* **Por qué Avalanche:** Red energéticamente eficiente (PoS neutral en carbono) y micro-transacciones sin comisiones usurarias.

---

## 3. Demostración del POC (Entregables Técnicos)
1. **Smart Contracts en Solidity:** \`SkillAgentRegistry.sol\`, \`SoulboundSkillPass.sol\`, \`ImpactBountyVault.sol\`.
2. **Consola Interactiva de Agentes:** Simulación en tiempo real de inferencia, firma ECDSA y minado de bloque en Avalanche Fuji.
3. **Simulador de Billetera y Red:** Switcher Avalanche Fuji (ChainID 43113) vs Subnet Custom, Faucet de AVAX y Explorer Snowtrace interactivo.

---

## 4. Roadmap Post-Hackathon
* **Fase 1 (Testnet Fuji):** Auditoría formal de contratos de Session Keys y despliegue del registro de agentes.
* **Fase 2 (Mainnet C-Chain):** Integración con Core Wallet y oráculos descentralizados Chainlink / Pyth.
* **Fase 3 (Avalanche L1 Subnet):** Despliegue de la AppChain dedicada de SkillMesh para escalar a 10,000+ agentes autónomos.`;

  const handleCopy = () => {
    navigator.clipboard.writeText(pitchMarkdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="rounded-xl bg-[#121620] border border-slate-800 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono-code text-[#E84142]">
            <span>AvaxSkills Hackathon Submission Kit</span>
            <span>·</span>
            <span>Pitch One-Pager</span>
          </div>
          <h2 className="text-2xl font-bold text-white mt-1">Dossier de Presentación para el Jurado</h2>
          <p className="text-slate-400 text-sm mt-1 max-w-2xl leading-relaxed">
            Estructura completa lista para la postulación en <strong>avaxskills.com</strong>, cubriendo el valor unificado de los 4 tracks y la justificación técnica de Avalanche.
          </p>
        </div>

        <button
          onClick={handleCopy}
          className="px-5 py-2.5 rounded-lg bg-[#E84142] hover:bg-[#d03637] text-white text-xs font-semibold transition-colors flex items-center gap-2 shrink-0 shadow-lg shadow-[#E84142]/20"
        >
          {copied ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? '¡Pitch Copiado en Markdown!' : 'Copiar Pitch Completo (Markdown)'}</span>
        </button>
      </div>

      {/* Structured Pitch Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: Executive Summary */}
        <div className="rounded-xl bg-[#121620] border border-slate-800 p-6 space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-white">
            <Sparkles className="w-4 h-4 text-[#E84142]" />
            <span>01. Resumen Ejecutivo (One-Liner)</span>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed bg-[#161a25] p-4 rounded-lg border border-slate-800">
            <strong>SkillMesh AVAX</strong> es la primera red de coordinación descentralizada en Avalanche donde Agentes de IA autónomos operan con Session Keys acotadas, emiten pasaportes de habilidades verificables (Soulbound NFTs ERC-5192), arbitran misiones interactivas y liberan fondos de impacto social sin intermediarios.
          </p>
        </div>

        {/* Card 2: The Core Web3 Problem */}
        <div className="rounded-xl bg-[#121620] border border-slate-800 p-6 space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-white">
            <FileText className="w-4 h-4 text-indigo-400" />
            <span>02. El Problema Central en Web3</span>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed bg-[#161a25] p-4 rounded-lg border border-slate-800">
            Los agentes de IA actuales son "cajas negras" sin permisos claros que no pueden interactuar de forma segura con contratos inteligentes. Al mismo tiempo, la reputación de desarrolladores y el impacto comunitario carecen de verificación on-chain auditable.
          </p>
        </div>

        {/* Card 3: Why Avalanche is Unbeatable */}
        <div className="rounded-xl bg-[#121620] border border-slate-800 p-6 space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-white">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>03. Por Qué Avalanche es la Única Opción</span>
          </div>
          <ul className="text-xs text-slate-300 space-y-2 bg-[#161a25] p-4 rounded-lg border border-slate-800">
            <li className="flex items-start gap-2">
              <span className="text-[#E84142] font-bold">1.</span>
              <span><strong>Finalidad &lt;800ms:</strong> Necesaria para que los agentes ejecuten flujos de trabajo sin atascos.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#E84142] font-bold">2.</span>
              <span><strong>Micro-Gas ($0.0004 USD):</strong> Permite cientos de llamadas diarias por agente.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#E84142] font-bold">3.</span>
              <span><strong>Subnets & Teleport (ICM):</strong> Reputación e identidad portables entre AppChains con firmas BLS.</span>
            </li>
          </ul>
        </div>

        {/* Card 4: Multi-Track Strategy */}
        <div className="rounded-xl bg-[#121620] border border-slate-800 p-6 space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-white">
            <Award className="w-4 h-4 text-amber-400" />
            <span>04. Estrategia Multi-Track para AvaxSkills</span>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed bg-[#161a25] p-4 rounded-lg border border-slate-800">
            El proyecto está diseñado de forma modular: el jurado puede evaluarlo como la solución más sólida para el <strong>Track 01 (AI Agents On-Chain)</strong>, reconociendo además cómo apoya directamente a los <strong>Tracks 02, 03 y 04</strong> a través de su arquitectura unificada.
          </p>
        </div>
      </div>

      {/* Raw Pitch Markdown Box */}
      <div className="rounded-xl bg-[#121620] border border-slate-800 p-6 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono-code text-slate-400">Texto Formateado en Markdown</span>
          <button
            onClick={handleCopy}
            className="text-xs text-[#E84142] hover:text-[#ff5c5d] font-semibold flex items-center gap-1"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copiado' : 'Copiar todo'}</span>
          </button>
        </div>

        <pre className="p-4 rounded-lg bg-[#0b0e14] border border-slate-800 font-mono-code text-xs text-slate-300 max-h-80 overflow-y-auto leading-relaxed">
          {pitchMarkdown}
        </pre>
      </div>
    </div>
  );
};
