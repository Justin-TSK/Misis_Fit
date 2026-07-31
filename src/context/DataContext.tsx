"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { SECTIONS, SELECTION_PERIOD_OPEN } from "@/lib/data";
import { storage } from "@/lib/storage";
import type { SportSection } from "@/lib/types";

interface EnrollResult {
  ok: boolean;
  message?: "full" | "periodClosed" | "alreadyEnrolled";
}

interface DataValue {
  sections: SportSection[];
  selectionPeriodOpen: boolean;
  enrolledIds: string[];
  isEnrolled: (id: string) => boolean;
  currentSection: SportSection | null;
  enroll: (id: string) => EnrollResult;
  unenroll: (id: string) => void;
}

const DataContext = createContext<DataValue | null>(null);

export function DataProvider({ children }: { children: ReactNode }) {
  const [sections, setSections] = useState<SportSection[]>(SECTIONS);
  const [enrolledIds, setEnrolledIds] = useState<string[]>([]);
  const selectionPeriodOpen = SELECTION_PERIOD_OPEN;

  useEffect(() => {
    // Hydrate enrollments from localStorage on mount (client only).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEnrolledIds(storage.getEnrollments());
  }, []);

  const persist = useCallback((ids: string[]) => {
    setEnrolledIds(ids);
    storage.setEnrollments(ids);
  }, []);

  const isEnrolled = useCallback(
    (id: string) => enrolledIds.includes(id),
    [enrolledIds],
  );

  const currentSection = useMemo(
    () => sections.find((s) => enrolledIds.includes(s.id)) ?? null,
    [sections, enrolledIds],
  );

  const enroll = useCallback(
    (id: string): EnrollResult => {
      if (!selectionPeriodOpen) return { ok: false, message: "periodClosed" };
      if (enrolledIds.length > 0) return { ok: false, message: "alreadyEnrolled" };

      const section = sections.find((s) => s.id === id);
      if (!section) return { ok: false, message: "full" };
      if (section.enrolled >= section.capacity) return { ok: false, message: "full" };

      setSections((prev) =>
        prev.map((s) =>
          s.id === id ? { ...s, enrolled: s.enrolled + 1 } : s,
        ),
      );
      persist([...enrolledIds, id]);
      return { ok: true };
    },
    [sections, enrolledIds, selectionPeriodOpen, persist],
  );

  const unenroll = useCallback(
    (id: string) => {
      setSections((prev) =>
        prev.map((s) =>
          s.id === id ? { ...s, enrolled: Math.max(0, s.enrolled - 1) } : s,
        ),
      );
      persist(enrolledIds.filter((eid) => eid !== id));
    },
    [enrolledIds, persist],
  );

  const value = useMemo(
    () => ({
      sections,
      selectionPeriodOpen,
      enrolledIds,
      isEnrolled,
      currentSection,
      enroll,
      unenroll,
    }),
    [sections, selectionPeriodOpen, enrolledIds, isEnrolled, currentSection, enroll, unenroll],
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData(): DataValue {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData must be used within DataProvider");
  return ctx;
}
