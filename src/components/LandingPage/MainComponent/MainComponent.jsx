import React from "react";
import "./MainComponent.css";
import Button from "../../Common/Button/Button";
import iphone from "../../../assets/iphone.png";
import gradient from "../../../assets/gradient.png";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function MainComponent() {
  const handleShare = async () => {
    const shareData = {
      title: "CryptoTracker",
      text: "Track the Crypto Market in real time!",
      url: window.location.origin,
    };

    try {
      // Try Web Share API (mobile-friendly)
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback: Copy to clipboard
        await navigator.clipboard.writeText(shareData.url);
        alert("Link copied to clipboard!");
      }
    } catch (error) {
      // If user cancels share or error occurs
      console.log("Share cancelled or failed:", error);
    }
  };

  return (
    <div className="flex-info">
      <div className="left-container">
        <motion.h1
          className="track-crypto-heading"
          initial={{ opacity: 0, scale: 0.5, y: -250 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.5 }}
        >
          Track Crypto
        </motion.h1>
        <motion.h1
          className="real-time-heading"
          initial={{ opacity: 0, y: -250, scale: 0.3 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.5 }}
        >
          Real Time.
        </motion.h1>
        <motion.p
          className="info-text"
          initial={{ opacity: 0, x: -500 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5 }}
        >
          Track the Crypto Market in real time. Visit the Dashboard to do so!
        </motion.p>
        <motion.div
          className="btn-flex"
          initial={{ opacity: 0, x: -500, scale: 0.5 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.2 }}
        >
          <Link to="/dashboard">
            <Button text={"Dashboard"} />
          </Link>
          <Button text={"Share"} outlined={true} onClick={handleShare} />
        </motion.div>
      </div>
      <motion.div
        className="phone-container"
        animate={{ y: [-10, 10] }}
        transition={{
          duration: 1,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      >
        <img src={iphone} className="iphone" />
        <img src={gradient} className="gradient" />
      </motion.div>
    </div>
  );
}

export default MainComponent;
