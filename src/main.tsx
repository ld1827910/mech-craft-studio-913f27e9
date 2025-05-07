
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Enhanced Cache busting mechanism - updated version
const appVersion = '1.0.4'; // Incrementing version number
const timestamp = new Date().getTime(); // Add timestamp for unique loading each time
console.log(`MechCraft App v${appVersion} loaded (build: ${timestamp})`);

// Error handling for initialization
try {
  // Force reload if app version has changed
  const storedVersion = localStorage.getItem('app_version');
  if (storedVersion && storedVersion !== appVersion) {
    console.log(`New version detected: ${appVersion} (old: ${storedVersion}). Forcing refresh.`);
    localStorage.setItem('app_version', appVersion);
    window.location.reload();
  } else if (!storedVersion) {
    localStorage.setItem('app_version', appVersion);
  }

  // Also force reload if app is more than 24 hours old
  const lastLoaded = localStorage.getItem('app_last_loaded');
  const currentTime = new Date().getTime();
  if (lastLoaded) {
    const diff = currentTime - parseInt(lastLoaded);
    const dayInMs = 24 * 60 * 60 * 1000;
    if (diff > dayInMs) {
      console.log('Cache expired, forcing refresh');
      localStorage.setItem('app_last_loaded', currentTime.toString());
      window.location.reload();
    }
  } else {
    localStorage.setItem('app_last_loaded', currentTime.toString());
  }

  // Create root and render app
  const rootElement = document.getElementById("root");
  if (!rootElement) {
    throw new Error("Root element not found");
  }
  createRoot(rootElement).render(<App />);

  // Add event listener to detect when app has fully loaded
  window.addEventListener('load', () => {
    console.log('Application fully loaded');
  });
} catch (error) {
  console.error('Failed to initialize application:', error);
  // Display a user-friendly error
  const rootElement = document.getElementById("root");
  if (rootElement) {
    rootElement.innerHTML = `
      <div style="padding: 20px; text-align: center; font-family: sans-serif;">
        <h2>Application Error</h2>
        <p>Sorry, there was a problem starting the application. Please try refreshing the page.</p>
        <pre style="background: #f5f5f5; padding: 10px; text-align: left; overflow: auto;">${error}</pre>
      </div>
    `;
  }
}
