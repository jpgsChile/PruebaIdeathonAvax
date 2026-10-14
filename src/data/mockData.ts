import { HackathonTrack, AiAgent, SoulboundCredential, GamingQuest, ImpactBounty, OnChainTransaction } from '../types';

export const HACKATHON_TRACKS: HackathonTrack[] = [
  {
    id: 'track-01',
    number: '01',
    title: 'AI Agents On-Chain',
    subtitle: 'IA y automatización verificable',
    description:
      'Agentes de inteligencia artificial que no solo recomiendan, sino que actúan: ejecutan tareas, interactúan con contratos inteligentes y coordinan operaciones, siempre dentro de reglas claras, con permisos definidos y dejando registro de todo lo que hacen.',
    problemSolved:
      'Los bots tradicionales ejecutan acciones sin auditoría criptográfica y con llaves privadas expuestas. SkillMesh otorga a los agentes Session Keys acotadas sobre Avalanche con presupuestos estrictos y logs inmutables.',
    avaxAdvantage:
      'Finalidad en sub-segundos (<0.8s) y micro-gas (<$0.001) para permitir miles de llamadas autónomas sin colapsar la liquidez del agente ni retrasar la lógica.',
    pocDemonstration:
      'Simulador de ejecución de agente en tiempo real con Session Key: el agente razona, genera la firma de llamada al contrato en Avalanche Fuji y registra el hash auditable.',
    deliverables: [
      'Smart Contract SkillAgentRegistry.sol',
      'Orquestador de Session Keys con límite diario en AVAX',
      'Pipeline de ejecución verifiable con prueba criptográfica'
    ]
  },
  {
    id: 'track-02',
    number: '02',
    title: 'Digital Identity & Reputation',
    subtitle: 'Credenciales y reputación verificables',
    description:
      'Cómo demostrar quiénes somos y qué hicimos de forma confiable: identidades, credenciales y reputación que se pueden verificar fácilmente, que pertenecen a cada persona (o agente) y que se pueden llevar de una plataforma a otra.',
    problemSolved:
      'Los perfiles Web2 de LinkedIn o GitHub están aislados y son falsificables. SkillMesh emite Soulbound Tokens (ERC-5192) y un SkillPass dinámico donde cada habilidad es validada por pruebas on-chain o agentes auditores.',
    avaxAdvantage:
      'Avalanche Warp Messaging (AWM) permite que la identidad y reputación viajen entre la C-Chain y Subnets dedicadas sin puentes vulnerables.',
    pocDemonstration:
      'Emisión e inspección de pasaporte de identidad on-chain con Badges Soulbound, cálculo dinámico de puntuación de confianza (Trust Score) y firma ECDSA.',
    deliverables: [
      'Contrato ERC-5192 Soulbound SkillPassNFT.sol',
      'Algoritmo On-Chain de Trust & Skill Score',
      'Soporte multi-identidad para personas y agentes'
    ]
  },
  {
    id: 'track-03',
    number: '03',
    title: 'Gaming & Interactive Experiences',
    subtitle: 'Mecánicas, logros y juego gamificado',
    description:
      'Videojuegos, experiencias interactivas y gamificación que usan blockchain para crear nuevas mecánicas, logros verificables y formas de conectar comunidades y premiar la participación más allá de una sola plataforma.',
    problemSolved:
      'Los logros en juegos tradicionales son cerrados y no tienen valor fuera del juego. En SkillMesh, los retos de habilidad son evaluados por Árbitros de IA on-chain y recompensados con trofeos transferibles y micro-pagos en AVAX.',
    avaxAdvantage:
      'Capacidad para crear una Subnet dedicada para juegos sin competir por gas con DEXs o DeFi, manteniendo 4,500 TPS y cero fricción para jugadores.',
    pocDemonstration:
      'Retos de código y seguridad interactivos donde el usuario resuelve el acertijo, el Agente Árbitro valida la solución y se acredita un logro y recompensa en AVAX en vivo.',
    deliverables: [
      'SkillArena.sol con verificación de retos gamificados',
      'Minting instantáneo de logros interactivos',
      'Economía de XP y micro-incentivos en AVAX'
    ]
  },
  {
    id: 'track-04',
    number: '04',
    title: 'Web3 for Real Impact',
    subtitle: 'Blockchain para resolver problemas reales',
    description:
      'Usar blockchain para resolver problemas reales de comunidades y organizaciones, aportando transparencia, trazabilidad y mejor coordinación en áreas como donaciones, educación, sostenibilidad y participación ciudadana.',
    problemSolved:
      'Fondos y donaciones tradicionales sufren de intermediarios costosos y falta de evidencia real. SkillMesh utiliza Impact Vaults donde el dinero se libera solo cuando los agentes de IA verifican el cumplimiento del impacto comunitario.',
    avaxAdvantage:
      'Avalanche es una de las redes más ecológicas (Consenso PoS ultraligero neutral en carbono) y permite micro-grants sin que las comisiones se coman las donaciones.',
    pocDemonstration:
      'Bounties comunitarios con bóvedas de garantía en AVAX: envío de evidencia, auditoría del agente y desembolso automático y transparente hacia la comunidad.',
    deliverables: [
      'ImpactBountyVault.sol con escrow programable',
      'Verificador autónomo de pruebas de impacto',
      'Dashboard público de trazabilidad de fondos'
    ]
  }
];

