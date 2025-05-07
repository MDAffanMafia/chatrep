import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Menu from './components/Menu';
import Dashboard from './components/Dashboard';
import Chatbot from './components/ChatBot';
import Login from './components/Login';
import './App.css';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [chatbotMinimized, setChatbotMinimized] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  // Check for existing login session on app load
  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (user) => {
    setUsername(user);
    setIsLoggedIn(true);
    // Store username in localStorage for session persistence
    localStorage.setItem('username', user);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    // Clear localStorage on logout
    localStorage.removeItem('username');
  };

  useEffect(() => {
    // Clear browser cache (best effort)
    const clearCache = () => {
      if ('caches' in window) {
        caches.keys().then((names) => {
          for (let name of names) {
            caches.delete(name);
          }
        });
      }
    };

    clearCache();
  }, []);

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className={darkMode ? "dark-mode" : ""}>
      <Header
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        username={username}
        onLogout={handleLogout}
      />
      {!chatbotMinimized && <div className="app-background" />}
      <div className={`main ${isSidebarOpen ? "sidebar-open" : "sidebar-collapsed"}`}>
        <Menu
          darkMode={darkMode}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <Dashboard isSidebarOpen={isSidebarOpen} />
        <Chatbot setChatbotMinimized={setChatbotMinimized} username={username} />
      </div>
      <Footer />
    </div>
  );
}

export default App;
