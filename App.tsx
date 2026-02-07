
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { UserState, LifePath, Mission, AppTab } from './types';
import { PATH_METADATA, getRank } from './constants';
import Onboarding from './components/Onboarding';
import Dashboard from './components/Dashboard';
import Leaderboard from './components/Leaderboard';
import Profile from './components/Profile';
import LevelUpOverlay from './components/LevelUpOverlay';

const INITIAL_STATE_TEMPLATE: UserState = {
  isLoggedIn: false,
  username: '',
  selectedPath: null,
  xp: 0,
  level: 1,
  dailyMissions: [],
  completedSessions: 0,
  lastMissionDate: '',
  badges: []
};

const App: React.FC = () => {
  const [user, setUser] = useState<UserState>(INITIAL_STATE_TEMPLATE);
  const [activeTab, setActiveTab] = useState<AppTab>('DASHBOARD');
  const [levelUpData, setLevelUpData] = useState<{level: number, rank: string, isRankUp: boolean} | null>(null);
  
  const clickSound = useRef(new Audio('https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3'));

  const playClick = () => {
    clickSound.current.currentTime = 0;
    clickSound.current.play().catch(() => {});
  };

  // Database persistence: Save/Load based on email
  useEffect(() => {
    if (user.isLoggedIn && user.username) {
      const allUsersRaw = localStorage.getItem('lockin_users');
      const allUsers = allUsersRaw ? JSON.parse(allUsersRaw) : {};
      allUsers[user.username] = user;
      localStorage.setItem('lockin_users', JSON.stringify(allUsers));
    }
  }, [user]);

  const generateSingleMission = useCallback((path: LifePath, existingTexts: string[]) => {
    const pool = PATH_METADATA[path].missions;
    const available = pool.filter(p => !existingTexts.includes(p.text));
    const source = available.length > 0 ? available : pool;
    const missionObj = source[Math.floor(Math.random() * source.length)];
    
    return {
      id: `mission-${Date.now()}`,
      text: missionObj.text,
      type: missionObj.type,
      completed: false,
      xp: 25
    };
  }, []);

  const generateMissions = useCallback((path: LifePath) => {
    const pool = PATH_METADATA[path].missions;
    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    const selectedMissions: Mission[] = shuffled.slice(0, 3).map((missionObj, idx) => ({
      id: `mission-${idx}-${Date.now()}`,
      text: missionObj.text,
      type: missionObj.type,
      completed: false,
      xp: 25
    }));
    return selectedMissions;
  }, []);

  const handleLogin = (email: string) => {
    playClick();
    const allUsersRaw = localStorage.getItem('lockin_users');
    const allUsers = allUsersRaw ? JSON.parse(allUsersRaw) : {};
    
    if (allUsers[email]) {
      setUser(allUsers[email]);
    } else {
      setUser({ ...INITIAL_STATE_TEMPLATE, isLoggedIn: true, username: email });
    }
  };

  const handleSelectPath = (path: LifePath) => {
    playClick();
    const today = new Date().toDateString();
    const selectedMissions = generateMissions(path);

    setUser(prev => ({
      ...prev,
      selectedPath: path,
      dailyMissions: selectedMissions,
      lastMissionDate: today
    }));
  };

  const completeMission = (missionId: string) => {
    setUser(prev => {
      const missionIndex = prev.dailyMissions.findIndex(m => m.id === missionId);
      if (missionIndex === -1 || prev.dailyMissions[missionIndex].completed) return prev;

      const updatedMissions = prev.dailyMissions.map(m => 
        m.id === missionId ? { ...m, completed: true } : m
      );
      
      const earnedXp = prev.dailyMissions[missionIndex].xp;
      const allDone = updatedMissions.every(m => m.completed);
      
      let finalMissions = updatedMissions;
      if (allDone && prev.selectedPath) {
        finalMissions = generateMissions(prev.selectedPath);
      }

      const newBadges = [...prev.badges];
      if (allDone && !newBadges.includes('DISCIPLINED')) {
        newBadges.push('DISCIPLINED');
      }

      const totalXp = prev.xp + earnedXp;
      const newLevel = Math.floor(totalXp / 100) + 1;
      
      if (newLevel > prev.level) {
        const oldRank = getRank(prev.level);
        const newRank = getRank(newLevel);
        setLevelUpData({
          level: newLevel,
          rank: newRank,
          isRankUp: newRank !== oldRank
        });
      }

      return {
        ...prev,
        dailyMissions: finalMissions,
        xp: totalXp,
        level: newLevel,
        badges: newBadges
      };
    });
  };

  const skipMission = (missionId: string) => {
    playClick();
    if (!user.selectedPath) return;
    const existingTexts = user.dailyMissions.map(m => m.text);
    const newMission = generateSingleMission(user.selectedPath, existingTexts);
    
    setUser(prev => ({
      ...prev,
      dailyMissions: prev.dailyMissions.map(m => m.id === missionId ? newMission : m)
    }));
  };

  if (!user.isLoggedIn || !user.selectedPath) {
    return (
      <Onboarding 
        onLogin={handleLogin} 
        onSelectPath={handleSelectPath} 
        isLoggedIn={user.isLoggedIn}
      />
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'LEADERBOARD':
        return <Leaderboard user={user} />;
      case 'PROFILE':
        return <Profile user={user} onLogout={() => {
          playClick();
          setUser(INITIAL_STATE_TEMPLATE);
          window.location.reload();
        }} />;
      default:
        return <Dashboard 
          user={user} 
          onCompleteMission={completeMission}
          onSkipMission={skipMission}
        />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {levelUpData && (
        <LevelUpOverlay 
          level={levelUpData.level} 
          rank={levelUpData.rank} 
          isRankUp={levelUpData.isRankUp} 
          onClose={() => setLevelUpData(null)} 
        />
      )}

      <main className="flex-1 overflow-y-auto">
        {renderContent()}
      </main>

      <nav className="fixed bottom-0 left-0 w-full bg-black/90 backdrop-blur-md border-t border-zinc-900 px-6 py-4 z-30">
        <div className="max-w-md mx-auto flex justify-around items-center">
          <button 
            onClick={() => { playClick(); setActiveTab('LEADERBOARD'); }}
            className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'LEADERBOARD' ? 'text-white' : 'text-zinc-600 hover:text-zinc-400'}`}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M16 11V3H8v8H2v10h20V11h-6zM10 5h4v14h-4V5zm-6 8h4v6H4v-6zm16 6h-4v-6h4v6z"/></svg>
            <span className="text-[8px] font-black tracking-widest uppercase">Global</span>
          </button>
          
          <button 
            onClick={() => { playClick(); setActiveTab('DASHBOARD'); }}
            className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'DASHBOARD' ? 'text-white' : 'text-zinc-600 hover:text-zinc-400'}`}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
            <span className="text-[8px] font-black tracking-widest uppercase">Home</span>
          </button>

          <button 
            onClick={() => { playClick(); setActiveTab('PROFILE'); }}
            className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'PROFILE' ? 'text-white' : 'text-zinc-600 hover:text-zinc-400'}`}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>
            <span className="text-[8px] font-black tracking-widest uppercase">Profile</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default App;
