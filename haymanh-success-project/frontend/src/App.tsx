import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import GlobalStyle from './styles/GlobalStyle';
// import { themes } from './styles/theme';
import { AuthProvider } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { SettingsProvider } from './contexts/SettingsContext';
import { ResponsiveDesign } from './components/ResponsiveDesign';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Programs from './pages/Programs';
import Opportunities from './pages/Opportunities';
import Contact from './pages/Contact';
import News from './pages/News';
import Blog from './pages/Blog';
import Dashboard from './pages/Dashboard';
import Community from './pages/Community';
import OpportunitySelector from './pages/OpportunitySelector';


const AppContent: React.FC = () => {
  const { currentTheme } = useTheme();

  return (
    <StyledThemeProvider theme={currentTheme}>
      <GlobalStyle />
      <ResponsiveDesign>
        <SettingsProvider>
          <LanguageProvider>
            <AuthProvider>
              <Router>
                <Header />
                <main>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/programs" element={<Programs />} />
                    <Route path="/opportunities" element={<Opportunities />} />
                    <Route path="/news" element={<News />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/opportunity-selector" element={<OpportunitySelector />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/community" element={<Community />} />
                  </Routes>
                </main>
                <Footer />
              </Router>
            </AuthProvider>
          </LanguageProvider>
        </SettingsProvider>
      </ResponsiveDesign>
    </StyledThemeProvider>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
