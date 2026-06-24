import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ShareAltOutlined,
  CopyOutlined,
  LogoutOutlined,
  StepBackwardOutlined,
  StepForwardOutlined,
  RetweetOutlined,
  SendOutlined,
  UsergroupAddOutlined,
  MoonOutlined,
  PauseOutlined,
  CaretRightOutlined,
  SyncOutlined
} from "@ant-design/icons";

const MusicRoom = () => {
  const navigate = useNavigate();
  const { roomId } = useParams();
  const actualRoomId = roomId || "402938";

  const [isPlaying, setIsPlaying] = useState(true);
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: "Sarah Bass",
      time: "10:42 PM",
      text: "This drop is insane! Everyone synced? 🎧",
      color: "text-cyan-400"
    },
    {
      id: 2,
      sender: "Marcus J.",
      time: "10:43 PM",
      text: "Yep, perfect sync here in London.",
      color: "text-purple-400"
    },
    {
      id: 3,
      sender: "DJ Ghost",
      time: "10:45 PM",
      text: "Next track is coming up in 30 seconds...",
      color: "text-indigo-400"
    }
  ]);
  const [inputText, setInputText] = useState("");
  const chatContainerRef = useRef(null);

  // Auto-scroll chat to bottom locally
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const now = new Date();
    const formattedTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newMessage = {
      id: chatMessages.length + 1,
      sender: "Maverick (You)",
      time: formattedTime,
      text: inputText,
      color: "text-emerald-400"
    };

    setChatMessages([...chatMessages, newMessage]);
    setInputText("");
  };

  const handleCopyId = () => {
    navigator.clipboard.writeText(actualRoomId);
    alert(`Copied Room ID: ${actualRoomId} to clipboard!`);
  };

  return (
    <div className="min-h-screen bg-[#08090d] text-white flex flex-col font-sans relative overflow-x-hidden">
      {/* Glow Effects */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-purple-500/5 blur-[120px] pointer-events-none" />

      {/* NAVBAR */}
      <header className="border-b border-white/5 bg-[#090b10]/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/dashboard")}>
            <img
              src="/Music Sync Icon.png"
              alt="Music Sync Logo"
              className="w-7 h-7 object-contain"
            />
            <span className="font-extrabold text-lg tracking-wider">Music Sync</span>
          </div>

          {/* Nav links */}
          <nav className="flex items-center gap-8">
            <a href="#" onClick={() => navigate("/dashboard")} className="text-white text-sm font-semibold relative py-2">
              Dashboard
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#4c63f6] rounded-full shadow-[0_0_8px_#4c63f6]"></span>
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-sm font-semibold transition-colors">
              About
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-6">
            <button className="text-gray-400 hover:text-white transition-colors cursor-pointer">
              <MoonOutlined className="text-lg" />
            </button>
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-emerald-500/25 bg-emerald-500/10 text-emerald-400 text-xs font-semibold tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              LIVE
            </span>
            <a href="#" className="text-gray-300 hover:text-white text-sm font-semibold transition-colors">
              PROFILE
            </a>
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-8 flex flex-col justify-start">
        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">
          
          {/* LEFT SIDE: MUSIC PLAYER (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            {/* Header Row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-3xl font-extrabold text-white tracking-tight">
                    Room #{actualRoomId}
                  </h1>
                  <button className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                    <ShareAltOutlined className="text-lg" />
                  </button>
                </div>
                <p className="text-gray-400 text-xs mt-1.5 font-medium">
                  Created by Alex syncs • 12 listeners active
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <button
                  onClick={handleCopyId}
                  className="bg-[#1c1f2e] hover:bg-[#262b3f] text-white border border-[#2a2f45] rounded-xl px-4 py-2.5 text-xs font-bold flex items-center gap-2 transition-all cursor-pointer uppercase tracking-wider"
                >
                  <CopyOutlined className="text-sm" />
                  Copy ID
                </button>
                <button
                  onClick={() => navigate("/dashboard")}
                  className="bg-[#8f1d1d] hover:bg-[#a82525] text-white rounded-xl px-4 py-2.5 text-xs font-bold flex items-center gap-2 transition-all cursor-pointer uppercase tracking-wider"
                >
                  <LogoutOutlined className="text-sm" />
                  Leave Room
                </button>
              </div>
            </div>

            {/* PLAYER CARD */}
            <div className="bg-[#131520] border border-white/5 rounded-3xl p-8 flex flex-col items-center justify-center shadow-2xl mt-8 relative overflow-hidden group">
              {/* Subtle visualizer graphics in background */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#4c63f6]/0 to-[#4c63f6]/2 rounded-3xl pointer-events-none" />

              {/* Smartphone Mockup */}
              <div className="w-56 h-80 flex items-center justify-center select-none">
                <img
                  src="/phone_wallpaper.png"
                  alt="Phone Wallpaper Cover Art"
                  className="w-full h-full object-contain transition-transform duration-500 hover:scale-105"
                />
              </div>

              {/* Track Title */}
              <h2 className="text-2xl font-bold mt-6 text-center text-white">
                Midnight City Dreams
              </h2>
              <p className="text-gray-400 text-xs text-center mt-1">
                Synthwave Collective • Vol. 4
              </p>

              {/* Progress Slider */}
              <div className="flex items-center gap-4 w-full max-w-lg mt-8">
                <span className="text-[10px] text-gray-500 font-mono">02:14</span>
                <div className="flex-1 h-1.5 bg-white/10 rounded-full relative overflow-hidden">
                  <div className="absolute top-0 left-0 h-full bg-[#8c94fc] rounded-full shadow-[0_0_8px_#8c94fc]" style={{ width: "45.8%" }}></div>
                </div>
                <span className="text-[10px] text-gray-500 font-mono">04:52</span>
              </div>

              {/* Controls Row */}
              <div className="flex items-center justify-center gap-8 w-full max-w-sm mt-8">
                <button className="text-gray-500 hover:text-white transition-colors cursor-pointer">
                  <SyncOutlined className="text-base" />
                </button>
                <button className="text-white hover:text-[#8c94fc] transition-colors cursor-pointer">
                  <StepBackwardOutlined className="text-xl" />
                </button>

                {/* PLAY / PAUSE BUTTON */}
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-14 h-14 bg-gradient-to-tr from-indigo-600 to-[#4c63f6] rounded-full flex items-center justify-center text-white shadow-[0_0_20px_rgba(76,99,246,0.4)] cursor-pointer hover:scale-105 transition-all"
                >
                  {isPlaying ? (
                    <PauseOutlined className="text-xl font-bold" />
                  ) : (
                    <CaretRightOutlined className="text-2xl ml-0.5 font-bold" />
                  )}
                </button>

                <button className="text-white hover:text-[#8c94fc] transition-colors cursor-pointer">
                  <StepForwardOutlined className="text-xl" />
                </button>
                <button className="text-gray-500 hover:text-white transition-colors cursor-pointer">
                  <RetweetOutlined className="text-base" />
                </button>
              </div>

              {/* Animated Sound Waves at the Bottom */}
              <div className="flex items-end justify-center gap-1.5 h-12 w-full mt-8 opacity-80">
                <span className={`w-1 bg-[#8c94fc]/40 rounded-full ${isPlaying ? "animate-visualizer-1" : ""}`} style={{ height: "40%" }}></span>
                <span className={`w-1 bg-[#8c94fc]/60 rounded-full ${isPlaying ? "animate-visualizer-2" : ""}`} style={{ height: "20%" }}></span>
                <span className={`w-1 bg-[#8c94fc]/80 rounded-full ${isPlaying ? "animate-visualizer-3" : ""}`} style={{ height: "70%" }}></span>
                <span className={`w-1 bg-cyan-400 rounded-full ${isPlaying ? "animate-visualizer-4" : ""}`} style={{ height: "35%" }}></span>
                <span className={`w-1 bg-[#8c94fc]/80 rounded-full ${isPlaying ? "animate-visualizer-5" : ""}`} style={{ height: "55%" }}></span>
                <span className={`w-1 bg-[#8c94fc]/60 rounded-full ${isPlaying ? "animate-visualizer-2" : ""}`} style={{ height: "25%" }}></span>
                <span className={`w-1 bg-[#8c94fc]/40 rounded-full ${isPlaying ? "animate-visualizer-1" : ""}`} style={{ height: "45%" }}></span>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: SIDEBAR (3 Cols) */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            {/* Members Card */}
            <div className="bg-[#131520] border border-white/5 rounded-3xl p-6 shadow-xl relative overflow-hidden">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-indigo-500/10 text-indigo-400 p-2.5 rounded-xl text-lg flex items-center justify-center border border-indigo-500/10">
                  <UsergroupAddOutlined />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white">Members Online</h3>
                  <p className="text-gray-500 text-[10px] mt-0.5 font-medium">8 Active Listeners</p>
                </div>
              </div>

              {/* Avatar Stack */}
              <div className="flex items-center gap-1 mt-4">
                <div className="w-8 h-8 rounded-full bg-cyan-500 border border-[#131520] flex items-center justify-center text-xs font-bold text-[#0d0e15] shadow-md z-30">
                  SB
                </div>
                <div className="w-8 h-8 rounded-full bg-purple-500 border border-[#131520] flex items-center justify-center text-xs font-bold text-white shadow-md -ml-2 z-20">
                  MJ
                </div>
                <div className="w-8 h-8 rounded-full bg-indigo-500 border border-[#131520] flex items-center justify-center text-xs font-bold text-white shadow-md -ml-2 z-10">
                  DG
                </div>
                <div className="w-8 h-8 rounded-full bg-[#1c1f2e] border border-[#131520] flex items-center justify-center text-[10px] font-bold text-gray-400 shadow-md -ml-2 z-0">
                  +5
                </div>
              </div>

              <button className="w-full mt-6 py-2.5 border border-white/10 hover:border-white/20 hover:bg-white/5 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-colors cursor-pointer">
                Invite Friends
              </button>
            </div>

            {/* Live Chat Card */}
            <div className="bg-[#131520] border border-white/5 rounded-3xl p-6 shadow-xl flex flex-col justify-between h-[420px] relative">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                <span className="text-[10px] text-cyan-400 font-extrabold tracking-wider uppercase">Live Chat</span>
              </div>

              {/* Chat Stream */}
              <div ref={chatContainerRef} className="flex-1 overflow-y-auto space-y-4 pr-1 mb-4">
                {chatMessages.map((msg) => (
                  <div key={msg.id} className="text-xs">
                    <div className="flex justify-between items-center px-1">
                      <span className={`font-bold ${msg.color}`}>{msg.sender}</span>
                      <span className="text-[9px] text-gray-500">{msg.time}</span>
                    </div>
                    <div className="bg-[#090b10] border border-white/5 rounded-2xl rounded-tl-none p-3 text-xs text-gray-200 mt-1 max-w-[90%] break-words">
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* Chat Form */}
              <form onSubmit={handleSendMessage} className="relative mt-auto">
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="w-full bg-[#090b10] border border-white/5 hover:border-white/10 focus:border-[#4c63f6] focus:outline-none rounded-full pl-5 pr-12 py-3 text-xs text-white placeholder-gray-500 transition-colors"
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1 w-8 h-8 bg-[#4c63f6] hover:bg-[#3b51e2] text-white rounded-full flex items-center justify-center transition-all cursor-pointer shadow-md shadow-indigo-600/10"
                >
                  <SendOutlined className="text-xs" />
                </button>
              </form>
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

export default MusicRoom;
