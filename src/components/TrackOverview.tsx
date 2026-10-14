import React, { useState } from 'react';
import { HACKATHON_TRACKS } from '../data/mockData';
import { HackathonTrack } from '../types';
import { Bot, Fingerprint, Gamepad2, HeartHandshake, ArrowRight, Layers, Cpu } from 'lucide-react';

interface TrackOverviewProps {
  onSelectTrackAction: (tabId: string) => void;
}

export const TrackOverview: React.FC<TrackOverviewProps> = ({ onSelectTrackAction }) => {
  const [selectedTrack, setSelectedTrack] = useState<HackathonTrack>(HACKATHON_TRACKS[0]);

  const getTrackIcon = (id: string) => {
    switch (id) {
      case 'track-01':
        return <Bot className="w-5 h-5 text-[#E84142]" />;
      case 'track-02':
        return <Fingerprint className="w-5 h-5 text-indigo-400" />;
      case 'track-03':
        return <Gamepad2 className="w-5 h-5 text-emerald-400" />;
      case 'track-04':
        return <HeartHandshake className="w-5 h-5 text-amber-400" />;
      default:
        return <Cpu className="w-5 h-5 text-[#E84142]" />;
    }
  };

  const getTargetTab = (id: string) => {
    switch (id) {
      case 'track-01':
        return 'agents';
      case 'track-02':
        return 'identity';
      case 'track-03':
        return 'gaming';
      case 'track-04':
        return 'impact';
      default:
        return 'agents';
    }
  };

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#161a25] to-[#0e1119] border border-slate-800 p-8 sm:p-12">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 text-xs font-semibold text-[#E84142] uppercase tracking-wider mb-3">
            <span>AvaxSkills Hackathon 2026</span>
            <span>·</span>
            <span>Propuesta Integral & Demo POC</span>
            <span>·</span>
            <span>Avalanche Ecosystem</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            SkillMesh <span className="text-[#E84142]">AVAX</span>
          </h1>

          <p className="mt-4 text-slate-300 text-base sm:text-lg leading-relaxed">
            La infraestructura que unifica los 4 tracks de <strong>AvaxSkills</strong>: Agentes de IA autónomos que operan con permisos on-chain acotados, emiten pasaportes de identidad verificables (Soulbound NFTs), arbitran misiones de gaming y auditan donaciones e impacto comunitario en Avalanche.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onSelectTrackAction('agents')}
              className="px-5 py-2.5 rounded-lg bg-[#E84142] hover:bg-[#d03637] text-white text-sm font-semibold transition-colors flex items-center gap-2 shadow-lg shadow-[#E84142]/20"
            >
              <span>Probar POC de Agentes On-Chain</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onSelectTrackAction('architecture')}
              className="px-5 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium transition-colors flex items-center gap-2 border border-slate-700"
            >
              <Layers className="w-4 h-4 text-slate-400" />
              <span>Ver Arquitectura Avalanche (Mock)</span>
            </button>
            <button
              onClick={() => onSelectTrackAction('pitch')}
              className="px-5 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 text-sm font-medium transition-colors border border-slate-800"
            >
              <span>Resumen para el Jurado</span>
            </button>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-800/80 flex flex-wrap items-center gap-6 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-200">Finalidad:</span>
            <span className="font-mono-code text-emerald-400">&lt;800 ms</span>
          </div>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-200">Tarifa Promedio:</span>
            <span className="font-mono-code text-emerald-400">&lt;$0.001 USD</span>
          </div>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-200">Estándar de Credencial:</span>
            <span className="font-mono-code text-slate-300">ERC-5192 Soulbound</span>
          </div>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-200">Interoperabilidad:</span>
            <span className="font-mono-code text-slate-300">Avalanche Teleport (ICM)</span>
          </div>
        </div>
      </div>

      {/* The 4 Tracks Grid */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <span className="text-xs font-semibold text-[#E84142] uppercase tracking-wider">AvaxSkills Official Categories</span>
            <h2 className="text-2xl font-bold text-white mt-1">Los 4 Tracks Oficiales</h2>
            <p className="text-slate-400 text-sm mt-1">
              Haz clic en cualquier track para explorar el análisis detallado y probar su POC interactiva.
            </p>
          </div>
          <div className="text-xs text-slate-400">
            <span>Evaluación independiente por track</span>
            <span className="mx-2">·</span>
            <span>SkillMesh ataca los 4</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {HACKATHON_TRACKS.map(track => {
            const isSelected = selectedTrack.id === track.id;
            return (
              <div
                key={track.id}
                onClick={() => setSelectedTrack(track)}
                className={`cursor-pointer rounded-xl p-5 border transition-all text-left flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#181d29] border-[#E84142] shadow-md shadow-[#E84142]/10 ring-1 ring-[#E84142]/50'
                    : 'bg-[#121620] border-slate-800 hover:border-slate-700 hover:bg-[#151924]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                        {getTrackIcon(track.id)}
                      </div>
                      <span className="font-mono-code text-xs text-slate-400 font-semibold">
                        Track {track.number}
                      </span>
                    </div>
                    {isSelected && (
                      <span className="text-[11px] font-semibold text-[#E84142]">Seleccionado</span>
                    )}
                  </div>

                  <h3 className="text-base font-bold text-white mb-1">{track.title}</h3>
                  <div className="text-xs text-slate-400 mb-3">{track.subtitle}</div>
                  <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                    {track.description}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="text-slate-400">Probar demo</span>
                  <span className="text-[#E84142] font-semibold flex items-center gap-1 group">
                    <span>Ir a POC</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Track Detailed Blueprint */}
      <div className="rounded-xl bg-[#121620] border border-slate-800 p-6 sm:p-8">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              {getTrackIcon(selectedTrack.id)}
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-400 font-mono-code">
                <span>Track {selectedTrack.number}</span>
                <span>·</span>
                <span>{selectedTrack.subtitle}</span>
              </div>
              <h3 className="text-xl font-bold text-white mt-0.5">{selectedTrack.title}</h3>
            </div>
          </div>

          <button
            onClick={() => onSelectTrackAction(getTargetTab(selectedTrack.id))}
            className="px-5 py-2.5 rounded-lg bg-[#E84142] hover:bg-[#d03637] text-white text-xs font-semibold transition-colors flex items-center gap-2 shrink-0"
          >
            <span>Lanzar Demo Interactiva de este Track</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Problema que Resuelve en Web3
            </span>
            <p className="text-sm text-slate-300 leading-relaxed bg-[#161a25] p-4 rounded-lg border border-slate-800/80">
              {selectedTrack.problemSolved}
            </p>
          </div>

          <div className="space-y-2">
            <span className="text-xs font-semibold text-[#E84142] uppercase tracking-wider">
              ¿Por qué Avalanche es Clave?
            </span>
            <p className="text-sm text-slate-300 leading-relaxed bg-[#161a25] p-4 rounded-lg border border-[#E84142]/20">
              {selectedTrack.avaxAdvantage}
            </p>
          </div>

          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Entregables del Prototipo (POC)
            </span>
            <div className="bg-[#161a25] p-4 rounded-lg border border-slate-800/80 space-y-2">
              {selectedTrack.deliverables.map((item, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                  <span className="text-[#E84142] font-bold">✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
