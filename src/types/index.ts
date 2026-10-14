export type TrackId = 'track-01' | 'track-02' | 'track-03' | 'track-04';

export interface HackathonTrack {
  id: TrackId;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  problemSolved: string;
  avaxAdvantage: string;
  pocDemonstration: string;
  deliverables: string[];
}

export type NetworkType = 'avalanche-fuji' | 'skillmesh-subnet';

export interface MockWallet {
  address: string;
  balanceAvax: number;
  network: NetworkType;
  networkName: string;
  chainId: number;
  isConnected: boolean;
  transactionsCount: number;
  reputationScore: number;
}

export interface OnChainTransaction {
  hash: string;
  blockNumber: number;
  timestamp: string;
  from: string;
  to: string;
  contractName: string;
  method: string;
  params: Record<string, any>;
  valueAvax: number;
  gasUsedAvax: number;
  gasPriceGwei: number;
  finalityTimeMs: number;
  status: 'confirmed' | 'pending' | 'failed';
  network: NetworkType;
  description: string;
}

export interface AiAgent {
  id: string;
  name: string;
  role: string;
  trackId: TrackId;
  avatar: string;
  walletAddress: string;
  contractPermissions: string[];
  maxDailyBudgetAvax: number;
  spentTodayAvax: number;
  reputationScore: number;
  completedTasksCount: number;
  status: 'active' | 'idle' | 'executing';
  systemPromptSummary: string;
}

export interface SoulboundCredential {
  id: string;
  tokenId: number;
  title: string;
  category: string;
  trackId: TrackId;
  issuedTo: string;
  issuerAgent: string;
  issueDate: string;
  txHash: string;
  score: number;
  criteria: string;
  skills: string[];
  isRevocable: boolean;
  metadataUri: string;
}

export interface GamingQuest {
  id: string;
  title: string;
  category: string;
  difficulty: 'Principiante' | 'Intermedio' | 'Avanzado';
  rewardAvax: number;
  xpPoints: number;
  objective: string;
  scenario: string;
  starterCode: string;
  expectedKeyword: string;
  completed: boolean;
}

export interface ImpactBounty {
  id: string;
  title: string;
  organization: string;
  allocatedAvax: number;
  claimedAvax: number;
  impactMetric: string;
  beneficiaries: string;
  verificationAgent: string;
  status: 'abierto' | 'en_verificacion' | 'financiado';
  proofRequirements: string;
  recentSubmission?: {
    applicant: string;
    proofUrl: string;
    verifiedAt?: string;
    txHash?: string;
  };
}
