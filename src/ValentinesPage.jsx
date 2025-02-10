import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import "./Valentine.css";

const generateImages = (count) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    src: `${process.env.PUBLIC_URL}/assets/photo${i + 1}.jpg`, // Cycles through photo1, photo2, photo3
    top: Math.random() * 80 + 10,
    left: Math.random() * 80 + 10,
    rotate: Math.random() * 30 - 15,
  }));
};

const imagesData = generateImages(23);

const ValentinesPage = () => {
  const [showText, setShowText] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [noClicked, setNoClicked] = useState(false);
  const [noPosition, setNoPosition] = useState({ top: "57%", left: "70%" });
  const [images, setImages] = useState(imagesData);
  const [expandedImage, setExpandedImage] = useState(null);
  const [floatingImages, setFloatingImages] = useState([]);

  useEffect(() => {
    document.addEventListener("mousemove", () => setShowText(true));
    return () => document.removeEventListener("mousemove", () => setShowText(true));
  }, []);

  const clearAllImages = () => {
    setImages([]); // Clears all images
    setShowText(true); // Triggers Valentine question
  };

  const closeExpandedImage = () => {
    setImages((prevImages) => prevImages.filter((img) => img.id !== expandedImage.id));
    setExpandedImage(null);
  };

  const moveNoButton = () => {
    setNoClicked(true);
    setNoPosition({
      top: `${(Math.random() > 0.5 ? 1 : -1) * (Math.random() * 200)}%`,
      left: `${(Math.random() > 0.5 ? 1 : -1) * (Math.random() * 200)}%`,
    });
  };

  const addFloatingImages = () => {
    const newImages = Array.from({ length: 20 }, (_, i) => ({
      id: `floating-${i}`,
      src: `/assets/timtim${(i % 4) + 1}.png`,
      top: Math.random() * 80 + 10,
      left: Math.random() * 80 + 10,
      velocityX: (Math.random() - 0.5) * 200, // Random horizontal speed
      velocityY: (Math.random() - 0.5) * 200, // Random vertical speed
    }));
    setFloatingImages(newImages);
  };

  return (
    <div className="valentine-container">
      {accepted && <Confetti width={window.innerWidth} height={window.innerHeight} />}
      {/* Star Button - Clears Photos */}
      <button className="star-button" onClick={clearAllImages}>
        ⭐
      </button>
      <div className="photo-stack" style={{ width: "100vw", height: "100vh", position: "relative" }}>
        {images.map((img, index) => (
          <motion.div
            key={img.id}
            className="instax-frame"
            style={{
              zIndex: images.length - index,
              position: "absolute",
              top: `${img.top}%`,
              left: `${img.left}%`,
              transform: `rotate(${img.rotate}deg)`,
              background: "white",
              padding: "10px",
              borderRadius: "0px",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
              borderBottom: "20px solid white",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ y: "-100vh", opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            onClick={() => setExpandedImage(img)}
          >
            <img
              src={img.src}
              alt={`memory ${index + 1}`}
              className="photo"
              style={{
                display: "block",
                width: "180px",
                height: "240px",
                borderRadius: "0px",
                border: "none",
                transform: "none",
              }}
            />
          </motion.div>
        ))}
      </div>
      {floatingImages.map((img) => (
        <motion.img
          key={img.id}
          src={img.src}
          className="floating-image"
          style={{
            position: "absolute",
            top: `${img.top}%`,
            left: `${img.left}%`,
            width: "200px",
            height: "200px",
            borderRadius: "40%",
            zIndex: 9999,
          }}
          animate={{
            x: Array(6)
              .fill(0)
              .map(() => Math.random() * 500 - 250), // Moves randomly in X direction
            y: Array(6)
              .fill(0)
              .map(() => Math.random() * 400 - 200), // Moves randomly in Y direction
            rotate: Array(6)
              .fill(0)
              .map(() => Math.random() * 360), // Rotates randomly
            scale: [1, 1.2, 0.9, 1], // Small scale variation
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
            repeatDelay: Math.random() * 2,
          }}
        />
      ))}
      {expandedImage && (
        <motion.div
          className="expanded-image-container"
          initial={{ opacity: 0, backgroundColor: "#ffdde1" }}
          animate={{ opacity: 1, backgroundColor: "rgba(0, 0, 0, 0.4)" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          onClick={closeExpandedImage}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
        >
          <motion.img
            src={expandedImage.src}
            className="expanded-image"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{ maxWidth: "70vw", maxHeight: "70vh", borderRadius: "10px" }}
          />
          <button
            className="close-button"
            onClick={closeExpandedImage}
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              background: "white",
              border: "none",
              fontSize: "20px",
              cursor: "pointer",
              padding: "5px 10px",
              borderRadius: "5px",
            }}
          >
            X
          </button>
        </motion.div>
      )}
      {images.length === 0 && showText && (
        <motion.div
          className="question"
          style={{
            background: "linear-gradient(135deg, #ff9a9e, #fad0c4)",
            padding: "30px",
            borderRadius: "25px",
            textAlign: "center",
            boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.3)",
            maxWidth: "600px",
            margin: "auto",
            position: "absolute",
            top: "40%",
            left: "40%",
            transform: "translate(-50%, -50%)",
          }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2 }}
        >
          <h1
            className="valentine-text"
            style={{ fontFamily: "cursive", fontSize: "24px", color: "#d6336c", fontWeight: "bold" }}
          >
            Will you be my Valentine? 💖
          </h1>
          <div className="buttons">
            <button
              className="yes"
              onClick={() => {
                setAccepted(true);
                addFloatingImages();
              }}
            >
              Yes 💕
            </button>
            <button
              className="no"
              style={{
                backgroundColor: "#d9d9d9",
                borderRadius: "10px",
                padding: "10px 20px",
                fontSize: "18px",
                fontWeight: "bold",
                border: "none",
                cursor: "pointer",
                color: "#333",
                boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
                position: "absolute",
                top: noPosition.top,
                left: noPosition.left,
              }}
              onMouseEnter={moveNoButton}
            >
              No 😢
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ValentinesPage;