export const INITIAL_AGENTS: AiAgent[] = [
  {
    id: 'agent-sentinel',
    name: 'Sentinel-Auditor',
    role: 'Auditor de Seguridad On-Chain & Lógica',
    trackId: 'track-01',
    avatar: 'shield',
    walletAddress: '0x9B81aE4aC7D4f2B0193E3d354Fcf8A0E46F280D1',
    contractPermissions: ['SkillAgentRegistry.sol:verifyProof', 'SkillPassNFT.sol:attestSkill'],
    maxDailyBudgetAvax: 5.0,
    spentTodayAvax: 0.12,
    reputationScore: 98,
    completedTasksCount: 1420,
    status: 'active',
    systemPromptSummary: 'Verifica contratos inteligentes y pruebas de código antes de autorizar la emisión de credenciales en Avalanche Fuji.'
  },
  {
    id: 'agent-arbiter',
    name: 'Valkyrie-Arbiter',
    role: 'Árbitro de Gaming & Logros Competitivos',
    trackId: 'track-03',
    avatar: 'swords',
    walletAddress: '0x42f7F7c1d763E51e7040B48A0a0b271dEf4E3c7E',
    contractPermissions: ['SkillArena.sol:judgeMatch', 'SkillPassNFT.sol:rewardTrophy'],
    maxDailyBudgetAvax: 10.0,
    spentTodayAvax: 1.45,
    reputationScore: 95,
    completedTasksCount: 3840,
    status: 'active',
    systemPromptSummary: 'Evalúa la ejecución de acertijos y misiones de los jugadores, garantizando juego limpio y emitiendo trofeos en Avalanche.'
  },
  {
    id: 'agent-impact',
    name: 'Gaia-ImpactVerifier',
    role: 'Verificador de Impacto Social & Ecológico',
    trackId: 'track-04',
    avatar: 'leaf',
    walletAddress: '0x18Da36f452C753A1B6a0F86bcf6418D16104F903',
    contractPermissions: ['ImpactBountyVault.sol:releaseMilestone', 'ImpactRegistry.sol:recordMetric'],
    maxDailyBudgetAvax: 25.0,
    spentTodayAvax: 4.80,
    reputationScore: 99,
    completedTasksCount: 890,
    status: 'active',
    systemPromptSummary: 'Audita pruebas documentales, enlaces a repositorios y telemetría comunitaria antes de liberar micro-grants en AVAX.'
  }
];

