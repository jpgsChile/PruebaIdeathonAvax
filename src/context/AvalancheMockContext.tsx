import React, { createContext, useContext, useState, ReactNode } from 'react';
import {
  MockWallet,
  OnChainTransaction,
  AiAgent,
  SoulboundCredential,
  GamingQuest,
  ImpactBounty,
  NetworkType
} from '../types';
import {
  INITIAL_AGENTS,
  INITIAL_CREDENTIALS,
  INITIAL_GAMING_QUESTS,
  INITIAL_IMPACT_BOUNTIES,
  INITIAL_TRANSACTIONS
} from '../data/mockData';

interface AvalancheContextType {
  wallet: MockWallet;
  transactions: OnChainTransaction[];
  agents: AiAgent[];
  credentials: SoulboundCredential[];
  quests: GamingQuest[];
  bounties: ImpactBounty[];
  activeModalTx: OnChainTransaction | null;
  selectedTrackFilter: string;
  isExecutingAgent: boolean;
  agentExecutionStep: {
    stepIndex: number;
    title: string;
    description: string;
    isFinished: boolean;
  } | null;

  switchNetwork: (network: NetworkType) => void;
  claimFaucet: () => void;
  toggleWalletConnection: () => void;
  openTxModal: (tx: OnChainTransaction) => void;
  closeTxModal: () => void;
  setSelectedTrackFilter: (trackId: string) => void;
  mintNewCredential: (skillTitle: string, score: number, agentId: string) => Promise<OnChainTransaction>;
  solveQuest: (questId: string, answerCode: string) => Promise<{ success: boolean; message: string; tx?: OnChainTransaction }>;
  submitImpactProof: (bountyId: string, proofUrl: string, summary: string) => Promise<OnChainTransaction>;
  runAgentTask: (agentId: string, taskDescription: string, paramPayload: any) => Promise<OnChainTransaction>;
}

const AvalancheContext = createContext<AvalancheContextType | undefined>(undefined);

