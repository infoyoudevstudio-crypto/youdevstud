import React, { useEffect, useState } from "react";

interface BackToTopProps {
  scrollContainerId?: string; // optionnel si tu veux un container spécifique
}

const BackToTop: React.FC<BackToTopProps> = ({ scrollContainerId }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const container = scrollContainerId
      ? document.getElementById(scrollContainerId)
      : window;

    const checkScroll = () => {
      if (!container) return; // ⚠️ vérification importante

      let scrollTop = 0;

      if (container instanceof Window) {
        scrollTop = window.scrollY || document.documentElement.scrollTop;
      } else {
        scrollTop = container.scrollTop;
      }

      setVisible(scrollTop > 600);
    };

    if (!container) return; // ⚠️ stop si container null

    container.addEventListener("scroll", checkScroll);
    checkScroll(); // check initial

    return () => {
      container.removeEventListener("scroll", checkScroll);
    };
  }, [scrollContainerId]);

  const scrollToTop = () => {
    const container = scrollContainerId
      ? document.getElementById(scrollContainerId)
      : window;

    if (!container) return; // ⚠️ vérification

    if (container instanceof Window) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      container.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      style={{
        position: "fixed",
        bottom: "30px",
        right: "30px",
        zIndex: 9999,
        padding: "12px 18px",
        background: "#00ff00",
        color: "#000",
        border: "none",
        borderRadius: "30px",
        cursor: "pointer",
        boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
      }}
    >
      ↑ Top
    </button>
  );
};

export default BackToTop;

