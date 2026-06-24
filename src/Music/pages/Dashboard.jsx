import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { UserButton, useClerk, useUser } from "@clerk/clerk-react";
import {
  PlusOutlined,
  UsergroupAddOutlined,
  MoonOutlined,
  ShareAltOutlined,
  CustomerServiceOutlined,
  ArrowRightOutlined
} from "@ant-design/icons";

const MusicDashboard = () => {
  const navigate = useNavigate();
  const { signOut } = useClerk();
  const { user } = useUser();
  const [digits, setDigits] = useState(["", "", "", "", "", ""]);
  const inputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null)
  ];

  const handleDigitChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newDigits = [...digits];
    newDigits[index] = value;
    setDigits(newDigits);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  const handleJoinSession = () => {
    const code = digits.join("");
    if (code.length === 6) {
      navigate(`/room/${code}`);
    } else {
      navigate("/room/402938"); // default if empty
    }
  };

  const handleCreateRoom = () => {
    navigate("/room/402938");
  };

  const handleLogout = () => {
    signOut({ redirectUrl: "/" });
  };

  const displayName =
    user?.firstName ||
    user?.username ||
    user?.primaryEmailAddress?.emailAddress ||
    "Creator";

  return (
    <div className="min-h-screen bg-[#08090d] text-white flex flex-col font-sans relative overflow-x-hidden">
      {/* Glow Effects */}
      <div className="absolute top-[-30%] right-[-10%] w-[70%] h-[70%] rounded-full bg-indigo-500/5 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-30%] left-[-10%] w-[70%] h-[70%] rounded-full bg-purple-500/5 blur-[150px] pointer-events-none" />

      {/* NAVBAR */}
      <header className="border-b border-white/5 bg-[#090b10]/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
            <img
              src="/Music Sync Icon.png"
              alt="Music Sync Logo"
              className="w-7 h-7 object-contain"
            />
            <span className="font-extrabold text-lg tracking-wider bg-clip-text bg-gradient-to-r from-white to-gray-300">
              Music Sync
            </span>
          </div>

          {/* Nav links */}
          <nav className="flex items-center gap-8">
            <a href="#" className="text-white text-sm font-semibold relative py-2">
              Dashboard
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#4c63f6] rounded-full shadow-[0_0_8px_#4c63f6]"></span>
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-sm font-semibold transition-colors">
              About
            </a>
          </nav>

          {/* User actions */}
          <div className="flex items-center gap-6">
            <button className="text-gray-400 hover:text-white transition-colors cursor-pointer">
              <MoonOutlined className="text-lg" />
            </button>
            <a href="#" className="text-gray-300 hover:text-white text-sm font-semibold transition-colors hidden sm:block">
              {displayName}
            </a>
            <UserButton afterSignOutUrl="/" />
            <button
              onClick={handleLogout}
              className="bg-[#c0c6fc] hover:bg-[#abb3fb] text-[#0d0e15] font-bold px-5 py-2 rounded-full text-xs transition uppercase tracking-wider shadow-md shadow-indigo-500/5 cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-12 md:py-16 flex flex-col justify-start">
        {/* Welcome Section */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-3 text-white leading-tight">
            Welcome back, {displayName}.
          </h1>
          <p className="text-gray-400 text-sm md:text-base max-w-2xl leading-relaxed">
            Sync your rhythm with friends. Create a private session or join an existing room to experience music together in real-time.
          </p>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Create Room Card */}
          <div className="bg-[#131520] border border-white/5 rounded-3xl p-8 md:p-10 flex flex-col items-center text-center justify-between min-h-[380px] shadow-xl hover:border-white/10 transition-all duration-300 relative group">
            <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/0 to-indigo-500/2 rounded-3xl pointer-events-none transition-all group-hover:to-indigo-500/5" />
            
            <div className="flex flex-col items-center">
              {/* Circle Icon */}
              <div className="w-16 h-16 rounded-full flex items-center justify-center bg-gradient-to-tr from-indigo-600 to-[#4c63f6] text-white shadow-[0_0_30px_rgba(76,99,246,0.3)] group-hover:scale-105 transition-all duration-300 mb-6">
                <PlusOutlined className="text-xl font-bold" />
              </div>

              <h2 className="text-2xl font-bold mb-3 text-white">Start Fresh</h2>
              <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                Initiate a new sync room. You'll be the host and can control the playback for everyone.
              </p>
            </div>

            <button
              onClick={handleCreateRoom}
              className="w-full py-4 bg-[#b4bcfe] hover:bg-[#a1abfe] text-[#0d0e15] font-bold rounded-2xl transition-all shadow-lg hover:shadow-indigo-500/10 text-sm tracking-wider uppercase cursor-pointer"
            >
              Create Room
            </button>
          </div>

          {/* Join Session Card */}
          <div className="bg-[#131520] border border-white/5 rounded-3xl p-8 md:p-10 flex flex-col items-center text-center justify-between min-h-[380px] shadow-xl hover:border-white/10 transition-all duration-300 relative group">
            <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/0 to-cyan-500/2 rounded-3xl pointer-events-none transition-all group-hover:to-cyan-500/5" />
            
            <div className="flex flex-col items-center w-full">
              {/* Circle Icon */}
              <div className="w-16 h-16 rounded-full flex items-center justify-center bg-gradient-to-tr from-cyan-500 to-cyan-400 text-[#0d0e15] shadow-[0_0_30px_rgba(6,182,212,0.3)] group-hover:scale-105 transition-all duration-300 mb-6">
                <UsergroupAddOutlined className="text-xl" />
              </div>

              <h2 className="text-2xl font-bold mb-3 text-white">Join Friends</h2>
              <p className="text-gray-400 text-sm leading-relaxed max-w-xs mb-6">
                Enter a 6-digit code provided by a host to jump straight into their live session.
              </p>

              {/* Digit Inputs Row */}
              <div className="flex justify-center gap-2 mb-8 bg-[#090b10] border border-white/5 rounded-2xl px-5 py-4 w-full max-w-xs">
                {digits.map((digit, index) => (
                  <input
                    key={index}
                    ref={inputRefs[index]}
                    type="text"
                    maxLength={1}
                    value={digit}
                    placeholder="0"
                    onChange={(e) => handleDigitChange(e.target.value, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className="w-8 h-10 bg-transparent text-center text-lg font-bold text-cyan-400 placeholder-cyan-500/30 focus:outline-none focus:border-b-2 focus:border-cyan-400"
                  />
                ))}
              </div>
            </div>

            <button
              onClick={handleJoinSession}
              className="w-full py-4 border border-cyan-400/40 hover:bg-cyan-500/5 text-cyan-400 font-bold rounded-2xl transition-all shadow-[0_0_20px_rgba(6,182,212,0.05)] hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] text-sm tracking-wider uppercase cursor-pointer"
            >
              Join Session
            </button>
          </div>
        </div>

        {/* Recent Rooms Section */}
        <div className="border-t border-white/5 pt-10">
          <div className="flex justify-between items-end mb-6">
            <div>
              <h2 className="text-xl font-bold text-white">Recent Rooms</h2>
              <p className="text-gray-500 text-xs mt-1">Jump back into your frequent sync spots.</p>
            </div>
            <a href="#" className="text-xs font-semibold text-gray-400 hover:text-white transition-colors">
              View All History
            </a>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div
              onClick={() => navigate("/room/882012")}
              className="bg-[#131520] hover:bg-[#1a1c2a] border border-white/5 hover:border-white/10 rounded-2xl p-5 flex items-center justify-between cursor-pointer transition-all duration-300 group"
            >
              <div className="flex items-center">
                <div className="bg-indigo-500/5 text-indigo-400 p-3.5 rounded-xl text-lg flex items-center justify-center mr-4 border border-indigo-500/10">
                  <CustomerServiceOutlined />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white group-hover:text-indigo-400 transition-colors">
                    Late Night Lo-fi
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">Room #882012 • 4 Members</p>
                </div>
              </div>
              <ShareAltOutlined className="text-gray-500 hover:text-white transition-colors text-sm" />
            </div>

            {/* Card 2 */}
            <div
              onClick={() => navigate("/room/441903")}
              className="bg-[#131520] hover:bg-[#1a1c2a] border border-white/5 hover:border-white/10 rounded-2xl p-5 flex items-center justify-between cursor-pointer transition-all duration-300 group"
            >
              <div className="flex items-center">
                <div className="bg-purple-500/5 text-purple-400 p-3.5 rounded-xl text-lg flex items-center justify-center mr-4 border border-purple-500/10">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white group-hover:text-purple-400 transition-colors">
                    Tech Talk Weekly
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">Room #441903 • 12 Members</p>
                </div>
              </div>
              <ShareAltOutlined className="text-gray-500 hover:text-white transition-colors text-sm" />
            </div>

            {/* Card 3 (Dotted) */}
            <div className="border border-dashed border-white/10 rounded-2xl p-5 flex items-center justify-center bg-transparent min-h-[72px]">
              <span className="text-gray-500 text-xs italic">No more recent activity</span>
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-white/5 bg-[#090b10] py-6 mt-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500 gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-gray-400">Music Sync</span>
            <span>© 2024 Music Sync. All rights reserved.</span>
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gray-300 transition-colors">Terms</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Privacy</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MusicDashboard;
