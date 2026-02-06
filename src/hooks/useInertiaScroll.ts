import { useEffect, useRef } from "react";

export const useInertiaScroll = (friction = 0.92, speed = 1) => {
  const position = useRef(window.scrollY);
  const velocity = useRef(0);
  const raf = useRef<number | null>(null);
  const isProgrammaticScroll = useRef(false);

  useEffect(() => {
    // Désactive inertie sur mobile / tactile
    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const onWheel = (e: WheelEvent) => {
      velocity.current += e.deltaY * speed;
    };

    // Détecte les scrolls programmatiques (bouton Back to Top, ancres, etc.)
    const onScroll = () => {
      const currentScroll = window.scrollY;
      const diff = Math.abs(currentScroll - position.current);
      
      // Si l'écart est grand et qu'on n'est pas en train de scroller à la molette
      if (diff > 100 && Math.abs(velocity.current) < 1) {
        isProgrammaticScroll.current = true;
        position.current = currentScroll;
        velocity.current = 0;
        
        // Réactive l'inertie après un court délai
        setTimeout(() => {
          isProgrammaticScroll.current = false;
        }, 100);
      }
    };

    const animate = () => {
      // Skip l'animation si c'est un scroll programmatique
      if (!isProgrammaticScroll.current) {
        velocity.current *= friction;

        if (Math.abs(velocity.current) < 0.1) velocity.current = 0;

        position.current += velocity.current;

        // Limites haut/bas
        const maxScroll = document.body.scrollHeight - window.innerHeight;
        if (position.current < 0) position.current = 0;
        if (position.current > maxScroll) position.current = maxScroll;

        window.scrollTo(0, position.current);
      }

      raf.current = requestAnimationFrame(animate);
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    raf.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("scroll", onScroll);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [friction, speed]);
};