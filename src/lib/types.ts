export type Lang = "ru" | "fr" | "en";

export type Role = "student" | "teacher";

export interface LocalizedString<T = string> {
  ru: T;
  fr: T;
  en: T;
}

export type WeekDay =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export type SportKey =
  | "powerlifting"
  | "swimming"
  | "chess"
  | "football"
  | "sambo"
  | "judo"
  | "hockey"
  | "athletics"
  | "tennis"
  | "tabletennis"
  | "armwrestling"
  | "basketball"
  | "golf"
  | "karate"
  | "boxing";

export interface SessionSlot {
  day: WeekDay;
  start: string;
  end: string;
  location: LocalizedString;
}

export interface SportSection {
  id: string;
  name: LocalizedString;
  sport: SportKey;
  category: "team" | "individual" | "combat";
  teacher: string;
  description: LocalizedString;
  capacity: number;
  enrolled: number;
  enrollmentOpen: boolean;
  sessions: SessionSlot[];
}

export interface NewsEvent {
  id: string;
  title: LocalizedString;
  date: string;
  time: string;
  location: LocalizedString;
  sport: SportKey;
  status: "upcoming" | "past";
}

export interface AttendanceRecord {
  id: string;
  date: string;
  section: SportKey;
  present: boolean;
  notes: LocalizedString;
}

export interface WeeklyAttendance {
  weekStart: string;
  attended: number;
  total: number;
}

export interface TeacherGroup {
  id: string;
  name: LocalizedString;
  level: LocalizedString;
  students: number;
  sessions: SessionSlot[];
  members: string[];
}

export interface TeacherReport {
  id: string;
  date: string;
  group: LocalizedString;
  present: number;
  absent: number;
  notes: LocalizedString;
}

export interface Session {
  email: string;
  name: string;
  role: Role;
}
