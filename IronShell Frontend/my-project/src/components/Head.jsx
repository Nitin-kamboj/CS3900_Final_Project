import { useState, useEffect } from "react";
import ironshell from "../assets/logo.png";
import defaultPhoto from "../assets/profile.png";
import { Link } from "@tanstack/react-router";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [userPhoto, setUserPhoto] = useState(defaultPhoto);
  // const [log, setLog] = useState("Login");
  const navLinks = ["HOME", "PLANS", "ABOUT", "CONTACT"];
  const [log, setLog] = useState(() => {
    return localStorage.getItem("token") ? "LOGOUT" : "LOGIN";
  });

  useEffect(() => {
    const syncAuth = () => {
      const token = localStorage.getItem("token");
      setLog(token ? "LOGOUT" : "LOGIN");
    };

    syncAuth();
    window.addEventListener("storage", syncAuth); // Sync across tabs
    window.addEventListener("auth-change", syncAuth); // Custom event for this tab

    return () => {
      window.removeEventListener("storage", syncAuth);
      window.removeEventListener("auth-change", syncAuth);
    };
  }, []);
  function setLogBtn() {
    const token = localStorage.getItem("token");

    if (token) {
      localStorage.removeItem("token");
      setLog("LOGIN");
      setUserPhoto(defaultPhoto);
    }
  }

  useEffect(() => {
    async function fetchImage() {
      const token = localStorage.getItem("token");
      if (!token) return; // Don't fetch if not logged in

      try {
        const response = await fetch(
          `http://localhost:3000/api/getProfileImage`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (response.ok) {
          const data = await response.json();
          // Use image_url to match your controller's response
          if (data.image_url) {
            setUserPhoto(data.image_url);
          }
        }
      } catch (error) {
        console.error("Failed to fetch profile image:", error);
      }
    }
    fetchImage();
  }, [log]);

  async function handlePhotoChange(e) {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setUserPhoto(previewUrl);

      const formData = new FormData();
      formData.append("image", file); // Key must be 'image' to match Multer

      try {
        const response = await fetch(
          "http://localhost:3000/api/addProfileImage",
          {
            method: "POST",
            headers: {
              // NOTE: Do NOT set Content-Type; the browser handles it for FormData
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: formData,
          },
        );

        if (response.ok) {
          const data = await response.json();
          console.log("Success:", data);
          setUserPhoto(data.url);
        } else {
          console.error("Upload failed");
          setUserPhoto(defaultPhoto);
        }
      } catch (error) {
        console.error("Network error:", error);
        setUserPhoto(defaultPhoto);
      }
    }
  }

  return (
    <header className="w-full bg-black border-b-4 border-zinc-900 sticky top-0 z-50 ">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-5">
        {/* 1. LOGO SECTION */}
        <div className="z-50  flex">
          <img
            className=" md:w-32 object-contain scale-120"
            src={ironshell}
            alt="Ironshell Gym"
          />
        </div>

        {/* 2. DESKTOP NAVIGATION */}
        <nav className="hidden md:flex items-center">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`/${link.toLowerCase()}`}
              className="group relative px-8 py-3 overflow-hidden"
            >
              {/* Skewed Background Layer */}
              <div className="absolute inset-0 bg-zinc-900 border-r border-black skew-x-[-20deg] group-hover:bg-green-300 transition-colors duration-300 pointer-events-none"></div>

              {/* Text */}
              <span className="relative block text-xs font-black tracking-widest text-white group-hover:text-black transition-colors duration-300">
                {link}
              </span>
            </a>
          ))}
        </nav>

        {/* 3. PROFILE & HAMBURGER */}
        <div className="flex items-center gap-4 z-50">
          {/* Status Pill */}
          {/* <div className="hidden lg:flex items-center gap-2 bg-green-300 px-4 py-1 rounded-sm skew-x-[-10deg]">
            <span className="w-2 h-2 bg-black rounded-full animate-pulse"></span>
            <span className="text-[10px] font-black uppercase text-black skew-x-[10deg]">
              Live Status
            </span>
          </div> */}

          {/* Profile Image */}
          {/* Profile Image Container */}
          <div className="relative w-10 h-10 group">
            <img
              className="w-full h-full rounded-full border-2 border-green-300 object-cover"
              src={userPhoto}
              alt="User"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              // This invisible input now sits perfectly on top of the image
              className="absolute inset-0 opacity-0 cursor-pointer z-10"
              title="Change Profile Photo"
            />
            {/* Subtle hover effect */}
            <div className="absolute inset-0 rounded-full bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          </div>

          {/* Log in || Log Out button */}
          <Link to="/login">
            <div
              onClick={setLogBtn}
              className="hidden lg:flex items-center gap-2 bg-green-300 px-4 py-1 rounded-sm skew-x-[-10deg] cursor-pointer"
            >
              <span className="text-[10px] font-black uppercase text-black skew-x-[10deg]">
                {log}
              </span>
            </div>
          </Link>

          {/* Hamburger Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5 focus:outline-none"
          >
            <div
              className={`h-1 w-7 bg-white transition-all duration-300 ${
                isOpen ? "rotate-45 translate-y-2.5 bg-green-300" : ""
              }`}
            ></div>
            <div
              className={`h-1 w-7 bg-white transition-all duration-300 ${
                isOpen ? "opacity-0" : ""
              }`}
            ></div>
            <div
              className={`h-1 w-7 bg-white transition-all duration-300 ${
                isOpen ? "-rotate-45 -translate-y-2.5 bg-green-300" : ""
              }`}
            ></div>
          </button>
        </div>
      </div>

      {/* 4. MOBILE MENU OVERLAY */}
      <div
        className={`fixed inset-0 bg-black/95 transition-all duration-500 ease-in-out md:hidden flex flex-col items-center justify-center gap-8 ${
          isOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-full pointer-events-none"
        }`}
      >
        {navLinks.map((link) => (
          <a
            key={link}
            href={`/${link.toLowerCase()}`}
            onClick={() => setIsOpen(false)}
            className="text-5xl font-black italic text-white hover:text-green-300 tracking-tight uppercase transition-colors"
          >
            {link}
          </a>
        ))}

        <button className="mt-8 px-10 py-4 bg-green-300 text-black font-black uppercase italic text-xl">
          Start Training
        </button>
      </div>
    </header>
  );
}
