import React, { useEffect, useRef, useState, type HTMLAttributes } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface GalleryItem {
  common: string;
  binomial: string;
  photo: {
    url: string;
    text: string;
    pos?: string;
    by?: string;
  };
}

interface CircularGalleryProps extends HTMLAttributes<HTMLDivElement> {
  items: GalleryItem[];
  /** Controls how far the items are from the center. */
  radius?: number;
  /** Controls the speed of ambient auto-rotation when idle. */
  autoRotateSpeed?: number;
  /** Called when a card is genuinely clicked/tapped, not dragged/swiped. */
  onItemClick?: (index: number) => void;
}

const CLICK_DRAG_THRESHOLD = 6;

const CircularGallery = React.forwardRef<HTMLDivElement, CircularGalleryProps>(
  ({ items, className, radius = 600, autoRotateSpeed = 0.05, onItemClick, ...props }, ref) => {
    const [rotation, setRotation] = useState(0);
    const [isInteracting, setIsInteracting] = useState(false);
    const idleTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const animationFrameRef = useRef<number | null>(null);
    const dragRef = useRef<{
      startX: number;
      startRotation: number;
      moved: boolean;
      itemIndex: number | null;
    } | null>(null);

    // Ambient auto-rotation while idle (not dragging/scrolling)
    useEffect(() => {
      const autoRotate = () => {
        if (!isInteracting) {
          setRotation((prev) => prev + autoRotateSpeed);
        }
        animationFrameRef.current = requestAnimationFrame(autoRotate);
      };
      animationFrameRef.current = requestAnimationFrame(autoRotate);
      return () => {
        if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      };
    }, [isInteracting, autoRotateSpeed]);

    function markInteracting() {
      setIsInteracting(true);
      if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);
      idleTimeoutRef.current = setTimeout(() => setIsInteracting(false), 1200);
    }

    function handlePointerDown(e: React.PointerEvent) {
      const cardEl = (e.target as HTMLElement).closest<HTMLElement>("[data-item-index]");
      const itemIndex = cardEl ? Number(cardEl.dataset.itemIndex) : null;
      dragRef.current = { startX: e.clientX, startRotation: rotation, moved: false, itemIndex };
      markInteracting();
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    }

    function handlePointerMove(e: React.PointerEvent) {
      if (!dragRef.current) return;
      markInteracting();
      const deltaX = e.clientX - dragRef.current.startX;
      if (Math.abs(deltaX) > CLICK_DRAG_THRESHOLD) dragRef.current.moved = true;
      setRotation(dragRef.current.startRotation + deltaX * 0.3);
    }

    function handlePointerUp() {
      const drag = dragRef.current;
      dragRef.current = null;
      if (drag && !drag.moved && drag.itemIndex !== null) {
        onItemClick?.(drag.itemIndex);
      }
    }

    function handleWheel(e: React.WheelEvent) {
      // Only take over horizontal gestures; let vertical page scroll pass through.
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      e.preventDefault();
      markInteracting();
      setRotation((prev) => prev + e.deltaX * 0.3);
    }

    function step(direction: 1 | -1) {
      markInteracting();
      setRotation((prev) => prev + direction * (360 / items.length));
    }

    const anglePerItem = 360 / items.length;

    return (
      <div
        ref={ref}
        role="region"
        aria-label="Circular 3D Gallery"
        className={cn(
          "relative flex h-full w-full touch-pan-y select-none items-center justify-center",
          className,
        )}
        style={{ perspective: "2000px", cursor: dragRef.current ? "grabbing" : "grab" }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onWheel={handleWheel}
        {...props}
      >
        <div
          className="relative h-full w-full"
          style={{
            transform: `rotateY(${rotation}deg)`,
            transformStyle: "preserve-3d",
          }}
        >
          {items.map((item, i) => {
            const itemAngle = i * anglePerItem;
            const totalRotation = rotation % 360;
            const relativeAngle = (itemAngle + totalRotation + 360) % 360;
            const normalizedAngle = Math.abs(
              relativeAngle > 180 ? 360 - relativeAngle : relativeAngle,
            );
            const opacity = Math.max(0.25, 1 - normalizedAngle / 180);

            return (
              <div
                key={item.photo.url}
                role={onItemClick ? "link" : "group"}
                aria-label={item.common}
                data-item-index={i}
                tabIndex={onItemClick ? 0 : undefined}
                onKeyDown={
                  onItemClick
                    ? (e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          onItemClick(i);
                        }
                      }
                    : undefined
                }
                className="absolute h-[280px] w-[220px] sm:h-[340px] sm:w-[260px]"
                style={{
                  transform: `rotateY(${itemAngle}deg) translateZ(${radius}px)`,
                  left: "50%",
                  top: "50%",
                  marginLeft: "-110px",
                  marginTop: "-140px",
                  opacity,
                  transition: "opacity 0.3s linear",
                  cursor: onItemClick ? "pointer" : undefined,
                }}
              >
                <div className="group relative h-full w-full overflow-hidden rounded-lg border border-gold/30 bg-charcoal/70 shadow-2xl backdrop-blur-lg">
                  <img
                    src={item.photo.url}
                    alt={item.photo.text}
                    draggable={false}
                    className="absolute inset-0 h-full w-full object-cover"
                    style={{ objectPosition: item.photo.pos || "center" }}
                  />
                  <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/90 to-transparent p-4 text-white">
                    <div className="eyebrow !text-gold">{item.binomial}</div>
                    <h2 className="mt-1 font-serif text-lg font-bold">{item.common}</h2>
                    {item.photo.by && <p className="mt-2 text-xs opacity-70">{item.photo.by}</p>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <button
          type="button"
          aria-label="Sebelumnya"
          onClick={() => step(-1)}
          className="absolute left-2 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center border border-gold/40 bg-black/40 text-gold backdrop-blur-sm transition-colors hover:border-gold hover:bg-black/60 sm:left-6"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          type="button"
          aria-label="Selanjutnya"
          onClick={() => step(1)}
          className="absolute right-2 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center border border-gold/40 bg-black/40 text-gold backdrop-blur-sm transition-colors hover:border-gold hover:bg-black/60 sm:right-6"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    );
  },
);

CircularGallery.displayName = "CircularGallery";

export { CircularGallery };