export const INITIAL_CREDENTIALS: SoulboundCredential[] = [
  {
    id: 'cred-01',
    tokenId: 1042,
    title: 'Avalanche Subnet Architect',
    category: 'Infraestructura Web3',
    trackId: 'track-02',
    issuedTo: '0x71C948B027d1109aA901F2d6C7d9Eb7B2e254E92',
    issuerAgent: 'Sentinel-Auditor',
    issueDate: '2026-03-28',
    txHash: '0x8f2a5b6e4c7d193e2a0b1c4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b',
    score: 96,
    criteria: 'Despliegue y configuración exitosa de una Subnet personalizada con consenso Avalanche PoS y parámetros EVM customizados.',
    skills: ['Avalanche CLI', 'Subnets L1', 'Solidity', 'Teleport/ICM'],
    isRevocable: false,
    metadataUri: 'ipfs://bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi'
  },
  {
    id: 'cred-02',
    tokenId: 1043,
    title: 'Smart Contract Security Guardian',
    category: 'Auditoría & Seguridad',
    trackId: 'track-01',
    issuedTo: '0x71C948B027d1109aA901F2d6C7d9Eb7B2e254E92',
    issuerAgent: 'Sentinel-Auditor',
    issueDate: '2026-04-02',
    txHash: '0x3c7e4d5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e',
    score: 99,
    criteria: 'Resolución de 5 retos de reentrancy, overflow y front-running en la Skill Arena con análisis verificado por IA.',
    skills: ['Reentrancy Guard', 'ERC-4337', 'ECDSA Proofs'],
    isRevocable: false,
    metadataUri: 'ipfs://bafybeihkovi2nrf576w7mfsjdfhksdf738472834y32uhfiu32hfiu3'
  },
  {
    id: 'cred-03',
    tokenId: 1044,
    title: 'Web3 Community Impact Lead',
    category: 'Impacto Social & Educación',
    trackId: 'track-04',
    issuedTo: '0x71C948B027d1109aA901F2d6C7d9Eb7B2e254E92',
    issuerAgent: 'Gaia-ImpactVerifier',
    issueDate: '2026-04-10',
    txHash: '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b',
    score: 94,
    criteria: 'Creación de material educativo en español sobre Avalanche y orquestación de taller universitario verificado.',
    skills: ['Educación Web3', 'Gobernanza DAO', 'Impact Bounties'],
    isRevocable: false,
    metadataUri: 'ipfs://bafybeibvhkdfg78342yiuwehfksdfjhsdkfjhsdf83748239749'
  }
];

export const INITIAL_GAMING_QUESTS: GamingQuest[] = [
  {
    id: 'quest-01',
    title: 'El Vault de Reentrancia (Misión Defensiva)',
    category: 'Seguridad en Solidity',
    difficulty: 'Intermedio',
    rewardAvax: 1.5,
    xpPoints: 350,
    objective: 'Añade el patrón Checks-Effects-Interactions o el modificador nonReentrant para proteger la bóveda.',
    scenario:
      'Un atacante está drenando el contrato de la bóveda usando un contrato con fallback malicioso. El Árbitro IA Valkyrie evaluará tu corrección en la C-Chain.',
    starterCode: `function withdraw(uint256 amount) external {
    require(balances[msg.sender] >= amount, "Saldo insuficiente");
    (bool sent, ) = msg.sender.call{value: amount}("");
    require(sent, "Fallo transferencia");
    balances[msg.sender] -= amount;
}`,
    expectedKeyword: 'nonReentrant',
    completed: false
  },
  {
    id: 'quest-02',
    title: 'Autenticación con Session Keys (ERC-4337)',
    category: 'Agentes Autónomos',
    difficulty: 'Avanzado',
    rewardAvax: 2.8,
    xpPoints: 500,
    objective: 'Configura el validador de permisos para que el Agente solo pueda gastar hasta 0.5 AVAX por transacción.',
    scenario:
      'Queremos que nuestro agente Sentinel opere sin custodia total. Define la restricción de límite de gas y valor en la firma.',
    starterCode: `function validateUserOp(UserOperation calldata userOp) external returns (uint256) {
    require(isAgentAuthorized(userOp.sender), "Agente no autorizado");
    return 0; // Exito
}`,
    expectedKeyword: 'MAX_AGENT_TRANSACTION_LIMIT',
    completed: false
  },
  {
    id: 'quest-03',
    title: 'Teleport Warp Message Validator',
    category: 'Interchain Messaging',
    difficulty: 'Principiante',
    rewardAvax: 0.8,
    xpPoints: 200,
    objective: 'Implementa la verificación de firma BLS para validar un mensaje entre Subnets de Avalanche.',
    scenario:
      'Una subnet de juegos quiere recibir un Soulbound Badge emitido en la C-Chain mediante Avalanche Interchain Messaging (ICM).',
    starterCode: `function receiveTeleportMessage(bytes calldata warpMessage) external {
    bytes32 sourceChainID = extractSource(warpMessage);
    require(sourceChainID == C_CHAIN_ID, "Cadena origen invalida");
}`,
    expectedKeyword: 'C_CHAIN_ID',
    completed: false
  }
];

