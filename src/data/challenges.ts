import { Challenge } from '../types';

export const challenges: Challenge[] = [
  // Basic Challenges
  {
    id: '1',
    title: 'Neon Genesis: Basic Shape Rendering',
    description: 'Create your first Stylus component that renders a neon-colored rectangle. Welcome to the basics of the digital frontier.',
    category: 'smart-contracts',
    difficulty: 'easy',
    points: 100,
    template: `use stylus_sdk::prelude::*;

#[component]
struct NeonShape {
    width: u32,
    height: u32,
    color: String,
}

impl NeonShape {
    // TODO: Implement the render method
    // Requirements:
    // - Create a rectangle with the given dimensions
    // - Apply the neon color effect
    // ENCRYPTED_MESSAGE: "Shape is the foundation of all reality"
}`,
    solution: 'style="width: {self.width}px; height: {self.height}px; background: {self.color}; box-shadow: 0 0 10px {self.color};"',
    hint: 'Use CSS properties to define the shape and add a glow effect',
    timeLimit: 300,
    bonusPoints: 50,
    achievement: 'Shape Shifter'
  },
  {
    id: '2',
    title: 'Reactive Pulse: Dynamic Properties',
    description: 'Create a shape that responds to user input, changing its properties in real-time. Master the art of reactive programming.',
    category: 'directives',
    difficulty: 'easy',
    points: 150,
    template: `use stylus_sdk::prelude::*;

#[component]
struct PulsingShape {
    #[state]
    size: u32,
    #[state]
    color: String,
}

impl PulsingShape {
    // TODO: Implement size and color changes based on user input
    // Requirements:
    // - Add event listeners for mouse movements
    // - Update size and color reactively
    // ENCRYPTED_MESSAGE: "Reality bends to the will of the observer"
}`,
    solution: '@on_mousemove="update_properties"',
    hint: 'Use event directives to capture user interactions',
    timeLimit: 400,
    bonusPoints: 75,
    achievement: 'Reality Bender'
  },
  // Intermediate Challenges
  {
    id: '3',
    title: 'Quantum Router: Navigation System',
    description: 'Build a secure routing system for our digital realm. Create paths between different virtual dimensions.',
    category: 'routing',
    difficulty: 'medium',
    points: 250,
    template: `use stylus_sdk::prelude::*;

#[router]
struct QuantumRouter {
    routes: Vec<Route>,
    current_path: String,
}

impl QuantumRouter {
    // TODO: Implement quantum routing logic
    // Requirements:
    // - Define route patterns
    // - Handle path parameters
    // - Manage navigation history
    // ENCRYPTED_MESSAGE: "All paths exist simultaneously"
}`,
    solution: 'self.routes.push(Route::new("/quantum/:id", handler))',
    hint: 'Think about pattern matching and parameter extraction',
    timeLimit: 600,
    bonusPoints: 100,
    achievement: 'Path Weaver'
  },
  {
    id: '4',
    title: 'Neural Network: Component Lifecycle',
    description: 'Master the lifecycle of Stylus components. Understand the flow of data through the neural network.',
    category: 'state-management',
    difficulty: 'medium',
    points: 300,
    template: `use stylus_sdk::prelude::*;

#[component]
struct NeuralComponent {
    #[state]
    data: Vec<Signal>,
    #[effect]
    lifecycle: Lifecycle,
}

impl NeuralComponent {
    // TODO: Implement lifecycle methods
    // Requirements:
    // - Handle component mounting
    // - Manage state updates
    // - Clean up resources
    // ENCRYPTED_MESSAGE: "Life flows in cycles"
}`,
    solution: '#[on_mount] fn initialize(&self)',
    hint: 'Consider the component\'s birth, life, and death cycle',
    timeLimit: 700,
    bonusPoints: 125,
    achievement: 'Life Weaver'
  },
  // Advanced Challenges
  {
    id: '5',
    title: 'Cyber Architect: Build System Integration',
    description: 'Configure an advanced build system for a large-scale Stylus application. Optimize for the digital age.',
    category: 'performance',
    difficulty: 'hard',
    points: 400,
    template: `// webpack.config.js
module.exports = {
  // TODO: Configure Webpack for Stylus
  // Requirements:
  // - Set up loaders for Stylus files
  // - Configure optimization plugins
  // - Enable hot module replacement
  // ENCRYPTED_MESSAGE: "Efficiency is the key to power"
}`,
    solution: 'use: ["style-loader", "stylus-loader"]',
    hint: 'Think about asset processing and bundle optimization',
    timeLimit: 900,
    bonusPoints: 150,
    achievement: 'Master Builder'
  },
  {
    id: '6',
    title: 'Digital Nexus: Full-Stack Integration',
    description: 'Connect your Stylus frontend to a Node.js backend. Bridge the gap between different digital realms.',
    category: 'security',
    difficulty: 'hard',
    points: 500,
    template: `// server.js
const express = require('express');
const app = express();

// TODO: Implement secure API endpoints
// Requirements:
// - Set up REST endpoints
// - Implement authentication
// - Handle CORS and security
// ENCRYPTED_MESSAGE: "Unity is strength"`,
    solution: 'app.use(cors({ origin: process.env.FRONTEND_URL }))',
    hint: 'Focus on secure communication between frontend and backend',
    timeLimit: 1200,
    bonusPoints: 200,
    achievement: 'Unity Forger'
  }
];

export const achievements = [
  {
    id: 'shape-shifter',
    name: 'Shape Shifter',
    description: 'Master basic shape rendering',
    icon: '🔷'
  },
  {
    id: 'reality-bender',
    name: 'Reality Bender',
    description: 'Control dynamic properties',
    icon: '🌀'
  },
  {
    id: 'path-weaver',
    name: 'Path Weaver',
    description: 'Master quantum routing',
    icon: '🌐'
  },
  {
    id: 'life-weaver',
    name: 'Life Weaver',
    description: 'Master component lifecycle',
    icon: '🧬'
  },
  {
    id: 'master-builder',
    name: 'Master Builder',
    description: 'Configure advanced build systems',
    icon: '⚡'
  },
  {
    id: 'unity-forger',
    name: 'Unity Forger',
    description: 'Connect frontend and backend realms',
    icon: '🔗'
  }
];