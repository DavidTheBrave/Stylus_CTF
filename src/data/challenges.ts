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
  }
];


export const achievements = [
  {
    id: 'storage-master',
    name: 'Storage Master',
    description: 'Successfully manipulated contract storage',
    icon: '🔐'
  }
];