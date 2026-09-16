"use client";

import {
  useEffect,
  useRef,
  type CSSProperties,
  type ReactNode,
} from "react";

export type HeroFanCard = {
  id: string | number;
  content: ReactNode;
};

type HeroFanGalleryProps = {
  cards: HeroFanCard[];
  className?: string;
  radius?: number;
  orbitDuration?: number;
  tilt?: number;
};

const CARD_COUNT = 10;

const DEG = Math.PI / 180;

/**
 * Exact reference-style orbital configuration.
 */
const DEFAULT_RADIUS = 302;
const DEFAULT_ORBIT_DURATION = 26;
const DEFAULT_TILT = 8;

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export default function HeroFanGallery({
  cards,
  className = "",
  radius = DEFAULT_RADIUS,
  orbitDuration = DEFAULT_ORBIT_DURATION,
  tilt = DEFAULT_TILT,
}: HeroFanGalleryProps) {
  const galleryRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const frameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  const visibleRef = useRef(true);

  const mouseTargetRef = useRef({
    x: 0,
    y: 0,
  });

  const mouseCurrentRef = useRef({
    x: 0,
    y: 0,
  });

  const reducedMotionRef = useRef(false);

  /**
   * Store references to cards.
   */
  const setCardRef =
    (index: number) =>
      (node: HTMLDivElement | null) => {
        cardRefs.current[index] = node;
      };

  /**
   * Respect prefers-reduced-motion.
   */
  useEffect(() => {
    const media = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    const update = () => {
      reducedMotionRef.current = media.matches;
    };

    update();

    media.addEventListener("change", update);

    return () => {
      media.removeEventListener("change", update);
    };
  }, []);

  /**
   * Pause the expensive animation while the gallery
   * is outside the viewport.
   */
  useEffect(() => {
    const element = galleryRef.current;

    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
      },
      {
        threshold: 0.05,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  /**
   * Mouse parallax.
   */
  useEffect(() => {
    const element = galleryRef.current;

    if (!element) {
      return;
    }

    const handlePointerMove = (
      event: PointerEvent
    ) => {
      if (reducedMotionRef.current) {
        return;
      }

      const rect =
        element.getBoundingClientRect();

      const x =
        ((event.clientX - rect.left) / rect.width) *
        2 -
        1;

      const y =
        ((event.clientY - rect.top) / rect.height) *
        2 -
        1;

      mouseTargetRef.current.x = clamp(
        x,
        -1,
        1
      );

      mouseTargetRef.current.y = clamp(
        y,
        -1,
        1
      );
    };

    const handlePointerLeave = () => {
      mouseTargetRef.current.x = 0;
      mouseTargetRef.current.y = 0;
    };

    element.addEventListener(
      "pointermove",
      handlePointerMove
    );

    element.addEventListener(
      "pointerleave",
      handlePointerLeave
    );

    return () => {
      element.removeEventListener(
        "pointermove",
        handlePointerMove
      );

      element.removeEventListener(
        "pointerleave",
        handlePointerLeave
      );
    };
  }, []);

  /**
   * Main animation loop.
   *
   * Important:
   * - One rAF loop
   * - 10 cards
   * - 36° separation
   * - circular 3D orbit
   * - cosine-based depth sorting
   * - continuous rotZ
   */
  useEffect(() => {
    const elements =
      cardRefs.current.filter(
        (card): card is HTMLDivElement =>
          card !== null
      );

    if (elements.length === 0) {
      return;
    }

    const angularSpeed =
      (Math.PI * 2) / orbitDuration;

    let mounted = true;

    const render = (
      elapsedSeconds: number
    ) => {
      const mouseTarget =
        mouseTargetRef.current;

      const mouseCurrent =
        mouseCurrentRef.current;

      /**
       * Smooth mouse interpolation.
       */
      mouseCurrent.x +=
        (mouseTarget.x - mouseCurrent.x) *
        0.08;

      mouseCurrent.y +=
        (mouseTarget.y - mouseCurrent.y) *
        0.08;

      /**
       * Reference-style mouse tilt.
       */
      const mouseX =
        mouseCurrent.x;

      const mouseY =
        mouseCurrent.y;

      elements.forEach(
        (card, index) => {
          /**
           * Ten cards = 36 degrees apart.
           */
          const baseTheta =
            index *
            ((Math.PI * 2) / CARD_COUNT) -
            Math.PI / 2;

          /**
           * Continuous orbital motion.
           */
          const theta =
            baseTheta +
            elapsedSeconds *
            angularSpeed;

          /**
           * Circular orbit.
           */
          const x =
            Math.cos(theta) * radius;

          const y =
            Math.sin(theta) * radius;

          /**
           * Front/back depth.
           *
           * Range:
           * 1 → 79
           */
          const depth =
            (1 - Math.cos(theta)) / 2;

          const zIndex =
            Math.round(
              depth * 78 + 1
            );

          /**
           * Reference-style 3D pitch.
           *
           * 4deg * sin(theta)
           * - 0.35 * mouseY * tilt
           */
          const rotateX =
            4 * Math.sin(theta) -
            0.35 *
            mouseY *
            tilt;

          /**
           * Reference-style yaw.
           *
           * 10deg * cos(theta)
           * + mouseX parallax
           */
          const rotateY =
            10 * Math.cos(theta) +
            0.35 *
            mouseX *
            tilt;

          /**
           * Continuous roll.
           *
           * Equivalent to approximately:
           * -23.34° + 5.04° per card step.
           *
           * Because theta continuously changes,
           * this also wraps continuously through
           * the full orbit.
           */
          const rotateZ =
            -23.34 +
            (theta / DEG) * 0.14;

          /**
           * Subtle depth scaling.
           *
           * Back:
           * 0.92
           *
           * Front:
           * 1.04
           */
          const scale =
            0.92 +
            depth * 0.12;

          /**
           * Subtle opacity depth.
           */
          const opacity =
            0.72 +
            depth * 0.28;

          /**
           * Very small depth blur.
           */
          const blur =
            (1 - depth) * 1.5;

          card.style.transform = `
            translate(-50%, -50%)
            translate3d(${x}px, ${y}px, 0)
            perspective(1100px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            rotateZ(${rotateZ}deg)
            scale(${scale})
          `;

          card.style.opacity =
            opacity.toFixed(3);

          card.style.zIndex =
            String(zIndex);

          card.style.filter =
            `blur(${blur.toFixed(2)}px)`;
        }
      );
    };

    /**
     * Reduced motion:
     * render one fixed orbit position and stop.
     */
    if (reducedMotionRef.current) {
      render(0);
      return;
    }

    const animate = (
      timestamp: number
    ) => {
      if (!mounted) {
        return;
      }

      if (
        startTimeRef.current === null
      ) {
        startTimeRef.current =
          timestamp;
      }

      /**
       * Don't advance/render when the hero
       * isn't visible.
       */
      if (visibleRef.current) {
        const elapsed =
          (timestamp -
            startTimeRef.current) /
          1000;

        render(elapsed);
      } else {
        /**
         * Keep a valid frame alive so the animation
         * can resume immediately when visible again.
         */
        startTimeRef.current =
          timestamp;
      }

      frameRef.current =
        requestAnimationFrame(animate);
    };

    frameRef.current =
      requestAnimationFrame(animate);

    return () => {
      mounted = false;

      if (
        frameRef.current !== null
      ) {
        cancelAnimationFrame(
          frameRef.current
        );
      }

      frameRef.current = null;
      startTimeRef.current = null;
    };
  }, [
    orbitDuration,
    radius,
    tilt,
  ]);

  /**
   * Important:
   * Exactly 10 cards are expected by the reference.
   */
  const visibleCards =
    cards.slice(0, CARD_COUNT);

  return (
    <div
      ref={galleryRef}
      className={[
        "hero-orbit-gallery",
        className,
      ].join(" ")}
      aria-hidden="true"
    >
      <div className="hero-orbit-gallery__viewport">
        <div className="hero-orbit-gallery__orbit">
          {visibleCards.map(
            (card, index) => {
              const style: CSSProperties = {
                "--orbit-index":
                  index,
              } as CSSProperties;

              return (
                <div
                  key={card.id}
                  ref={setCardRef(index)}
                  className="hero-orbit-gallery__card"
                  style={style}
                >
                  <div className="hero-orbit-gallery__card-inner">
                    {card.content}
                  </div>
                </div>
              );
            }
          )}
        </div>

        <div
          className="hero-orbit-gallery__fade"
        />
      </div>
    </div>
  );
}