export const INITIAL_IMPACT_BOUNTIES: ImpactBounty[] = [
  {
    id: 'bounty-01',
    title: 'Traducción y Guías de Inicio Rápido de Avalanche en Español',
    organization: 'Avalanche LATAM Builders Guild',
    allocatedAvax: 15.0,
    claimedAvax: 5.0,
    impactMetric: 'Documentación accesible para 5,000+ desarrolladores hispanohablantes',
    beneficiaries: 'Estudiantes e ingenieros de Latinoamérica',
    verificationAgent: 'Gaia-ImpactVerifier',
    status: 'abierto',
    proofRequirements: 'Pull Request merged en repositorio oficial con markdown validado y glosario técnico.'
  },
  {
    id: 'bounty-02',
    title: 'Monitoreo Comunitario de Calidad de Aire con Sensores IoT',
    organization: 'OpenEco Medellín & C-Chain Oracle',
    allocatedAvax: 25.0,
    claimedAvax: 12.5,
    impactMetric: '24 estaciones meteorológicas transmitiendo datos validados on-chain',
    beneficiaries: '120,000 residentes de comunas urbanas',
    verificationAgent: 'Gaia-ImpactVerifier',
    status: 'en_verificacion',
    proofRequirements: 'Transmisión horaria firmada por oráculo de hardware hacia el contrato ImpactBountyVault.'
  },
  {
    id: 'bounty-03',
    title: 'Hackathon Universitario Web3: Becas de Gas y Mentoría',
    organization: 'UniBlockchain Network',
    allocatedAvax: 30.0,
    claimedAvax: 30.0,
    impactMetric: '42 prototipos presentados y 120 alumnos certificados con Soulbound Badges',
    beneficiaries: 'Universidades públicas regionales',
    verificationAgent: 'Gaia-ImpactVerifier',
    status: 'financiado',
    proofRequirements: 'Lista de contratos desplegados en Fuji Testnet y registro de asistencia verificado por token.',
    recentSubmission: {
      applicant: '0x71C948B027d1109aA901F2d6C7d9Eb7B2e254E92',
      proofUrl: 'https://github.com/avaxskills/uni-hackathon-fuji-registry',
      verifiedAt: '2026-04-11',
      txHash: '0x5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c'
    }
  }
];

export const INITIAL_TRANSACTIONS: OnChainTransaction[] = [
  {
    hash: '0x8f2a5b6e4c7d193e2a0b1c4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b',
    blockNumber: 4381024,
    timestamp: 'Hace 12 min',
    from: '0x9B81aE4aC7D4f2B0193E3d354Fcf8A0E46F280D1',
    to: '0x2F7819B14E91d0A4F35C83416a2E9cE67bF74a58',
    contractName: 'SkillPassNFT.sol',
    method: 'mintSoulboundCredential',
    params: {
      recipient: '0x71C948B0...4E92',
      tokenId: 1042,
      skill: 'Avalanche Subnet Architect',
      score: 96
    },
    valueAvax: 0,
    gasUsedAvax: 0.00038,
    gasPriceGwei: 25.0,
    finalityTimeMs: 680,
    status: 'confirmed',
    network: 'avalanche-fuji',
    description: 'Emisión de Soulbound Token de Reputación verificado por Sentinel-Auditor'
  },
  {
    hash: '0x5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c',
    blockNumber: 4381018,
    timestamp: 'Hace 35 min',
    from: '0x18Da36f452C753A1B6a0F86bcf6418D16104F903',
    to: '0x88b7194A3D73992bFc7e05C61947b6a6552B581e',
    contractName: 'ImpactBountyVault.sol',
    method: 'disburseBountyPayout',
    params: {
      bountyId: 'bounty-03',
      beneficiary: '0x71C948B0...4E92',
      amountAvax: 15.0
    },
    valueAvax: 15.0,
    gasUsedAvax: 0.00052,
    gasPriceGwei: 25.0,
    finalityTimeMs: 710,
    status: 'confirmed',
    network: 'avalanche-fuji',
    description: 'Desembolso de micro-grant tras validación de evidencia comunitaria por Gaia Agent'
  }
];

