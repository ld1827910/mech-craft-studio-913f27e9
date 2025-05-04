
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Enhanced Cache busting mechanism
const appVersion = '1.0.1'; // Incrementing version number
const timestamp = new Date().getTime(); // Add timestamp for unique loading each time
console.log(`MechCraft App v${appVersion} loaded (build: ${timestamp})`);

// Force reload if app is more than 24 hours old
const lastLoaded = localStorage.getItem('app_last_loaded');
const currentTime = new Date().getTime();
if (lastLoaded) {
  const diff = currentTime - parseInt(lastLoaded);
  const dayInMs = 24 * 60 * 60 * 1000;
  if (diff > dayInMs) {
    console.log('Cache expired, forcing refresh');
    localStorage.setItem('app_last_loaded', currentTime.toString());
    window.location.reload(true);
  }
} else {
  localStorage.setItem('app_last_loaded', currentTime.toString());
}

// Add event listener to detect when app has fully loaded
window.addEventListener('load', () => {
  console.log('Application fully loaded');
});

createRoot(document.getElementById("root")!).render(<App />);
