export const challenges = [
  {
    id: '1',
    title: 'Stylus Smart Contract Basics',
    description: 'Deploy your first smart contract using the Stylus SDK. Learn the basics of contract initialization and state management.',
    category: 'smart-contracts',
    difficulty: 'easy',
    points: 100,
    code: `use stylus_sdk::prelude::*;

#[contract]
mod hello_stylus {
    #[state]
    struct State {
        counter: u64,
    }

    #[external]
    fn increment(&mut self) {
        self.counter += 1;
    }
}`
  },
  {
    id: '2',
    title: 'Cross-Contract Communication',
    description: 'Build an advanced contract that interacts with other contracts on the network using Stylus.',
    category: 'smart-contracts',
    difficulty: 'medium',
    points: 200,
    code: `use stylus_sdk::prelude::*;

#[contract]
mod token_bridge {
    #[state]
    struct State {
        tokens: Map<Address, u256>,
    }

    #[external]
    fn transfer(&mut self, to: Address, amount: u256) {
        // Challenge: Implement secure token transfer
    }
}`
  },
  {
    id: '3',
    title: 'Blockchain Security',
    description: 'Find and fix vulnerabilities in a Stylus smart contract. Focus on common security patterns and best practices.',
    category: 'blockchain',
    difficulty: 'hard',
    points: 300
  }
];