export const AvalancheProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [wallet, setWallet] = useState<MockWallet>({
    address: '0x71C948B027d1109aA901F2d6C7d9Eb7B2e254E92',
    balanceAvax: 28.45,
    network: 'avalanche-fuji',
    networkName: 'Avalanche Fuji Testnet (Chain ID 43113)',
    chainId: 43113,
    isConnected: true,
    transactionsCount: 14,
    reputationScore: 92
  });

  const [transactions, setTransactions] = useState<OnChainTransaction[]>(INITIAL_TRANSACTIONS);
  const [agents, setAgents] = useState<AiAgent[]>(INITIAL_AGENTS);
  const [credentials, setCredentials] = useState<SoulboundCredential[]>(INITIAL_CREDENTIALS);
  const [quests, setQuests] = useState<GamingQuest[]>(INITIAL_GAMING_QUESTS);
  const [bounties, setBounties] = useState<ImpactBounty[]>(INITIAL_IMPACT_BOUNTIES);

  const [activeModalTx, setActiveModalTx] = useState<OnChainTransaction | null>(null);
  const [selectedTrackFilter, setSelectedTrackFilter] = useState<string>('all');
  const [isExecutingAgent, setIsExecutingAgent] = useState<boolean>(false);
  const [agentExecutionStep, setAgentExecutionStep] = useState<{
    stepIndex: number;
    title: string;
    description: string;
    isFinished: boolean;
  } | null>(null);

  const generateTxHash = () => {
    const chars = '0123456789abcdef';
    let hash = '0x';
    for (let i = 0; i < 64; i++) {
      hash += chars[Math.floor(Math.random() * chars.length)];
    }
    return hash;
  };

  const switchNetwork = (network: NetworkType) => {
    setWallet(prev => ({
      ...prev,
      network,
      networkName:
        network === 'avalanche-fuji'
          ? 'Avalanche Fuji Testnet (Chain ID 43113)'
          : 'SkillMesh L1 Subnet (Chain ID 9942)',
      chainId: network === 'avalanche-fuji' ? 43113 : 9942
    }));
  };

  const claimFaucet = () => {
    const faucetTx: OnChainTransaction = {
      hash: generateTxHash(),
      blockNumber: 4381000 + transactions.length + 1,
      timestamp: 'Ahora mismo',
      from: '0x0000000000000000000000000000000000000000',
      to: wallet.address,
      contractName: 'AvalancheFujiFaucet.sol',
      method: 'requestTestnetAvax',
      params: { recipient: wallet.address, amount: '10.0 AVAX' },
      valueAvax: 10.0,
      gasUsedAvax: 0.00021,
      gasPriceGwei: 25.0,
      finalityTimeMs: 540,
      status: 'confirmed',
      network: wallet.network,
      description: 'Airdrop de 10.0 AVAX de prueba en Avalanche Fuji'
    };

    setWallet(prev => ({
      ...prev,
      balanceAvax: Number((prev.balanceAvax + 10.0).toFixed(4)),
      transactionsCount: prev.transactionsCount + 1
    }));
    setTransactions(prev => [faucetTx, ...prev]);
  };

  const toggleWalletConnection = () => {
    setWallet(prev => ({
      ...prev,
      isConnected: !prev.isConnected
    }));
  };

  const openTxModal = (tx: OnChainTransaction) => {
    setActiveModalTx(tx);
  };

  const closeTxModal = () => {
    setActiveModalTx(null);
  };

  const runAgentTask = async (
    agentId: string,
    taskDescription: string,
    paramPayload: any
  ): Promise<OnChainTransaction> => {
    setIsExecutingAgent(true);
    const agent = agents.find(a => a.id === agentId) || agents[0];

    setAgentExecutionStep({
      stepIndex: 1,
      title: 'Verificando Políticas de Session Key (On-Chain)',
      description: `Comprobando límites diarios en SkillAgentRegistry.sol para ${agent.name}...`,
      isFinished: false
    });
    await new Promise(r => setTimeout(r, 450));

    setAgentExecutionStep({
      stepIndex: 2,
      title: 'Inferencia del Agente y Firma de Transacción',
      description: 'El agente procesa los parámetros de entrada y genera el payload calldata codificado.',
      isFinished: false
    });
    await new Promise(r => setTimeout(r, 550));

    setAgentExecutionStep({
      stepIndex: 3,
      title: 'Broadcasting hacia el nodo Avalanche RPC',
      description: `Emitiendo transacción a través de Avalanche C-Chain (<800ms finality)...`,
      isFinished: false
    });
    await new Promise(r => setTimeout(r, 450));

    const gasUsed = 0.00042;
    const tx: OnChainTransaction = {
      hash: generateTxHash(),
      blockNumber: 4381000 + transactions.length + 2,
      timestamp: 'Ahora mismo',
      from: agent.walletAddress,
      to: '0x2F7819B14E91d0A4F35C83416a2E9cE67bF74a58',
      contractName: 'SkillAgentRegistry.sol',
      method: 'executeOnChainTask',
      params: {
        agent: agent.name,
        action: taskDescription,
        ...paramPayload
      },
      valueAvax: 0,
      gasUsedAvax: gasUsed,
      gasPriceGwei: 25.0,
      finalityTimeMs: 640,
      status: 'confirmed',
      network: wallet.network,
      description: `Acción autónoma ejecutada por ${agent.name}: "${taskDescription}"`
    };

    setTransactions(prev => [tx, ...prev]);

    setAgents(prev =>
      prev.map(a =>
        a.id === agent.id
          ? {
              ...a,
              completedTasksCount: a.completedTasksCount + 1,
              spentTodayAvax: Number((a.spentTodayAvax + gasUsed).toFixed(4))
            }
          : a
      )
    );

    setAgentExecutionStep({
      stepIndex: 4,
      title: '¡Finalizado con éxito en Avalanche!',
      description: `Hash registrado: ${tx.hash.slice(0, 10)}... (Bloque #${tx.blockNumber})`,
      isFinished: true
    });

    await new Promise(r => setTimeout(r, 400));
    setIsExecutingAgent(false);
    return tx;
  };

  const mintNewCredential = async (
    skillTitle: string,
    score: number,
    agentId: string
  ): Promise<OnChainTransaction> => {
    const tx = await runAgentTask(agentId, `Emitir Soulbound Pass: ${skillTitle}`, {
      recipient: wallet.address,
      score,
      skillTitle
    });

    const newCred: SoulboundCredential = {
      id: `cred-${Date.now()}`,
      tokenId: 1045 + credentials.length,
      title: skillTitle,
      category: 'Habilidad Verificada por IA',
      trackId: 'track-02',
      issuedTo: wallet.address,
      issuerAgent: agents.find(a => a.id === agentId)?.name || 'Sentinel-Auditor',
      issueDate: new Date().toISOString().split('T')[0],
      txHash: tx.hash,
      score,
      criteria: 'Verificación exitosa de pruebas de lógica y ejecución verificable on-chain.',
      skills: [skillTitle, 'Avalanche C-Chain', 'ERC-5192'],
      isRevocable: false,
      metadataUri: `ipfs://bafybeicustomhash${Date.now()}`
    };

    setCredentials(prev => [newCred, ...prev]);
    setWallet(prev => ({
      ...prev,
      reputationScore: Math.min(100, prev.reputationScore + 2)
    }));

    return tx;
  };

  const solveQuest = async (
    questId: string,
    answerCode: string
  ): Promise<{ success: boolean; message: string; tx?: OnChainTransaction }> => {
    const quest = quests.find(q => q.id === questId);
    if (!quest) return { success: false, message: 'Misión no encontrada.' };

    const isValid = answerCode.includes(quest.expectedKeyword);
    if (!isValid) {
      return {
        success: false,
        message: `El Árbitro Valkyrie evaluó el código: Falta la verificación crítica de '${quest.expectedKeyword}'. Revisa los requisitos de seguridad.`
      };
    }

    const tx = await runAgentTask('agent-arbiter', `Acreditar Trofeo y XP para ${quest.title}`, {
      questId,
      player: wallet.address,
      rewardAvax: quest.rewardAvax,
      xp: quest.xpPoints
    });

    setQuests(prev =>
      prev.map(q => (q.id === questId ? { ...q, completed: true } : q))
    );

    setWallet(prev => ({
      ...prev,
      balanceAvax: Number((prev.balanceAvax + quest.rewardAvax).toFixed(4)),
      reputationScore: Math.min(100, prev.reputationScore + 3)
    }));

    return {
      success: true,
      message: `¡Misión aprobada por el Árbitro IA! Recibiste +${quest.rewardAvax} AVAX y +${quest.xpPoints} XP registrados on-chain.`,
      tx
    };
  };

  const submitImpactProof = async (
    bountyId: string,
    proofUrl: string,
    summary: string
  ): Promise<OnChainTransaction> => {
    const bounty = bounties.find(b => b.id === bountyId);
    const releaseAmount = bounty ? Math.min(5.0, bounty.allocatedAvax - bounty.claimedAvax) : 2.5;

    const tx = await runAgentTask('agent-impact', `Verificar evidencia y liberar micro-grant: ${bounty?.title || 'Bounty'}`, {
      bountyId,
      proofUrl,
      summary,
      disbursementAmountAvax: releaseAmount,
      beneficiary: wallet.address
    });

    setBounties(prev =>
      prev.map(b =>
        b.id === bountyId
          ? {
              ...b,
              claimedAvax: Number((b.claimedAvax + releaseAmount).toFixed(2)),
              status: b.claimedAvax + releaseAmount >= b.allocatedAvax ? 'financiado' : 'en_verificacion',
              recentSubmission: {
                applicant: wallet.address,
                proofUrl,
                verifiedAt: new Date().toISOString().split('T')[0],
                txHash: tx.hash
              }
            }
          : b
      )
    );

    setWallet(prev => ({
      ...prev,
      balanceAvax: Number((prev.balanceAvax + releaseAmount).toFixed(4)),
      reputationScore: Math.min(100, prev.reputationScore + 4)
    }));

    return tx;
  };

  return (
    <AvalancheContext.Provider
      value={{
        wallet,
        transactions,
        agents,
        credentials,
        quests,
        bounties,
        activeModalTx,
        selectedTrackFilter,
        isExecutingAgent,
        agentExecutionStep,
        switchNetwork,
        claimFaucet,
        toggleWalletConnection,
        openTxModal,
        closeTxModal,
        setSelectedTrackFilter,
        mintNewCredential,
        solveQuest,
        submitImpactProof,
        runAgentTask
      }}
    >
      {children}
    </AvalancheContext.Provider>
  );
};

export const useAvalanche = () => {
  const context = useContext(AvalancheContext);
  if (!context) {
    throw new Error('useAvalanche debe usarse dentro de un AvalancheProvider');
  }
  return context;
};
