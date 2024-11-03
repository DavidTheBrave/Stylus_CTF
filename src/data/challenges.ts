import { Challenge } from '../types';

export const challenges: Challenge[] = [
  {
    id: "storage-takeover",
    title: "Storage Takeover: The Hidden Gateway",
    description: `You've discovered a vulnerable smart contract that implements basic ownership functionality. 
    Your mission is to take control by manipulating the contract's storage directly.


    The contract uses Stylus's storage system, but there might be a way to bypass the intended access controls.
    Can you find the vulnerability and claim ownership? \n\n


    **Objectives**:\n
    - Analyze how Stylus handles contract storage\n
    - Find a way to modify the owner state without using standard ownership transfer\n
    - Successfully become the new owner\n
    - Ensure proper event emission\n

    
    **Initial Setup**:\n
    - Contract is deployed with another owner\n
    - Standard ownership transfer is protected\n
    - You have no special privileges`,
    category: "smart-contracts",
    difficulty: "medium",
    points: 300,
    template: `use stylus_sdk::prelude::*;
use stylus_sdk::storage::StorageU256;

#[component]
struct VulnerableContract {
    owner: StorageU256,
    initialized: StorageU256,
}

#[external]
impl VulnerableContract {
    pub fn constructor(&mut self) {
        self.owner.set(msg::sender());
        self.initialized.set(U256::from(1));
    }
    
    pub fn owner(&self) -> U256 {
        self.owner.get()
    }

    pub fn initialize(&mut self) {
        if self.initialized.get() == U256::from(0) {
            self.owner.set(msg::sender());
            self.initialized.set(U256::from(1));
        }
    }

    // Add your solution here
}`,
    solution: `self.initialized.set(U256::from(0));self.initialize();`,
    hint: "Think about how contract initialization works. What happens if you could reset a flag?",
    timeLimit: 600,
    bonusPoints: 150,
    achievement: "Storage Master"
  },
  {
    id: "bridge-guardian",
    title: "Bridge Guardian: Cross-Chain Sentinel",
    description: `You're tasked with securing a critical cross-chain bridge component. 
    The system needs to handle token transfers while maintaining strict security protocols.

    Your challenge is to implement the missing bridge validation logic and ensure proper event emission.

    **Objectives**:
    - Implement secure message validation
    - Handle cross-chain token transfers
    - Emit appropriate events for tracking
    - Prevent double-spending attacks
    - Implement proper access controls

    **Initial Setup**:
    - Bridge contract is deployed
    - You need to implement core security logic
    - System expects proper event emission`,
    category: "smart-contracts",
    difficulty: "hard",
    points: 400,
    template: `use stylus_sdk::prelude::*;
use stylus_sdk::storage::{StorageU256, StorageMap};

#[derive(Clone, Debug, PartialEq)]
pub struct Transfer {
    from: Address,
    to: Address,
    amount: U256,
    nonce: U256,
}

#[component]
struct BridgeContract {
    owner: StorageU256,
    processed_messages: StorageMap<U256, bool>,
    total_bridged: StorageU256,
}

#[external]
impl BridgeContract {
    pub fn constructor(&mut self) {
        self.owner.set(msg::sender());
        self.total_bridged.set(U256::zero());
    }
    
    // Implement the bridge_transfer function
    // It should:
    // 1. Validate the transfer message
    // 2. Check for double-spending
    // 3. Process the transfer
    // 4. Emit appropriate events
    
    pub fn bridge_transfer(&mut self, transfer: Transfer, signature: Vec<u8>) {
        // Add your solution here
    }
}`,
    solution:`if self.processed_messages.get(&transfer.nonce) {
    revert("Transfer already processed");
};
let message_hash = keccak256(&transfer);
if !verify_signature(message_hash, signature, self.owner.get()) {
    revert("Invalid signature");
};
self.processed_messages.set(&transfer.nonce, true);
let new_total = self.total_bridged.get() + transfer.amount;
self.total_bridged.set(new_total);
evm::log2(
    &[],
    &[
        topics::bridge_transfer(),
        transfer.from.into(),
        transfer.to.into()
    ]
);`,
    hint: "Consider how to prevent replay attacks and ensure proper signature verification",
    timeLimit: 900,
    bonusPoints: 200,
    achievement: "Bridge Guardian"
  },
  {
    id: "double-spend-detective",
    title: "ERC20 Double-Spend Detective",
    description: `A modified ERC20 token implementation contains a critical vulnerability allowing double-spending. 
    Your mission is to identify and exploit this vulnerability to drain the contract.

    **Objectives**:
    - Find the double-spend vulnerability in the custom function
    - Successfully exploit the vulnerability
    - Document the attack vector
    - Capture the transaction hash as proof

    **Initial Setup**:
    - Modified ERC20 contract is deployed
    - Contract has tokens pre-minted
    - Reentrancy is explicitly enabled`,
    category: "smart-contracts",
    difficulty: "medium",
    points: 350,
    template: `use stylus_sdk::prelude::*;
use stylus_sdk::storage::{StorageU256, StorageMap};

#[component]
struct VulnerableToken {
    balances: StorageMap<Address, U256>,
    total_supply: StorageU256,
    processing_transfer: StorageU256,
}

#[external]
impl VulnerableToken {
    pub fn constructor(&mut self) {
        self.total_supply.set(U256::from(1000000));
        self.balances.set(&msg::sender(), U256::from(1000000));
    }

    // Vulnerable transfer function with callback
    pub fn transfer_with_callback(&mut self, to: Address, amount: U256, callback: Address) {
        // Implement the vulnerable transfer logic here
    }
}`,
solution: `let sender = msg::sender();
let sender_balance = self.balances.get(&sender);
if sender_balance < amount {
    revert("Insufficient balance");
}
if callback != Address::zero() {
    external::call(callback, &[], 0.into());
}
self.balances.set(&sender, sender_balance - amount);
self.balances.set(&to, self.balances.get(&to) + amount);`,
    hint: "Look closely at the order of operations in transfer_with_callback. When does the balance update happen relative to the callback?",
    timeLimit: 600,
    bonusPoints: 150,
    achievement: "Double Spend Hunter"
  },
  {
    id: "access-control-anarchy",
    title: "Access Control Anarchy",
    description: `A contract using OpenZeppelin's AccessControl pattern has a subtle flaw in its role management.
    Your goal is to bypass the access control system and execute a privileged function without proper authorization.

    **Objectives**:
    - Identify the flaw in role management
    - Bypass role-based access control
    - Execute the restricted function
    - Capture the emitted event

    **Initial Setup**:
    - Contract uses AccessControl
    - ADMIN_ROLE is properly defined
    - You start with no special privileges`,
    category: "smart-contracts",
    difficulty: "hard",
    points: 450,
    template: `use stylus_sdk::prelude::*;
use stylus_sdk::storage::{StorageU256, StorageMap};

const ADMIN_ROLE: U256 = U256::from(1);
const OPERATOR_ROLE: U256 = U256::from(2);

#[component]
struct AccessControlled {
    roles: StorageMap<(U256, Address), bool>,
    initialized: StorageU256,
}

#[external]
impl AccessControlled {
    pub fn constructor(&mut self) {
        self.initialized.set(U256::zero());
    }

    // Implement the vulnerable initialization and role check
    pub fn initialize(&mut self) {
        // Add your solution here
    }

    pub fn restricted_function(&mut self) {
        // Add your solution here
    }
}`,
    solution: `pub fn initialize(&mut self) {
    self.roles.set((ADMIN_ROLE, msg::sender()), true);
    self.initialized.set(U256::from(1));
}

pub fn restricted_function(&mut self) {
    if !self.roles.get((ADMIN_ROLE, msg::sender())) {
        revert("Unauthorized");
    }
    evm::log1(&[], &[topics::admin_action()]);
}`,
    hint: "The vulnerability might be in how the contract handles its initialization state. Can you reset it?",
    timeLimit: 800,
    bonusPoints: 175,
    achievement: "Access Master"
  }
];


export const achievements = [
  {
    id: 'storage-master',
    name: 'Storage Master',
    description: 'Successfully manipulated contract storage',
    icon: '🔐'
  },
  {
    id: 'bridge-guardian',
    name: 'Bridge Guardian',
    description: 'Secured cross-chain transfers successfully',
    icon: '🌉'
  },
  {
    id: 'double-spend-hunter',
    name: 'Double Spend Hunter',
    description: 'Successfully identified and exploited a double-spend vulnerability',
    icon: '🔍'
  },
  {
    id: 'access-master',
    name: 'Access Master',
    description: 'Bypassed role-based access control through clever exploitation',
    icon: '🔐'
  }

];