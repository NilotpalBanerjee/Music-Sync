import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { SignIn, SignUp, SignedIn, SignedOut } from "@clerk/clerk-react";
import { LoginOutlined, UserAddOutlined } from "@ant-design/icons";

const MusicLogin = () => {
  const [authMode, setAuthMode] = useState("login");

  const clerkAppearance = {
    variables: {
      colorPrimary: "#4c63f6",
      colorBackground: "#13151f",
      colorText: "#ffffff",
      colorTextSecondary: "#9ca3af",
      colorInputBackground: "#090a0f",
      colorInputText: "#ffffff",
      borderRadius: "0.75rem",
    },
    elements: {
      rootBox: "w-full",
      cardBox: "w-full shadow-none",
      card: "w-full bg-transparent shadow-none border-0",
      headerTitle: "hidden",
      headerSubtitle: "hidden",
      socialButtonsBlockButton:
        "bg-[#13151f] border border-white/10 text-white hover:bg-[#1a1d2b]",
      formButtonPrimary:
        "bg-[#4c63f6] hover:bg-[#3b51e2] text-white font-bold uppercase tracking-wider",
      footerActionText: "text-gray-400",
      footerActionLink: "text-cyan-400 hover:text-cyan-300",
    },
  };

  return (
    <>
      <SignedIn>
        <Navigate to="/dashboard" replace />
      </SignedIn>

      <SignedOut>
        <div className="min-h-screen flex flex-col md:flex-row bg-[#08080c] text-white">
          <div className="flex-1 flex flex-col justify-between p-8 md:p-16 bg-gradient-to-tr from-[#130321] via-[#090b16] to-[#0e163b] relative overflow-hidden border-b md:border-b-0 md:border-r border-white/5">
            <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] rounded-full bg-indigo-500/10 blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-20%] right-[-20%] w-[80%] h-[80%] rounded-full bg-purple-500/10 blur-[120px] pointer-events-none" />

            <div className="hidden md:block" />

            <div className="flex flex-col items-center text-center max-w-lg mx-auto py-12 md:py-0">
              <div className="relative group mb-8 flex flex-col items-center">
                <div className="absolute inset-0 bg-indigo-500/30 rounded-2xl blur-xl group-hover:bg-indigo-500/50 transition duration-500" />
                <div className="relative bg-[#161828]/80 border border-white/10 p-4 rounded-2xl shadow-xl flex flex-col items-center w-28 h-28 justify-center">
                  <img
                    src="/Music Sync Icon.png"
                    alt="Music Sync Logo"
                    className="w-12 h-12 object-contain"
                  />
                  <span className="text-[10px] font-extrabold tracking-[0.15em] text-white mt-2">
                    MUSIC SYNC
                  </span>
                  <span className="text-[6px] tracking-wider text-indigo-400 uppercase font-semibold">
                    SINCE 2024
                  </span>
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.15] mb-6 font-sans">
                Sync the Pulse.
                <br />
                Join the{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400 drop-shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                  Studio
                </span>
                .
              </h1>

              <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-8">
                Experience seamless real-time music collaboration. Connect with
                creators worldwide in our digital studio environment built for
                low-latency harmony.
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/20 bg-cyan-500/5 text-cyan-400 text-xs font-semibold tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  LIVE SYNC
                </span>
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/20 bg-purple-500/5 text-purple-400 text-xs font-semibold tracking-wider">
                  12K LISTENING
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center border-t border-white/5 pt-6 text-xs text-gray-500 gap-4 mt-8 md:mt-0">
              <p>Copyright 2024 Music Sync. All rights reserved.</p>
              <div className="flex gap-4">
                <a href="#" className="hover:text-gray-300 transition">
                  Privacy
                </a>
                <a href="#" className="hover:text-gray-300 transition">
                  Terms
                </a>
              </div>
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-center items-center p-8 md:p-16 bg-[#090a0f] relative">
            <div className="absolute top-[20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-500/5 blur-[100px] pointer-events-none" />

            <div className="w-full max-w-md flex flex-col">
              <div className="self-end mb-12 bg-[#13151f] p-1 rounded-xl border border-white/5 flex w-fit">
                <button
                  type="button"
                  onClick={() => setAuthMode("login")}
                  className={`px-5 py-2 rounded-lg text-xs font-bold tracking-wider transition-all uppercase inline-flex items-center gap-2 ${
                    authMode === "login"
                      ? "bg-[#4c63f6] text-white shadow-lg shadow-indigo-600/20"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  <LoginOutlined />
                  Login
                </button>
                <button
                  type="button"
                  onClick={() => setAuthMode("signup")}
                  className={`px-5 py-2 rounded-lg text-xs font-bold tracking-wider transition-all uppercase inline-flex items-center gap-2 ${
                    authMode === "signup"
                      ? "bg-[#4c63f6] text-white shadow-lg shadow-indigo-600/20"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  <UserAddOutlined />
                  Sign Up
                </button>
              </div>

              <h2 className="text-3xl font-extrabold tracking-tight mb-2">
                {authMode === "login" ? "Welcome Back" : "Create Account"}
              </h2>
              <p className="text-gray-400 text-sm mb-8">
                {authMode === "login"
                  ? "Enter your credentials to access the studio."
                  : "Register to start syncing music with your friends."}
              </p>

              <div className="clerk-auth-panel">
                {authMode === "login" ? (
                  <SignIn
                    routing="hash"
                    appearance={clerkAppearance}
                    fallbackRedirectUrl="/dashboard"
                    signUpFallbackRedirectUrl="/dashboard"
                  />
                ) : (
                  <SignUp
                    routing="hash"
                    appearance={clerkAppearance}
                    fallbackRedirectUrl="/dashboard"
                    signInFallbackRedirectUrl="/dashboard"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </SignedOut>
    </>
  );
};

export default MusicLogin;
