import React, { useEffect, useState } from "react";

const TypewriterEffect = () => {
  const words = [
    "Flipkart",
    "Amazon"
  ];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let typingTimeout;

    const type = () => {
      const currentWord = words[currentWordIndex];
      if (isDeleting) {
        setCurrentText((prev) => prev.substring(0, prev.length - 1));
        if (currentText.length === 0) {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }
      } else {
        setCurrentText((prev) => currentWord.substring(0, prev.length + 1));
        if (currentText === currentWord) {
          setIsDeleting(true);
        }
      }
    };

    typingTimeout = setTimeout(type, 150);

    return () => clearTimeout(typingTimeout);
  }, [currentText, isDeleting, currentWordIndex, words]);

  return (
    <span
      className="text-red-500 opacity-75 gap-0 text-start"
      // style={{
      //   display: "inline-block",
      //   minWidth: "66px", // Adjust the width to fit the longest word
      //   textAlign: "left", // Optional, aligns the text within the container
      // }}
    >
      {currentText}
    </span>
  );
};

export default TypewriterEffect;