export const SOLIDITY_CONTRACT_SNIPPETS = {
  SkillAgentRegistry: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title SkillAgentRegistry
 * @dev Gestiona permisos y presupuestos de Session Keys para Agentes de IA en Avalanche
 */
contract SkillAgentRegistry {
    struct AgentPolicy {
        bool isActive;
        uint256 dailyLimitWei;
        uint256 spentTodayWei;
        uint256 lastResetTimestamp;
        bytes32 allowedScopeHash;
    }

    mapping(address => AgentPolicy) public agentPolicies;
    event AgentExecuted(address indexed agent, address indexed target, bytes4 method, uint256 value);

    modifier onlyAuthorizedAgent(uint256 value) {
        AgentPolicy storage policy = agentPolicies[msg.sender];
        require(policy.isActive, "SkillMesh: Agente no activo");
        if (block.timestamp > policy.lastResetTimestamp + 1 days) {
            policy.spentTodayWei = 0;
            policy.lastResetTimestamp = block.timestamp;
        }
        require(policy.spentTodayWei + value <= policy.dailyLimitWei, "SkillMesh: Limite diario excedido");
        policy.spentTodayWei += value;
        _;
    }

    function executeOnChainTask(address targetContract, bytes calldata data) 
        external 
        payable 
        onlyAuthorizedAgent(msg.value) 
        returns (bool success, bytes memory result) 
    {
        (success, result) = targetContract.call{value: msg.value}(data);
        require(success, "Fallo ejecucion del contrato objetivo");
        emit AgentExecuted(msg.sender, targetContract, bytes4(data[:4]), msg.value);
    }
}`,

  SoulboundReputation: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

/**
 * @title SoulboundSkillPass
 * @notice Credencial no transferible (ERC-5192) emitida por Agentes de IA en Avalanche C-Chain
 */
contract SoulboundSkillPass is ERC721 {
    uint256 private _nextTokenId;
    address public agentRegistry;

    struct Attestation {
        uint256 score;
        string skillTitle;
        uint64 timestamp;
        address verifiedByAgent;
    }

    mapping(uint256 => Attestation) public attestations;

    event Locked(uint256 tokenId);
    event SkillAttested(uint256 indexed tokenId, address indexed recipient, string skill, uint256 score);

    constructor(address _agentRegistry) ERC721("SkillMesh Pass", "SMPASS") {
        agentRegistry = _agentRegistry;
    }

    function mintAttestation(
        address to, 
        string calldata skillTitle, 
        uint256 score, 
        string calldata metadataUri
    ) external returns (uint256) {
        require(msg.sender == agentRegistry, "Solo agentes verificados pueden emitir");
        uint256 tokenId = ++_nextTokenId;
        _safeMint(to, tokenId);
        
        attestations[tokenId] = Attestation({
            score: score,
            skillTitle: skillTitle,
            timestamp: uint64(block.timestamp),
            verifiedByAgent: msg.sender
        });

        emit Locked(tokenId); // EIP-5192 Soulbound Lock
        emit SkillAttested(tokenId, to, skillTitle, score);
        return tokenId;
    }

    function _update(address to, uint256 tokenId, address auth) internal override returns (address) {
        address from = _ownerOf(tokenId);
        if (from != address(0) && to != address(0)) {
            revert("Soulbound: Esta credencial es intransferible");
        }
        return super._update(to, tokenId, auth);
    }
}`,

  ImpactVault: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title ImpactBountyVault
 * @notice Deposito de fondos en AVAX liberados por verificacion de IA en Avalanche
 */
contract ImpactBountyVault {
    address public arbiterAgent;

    struct Bounty {
        uint256 totalAmountWei;
        uint256 disbursedWei;
        bool isCompleted;
        string metricDescription;
    }

    mapping(bytes32 => Bounty) public bounties;

    event BountyCreated(bytes32 indexed bountyId, uint256 amount);
    event BountyDisbursed(bytes32 indexed bountyId, address indexed recipient, uint256 amount);

    function createBounty(bytes32 bountyId, string calldata metric) external payable {
        require(msg.value > 0, "Debe financiar el bounty con AVAX");
        bounties[bountyId] = Bounty({
            totalAmountWei: msg.value,
            disbursedWei: 0,
            isCompleted: false,
            metricDescription: metric
        });
        emit BountyCreated(bountyId, msg.value);
    }

    function verifyAndDisburse(
        bytes32 bountyId, 
        address payable beneficiary, 
        uint256 amount, 
        bytes calldata proofSignature
    ) external {
        require(msg.sender == arbiterAgent, "Solo el agente auditor puede desembolsar");
        Bounty storage bounty = bounties[bountyId];
        require(!bounty.isCompleted, "Bounty finalizado");
        require(bounty.disbursedWei + amount <= bounty.totalAmountWei, "Monto excede fondo disponible");

        bounty.disbursedWei += amount;
        if (bounty.disbursedWei == bounty.totalAmountWei) {
            bounty.isCompleted = true;
        }

        beneficiary.transfer(amount);
        emit BountyDisbursed(bountyId, beneficiary, amount);
    }
}`
};
