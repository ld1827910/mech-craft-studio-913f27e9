
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Cache busting mechanism
const appVersion = '1.0.0'; // You can update this manually or automate
console.log(`MechCraft App v${appVersion} loaded`);

// Add event listener to detect when app has fully loaded
window.addEventListener('load', () => {
  console.log('Application fully loaded');
});

createRoot(document.getElementById("root")!).render(<App />);
