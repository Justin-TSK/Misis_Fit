import {
  Activity,
  Award,
  Brain,
  CircleDot,
  Dumbbell,
  Flag,
  Flame,
  Goal,
  Hand,
  Shield,
  Swords,
  Target,
  Volleyball,
  Waves,
  Zap,
  type LucideIcon,
} from "lucide-react";

import type { SportKey } from "@/lib/types";

const ICONS: Record<SportKey, LucideIcon> = {
  powerlifting: Dumbbell,
  swimming: Waves,
  chess: Brain,
  football: Goal,
  sambo: Shield,
  judo: Swords,
  hockey: Zap,
  athletics: Activity,
  tennis: Target,
  tabletennis: CircleDot,
  armwrestling: Flame,
  basketball: Volleyball,
  golf: Flag,
  karate: Hand,
  boxing: Award,
};

export function SportIcon({
  sport,
  className,
}: {
  sport: SportKey;
  className?: string;
}) {
  const Icon = ICONS[sport] ?? Activity;
  return <Icon className={className} aria-hidden="true" />;
}
