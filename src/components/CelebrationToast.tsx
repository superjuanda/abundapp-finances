import { useEffect } from "react";
import confetti from "canvas-confetti";

interface CelebrationToastProps {
  categoryName: string;
  categoryEmoji: string;
  amount: number;
  userName: string;
  userEmoji: string;
}

export function fireCelebrationConfetti() {
  const duration = 1200;
  const colors = ["#7C3AED", "#A78BFA", "#DDD6FE", "#F59E0B", "#34D399"];

  confetti({
    particleCount: 60,
    spread: 70,
    origin: { y: 0.7 },
    colors,
    ticks: 80,
    gravity: 1.2,
    scalar: 0.9,
  });

  setTimeout(() => {
    confetti({
      particleCount: 30,
      spread: 50,
      origin: { y: 0.65, x: 0.3 },
      colors,
      ticks: 60,
      gravity: 1.4,
      scalar: 0.8,
    });
  }, 200);

  setTimeout(() => {
    confetti({
      particleCount: 30,
      spread: 50,
      origin: { y: 0.65, x: 0.7 },
      colors,
      ticks: 60,
      gravity: 1.4,
      scalar: 0.8,
    });
  }, 350);

  return duration;
}

export function CelebrationToastContent({ categoryName, categoryEmoji, amount, userName, userEmoji }: CelebrationToastProps) {
  useEffect(() => {
    fireCelebrationConfetti();
  }, []);

  return (
    <div className="flex items-center gap-3 animate-fade-in">
      <div className="text-3xl animate-bounce">{categoryEmoji}</div>
      <div className="flex-1">
        <p className="font-bold text-sm">¡Gasto registrado! 🎉</p>
        <p className="text-xs text-muted-foreground mt-0.5">
          {userEmoji} {userName} · {categoryName}
        </p>
        <p className="text-base font-extrabold text-primary mt-0.5">
          ${amount.toLocaleString("es-CO")}
        </p>
      </div>
    </div>
  );
}
