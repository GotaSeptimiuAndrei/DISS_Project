import { useState } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  Users,
  MessageSquare,
  Calendar,
  TrendingUp,
  Star,
  Clock,
  ChevronDown,
  ChevronUp,
  Target,
  BookOpen,
  Award,
  Video,
  MoreHorizontal,
  Search,
  Filter,
  CheckCircle,
  AlertCircle,
  Zap,
} from "lucide-react";
import { useChatPanel } from "./ChatPanel";

// ─── Types ────────────────────────────────────────────────────────────────────

type SessionStatus = "completed" | "upcoming" | "cancelled";

interface Session {
  id: number;
  topic: string;
  date: string;
  duration: string;
  status: SessionStatus;
  notes?: string;
}

interface Skill {
  name: string;
  current: number;
  target: number;
}

interface Mentee {
  id: number;
  name: string;
  image: string;
  title: string;
  company: string;
  goal: string;
  overallProgress: number;
  sessionsCompleted: number;
  totalSessions: number;
  nextSession: string | null;
  joinedDate: string;
  status: "active" | "on-track" | "needs-attention";
  rating: number;
  skills: Skill[];
  recentSessions: Session[];
  lastNote: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const mentees: Mentee[] = [
  {
    id: 1,
    name: "Alex Johnson",
    image: "https://images.unsplash.com/photo-1706025090996-63717544be2d?w=200",
    title: "Product Manager",
    company: "TechX Solutions",
    goal: "Software Engineering Leadership",
    overallProgress: 75,
    sessionsCompleted: 6,
    totalSessions: 8,
    nextSession: "Tomorrow, 2:00 PM",
    joinedDate: "Mar 15, 2026",
    status: "on-track",
    rating: 4.8,
    skills: [
      { name: "Prompt Engineering", current: 67, target: 90 },
      { name: "AI Workflows", current: 40, target: 80 },
      { name: "System Design", current: 80, target: 95 },
      { name: "Team Leadership", current: 70, target: 85 },
    ],
    recentSessions: [
      {
        id: 1,
        topic: "LLM Basics",
        date: "Mar 20",
        duration: "30 min",
        status: "completed",
        notes: "Strong fundamentals, ready for advanced topics.",
      },
      {
        id: 2,
        topic: "Prompting",
        date: "Apr 3",
        duration: "30 min",
        status: "completed",
        notes: "Picked up CoT very fast.",
      },
      {
        id: 3,
        topic: "Chain-of-thought",
        date: "Apr 10",
        duration: "30 min",
        status: "completed",
      },
      {
        id: 4,
        topic: "AI Workflow Design",
        date: "Tomorrow",
        duration: "30 min",
        status: "upcoming",
      },
    ],
    lastNote:
      "Alex is making strong progress. Next focus should be practical AI workflow design applied to product specs.",
  },
  {
    id: 2,
    name: "Maria Garcia",
    image: "https://images.unsplash.com/photo-1652471949169-9c587e8898cd?w=200",
    title: "Engineering Manager",
    company: "CloudScale",
    goal: "Team Management",
    overallProgress: 45,
    sessionsCompleted: 3,
    totalSessions: 8,
    nextSession: "Thursday, 10:00 AM",
    joinedDate: "Apr 1, 2026",
    status: "active",
    rating: 4.6,
    skills: [
      { name: "1-on-1 Management", current: 55, target: 85 },
      { name: "Performance Reviews", current: 30, target: 80 },
      { name: "Team Culture", current: 60, target: 90 },
      { name: "Conflict Resolution", current: 35, target: 75 },
    ],
    recentSessions: [
      {
        id: 1,
        topic: "Management Fundamentals",
        date: "Apr 3",
        duration: "45 min",
        status: "completed",
        notes: "Good understanding of frameworks.",
      },
      {
        id: 2,
        topic: "Running 1-on-1s",
        date: "Apr 8",
        duration: "45 min",
        status: "completed",
      },
      {
        id: 3,
        topic: "Performance Frameworks",
        date: "Thursday",
        duration: "45 min",
        status: "upcoming",
      },
    ],
    lastNote:
      "Maria has solid instincts. Should focus on structured frameworks for difficult conversations in next session.",
  },
  {
    id: 3,
    name: "David Chen",
    image: "https://images.unsplash.com/photo-1543132220-7bc04a0e790a?w=200",
    title: "Junior Developer",
    company: "DesignFest",
    goal: "System Design & Architecture",
    overallProgress: 85,
    sessionsCompleted: 8,
    totalSessions: 8,
    nextSession: null,
    joinedDate: "Feb 10, 2026",
    status: "on-track",
    rating: 5.0,
    skills: [
      { name: "System Design", current: 85, target: 90 },
      { name: "Scalability", current: 80, target: 90 },
      { name: "Database Design", current: 90, target: 95 },
      { name: "API Architecture", current: 88, target: 95 },
    ],
    recentSessions: [
      {
        id: 1,
        topic: "Distributed Systems",
        date: "Apr 5",
        duration: "60 min",
        status: "completed",
        notes: "Excellent grasp of CAP theorem.",
      },
      {
        id: 2,
        topic: "Caching Strategies",
        date: "Apr 9",
        duration: "60 min",
        status: "completed",
      },
    ],
    lastNote:
      "David has nearly completed the curriculum. Recommend extending with real-world case studies.",
  },
  {
    id: 4,
    name: "Sarah Williams",
    image: "https://images.unsplash.com/photo-1762522921456-cdfe882d36c3?w=200",
    title: "UX Designer",
    company: "Mountain View Studio",
    goal: "Career Growth Strategy",
    overallProgress: 30,
    sessionsCompleted: 2,
    totalSessions: 6,
    nextSession: null,
    joinedDate: "Apr 8, 2026",
    status: "needs-attention",
    rating: 4.2,
    skills: [
      { name: "Portfolio Strategy", current: 40, target: 85 },
      { name: "Salary Negotiation", current: 20, target: 70 },
      { name: "Personal Branding", current: 35, target: 80 },
      { name: "Interview Skills", current: 30, target: 90 },
    ],
    recentSessions: [
      {
        id: 1,
        topic: "Career Assessment",
        date: "Apr 9",
        duration: "30 min",
        status: "completed",
        notes: "Needs more confidence in self-presentation.",
      },
      {
        id: 2,
        topic: "Goal Setting",
        date: "Apr 11",
        duration: "30 min",
        status: "completed",
      },
      {
        id: 3,
        topic: "Portfolio Review",
        date: "Apr 18",
        duration: "30 min",
        status: "upcoming",
      },
    ],
    lastNote:
      "Sarah missed scheduling the third session. Worth a proactive check-in message.",
  },
];

// ─── Sub-components ────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: Mentee["status"] }) {
  const map = {
    "on-track": {
      label: "On track",
      icon: CheckCircle,
      cls: "bg-green-50 text-green-700 border-green-200",
    },
    active: {
      label: "Active",
      icon: Zap,
      cls: "bg-blue-50 text-blue-700 border-blue-200",
    },
    "needs-attention": {
      label: "Needs attention",
      icon: AlertCircle,
      cls: "bg-amber-50 text-amber-700 border-amber-200",
    },
  };
  const { label, icon: Icon, cls } = map[status];
  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border ${cls}`}
    >
      <Icon className="w-3 h-3" />
      {label}
    </span>
  );
}

function SkillBar({ skill, delay }: { skill: Skill; delay: number }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs font-medium text-slate-600">{skill.name}</span>
        <span className="text-xs text-slate-500">
          <span className="font-semibold text-slate-800">{skill.current}%</span>
          <span className="text-slate-400"> / {skill.target}%</span>
        </span>
      </div>
      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
        {/* target ghost bar */}
        <div
          className="h-full bg-indigo-100 rounded-full absolute"
          style={{ width: `${skill.target}%` }}
        />
        <motion.div
          className="h-full bg-indigo-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${skill.current}%` }}
          transition={{ duration: 0.7, delay }}
        />
      </div>
    </div>
  );
}

function SessionRow({ session }: { session: Session }) {
  const statusMap: Record<SessionStatus, { cls: string; label: string }> = {
    completed: { cls: "bg-green-100 text-green-700", label: "Done" },
    upcoming: { cls: "bg-blue-100 text-blue-700", label: "Upcoming" },
    cancelled: { cls: "bg-slate-100 text-slate-500", label: "Cancelled" },
  };
  const { cls, label } = statusMap[session.status];
  return (
    <div className="flex items-start gap-3 py-2.5 border-b border-slate-50 last:border-0">
      <div className="mt-0.5 w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
        {session.status === "completed" ? (
          <CheckCircle className="w-3 h-3 text-indigo-600" />
        ) : (
          <Clock className="w-3 h-3 text-indigo-400" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="text-sm font-medium text-slate-800 truncate">
            {session.topic}
          </span>
          <span
            className={`text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0 ${cls}`}
          >
            {label}
          </span>
        </div>
        <div className="flex items-center gap-3 text-xs text-slate-500">
          <span>{session.date}</span>
          <span>·</span>
          <span>{session.duration}</span>
        </div>
        {session.notes && (
          <p className="text-xs text-slate-500 mt-1 italic">
            "{session.notes}"
          </p>
        )}
      </div>
    </div>
  );
}

function MenteeCard({
  mentee,
  openChat,
}: {
  mentee: Mentee;
  openChat: () => void;
}) {
  const [expanded, setExpanded] = useState(false);

  const progressColor =
    mentee.overallProgress >= 70
      ? "bg-green-500"
      : mentee.overallProgress >= 40
        ? "bg-indigo-500"
        : "bg-amber-500";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden"
    >
      {/* ── Card header ── */}
      <div className="p-6">
        <div className="flex items-start gap-4">
          {/* Avatar */}
          <div className="relative flex-shrink-0">
            <img
              src={mentee.image}
              alt={mentee.name}
              className="w-14 h-14 rounded-xl object-cover border-2 border-slate-100"
            />
            <div
              className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                mentee.status === "needs-attention"
                  ? "bg-amber-400"
                  : "bg-green-400"
              }`}
            />
          </div>

          {/* Name / role */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="text-base font-bold text-slate-900 leading-tight">
                  {mentee.name}
                </h3>
                <p className="text-sm text-slate-500 truncate">
                  {mentee.title} · {mentee.company}
                </p>
              </div>
              <StatusBadge status={mentee.status} />
            </div>

            {/* Goal */}
            <div className="flex items-center gap-1.5 mt-2">
              <Target className="w-3.5 h-3.5 text-indigo-500 flex-shrink-0" />
              <span className="text-xs text-slate-600 font-medium truncate">
                {mentee.goal}
              </span>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-4">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-medium text-slate-500">
              Overall progress
            </span>
            <span className="text-xs font-bold text-slate-700">
              {mentee.overallProgress}%
            </span>
          </div>
          <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
            <motion.div
              className={`h-full rounded-full ${progressColor}`}
              initial={{ width: 0 }}
              animate={{ width: `${mentee.overallProgress}%` }}
              transition={{ duration: 0.8 }}
            />
          </div>
        </div>

        {/* Quick stats row */}
        <div className="grid grid-cols-3 gap-3 mt-4">
          <div className="bg-slate-50 rounded-lg p-2.5 text-center">
            <div className="text-lg font-bold text-slate-900">
              {mentee.sessionsCompleted}
              <span className="text-xs text-slate-400 font-normal">
                /{mentee.totalSessions}
              </span>
            </div>
            <div className="text-xs text-slate-500 mt-0.5">Sessions</div>
          </div>
          <div className="bg-slate-50 rounded-lg p-2.5 text-center">
            <div className="text-lg font-bold text-slate-900 flex items-center justify-center gap-0.5">
              {mentee.rating}
              <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400 mb-0.5" />
            </div>
            <div className="text-xs text-slate-500 mt-0.5">Rating</div>
          </div>
          <div className="bg-slate-50 rounded-lg p-2.5 text-center">
            <div className="text-xs font-bold text-slate-900 leading-tight mt-0.5">
              {mentee.nextSession ? mentee.nextSession.split(",")[0] : "—"}
            </div>
            <div className="text-xs text-slate-500 mt-0.5">Next session</div>
          </div>
        </div>

        {/* Mentor note */}
        {mentee.lastNote && (
          <div className="mt-4 p-3 bg-indigo-50 border border-indigo-100 rounded-lg">
            <div className="flex items-center gap-1.5 mb-1">
              <BookOpen className="w-3.5 h-3.5 text-indigo-500" />
              <span className="text-xs font-semibold text-indigo-700">
                Your note
              </span>
            </div>
            <p className="text-xs text-indigo-800 leading-relaxed">
              {mentee.lastNote}
            </p>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex flex-wrap gap-2 mt-4">
          {mentee.nextSession ? (
            <button className="flex items-center gap-1.5 px-3.5 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 shadow-sm transition-colors">
              <Video className="w-4 h-4" />
              Join session
            </button>
          ) : (
            <Link
              to={`/book/${mentee.id}`}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 shadow-sm transition-colors"
            >
              <Calendar className="w-4 h-4" />
              Book session
            </Link>
          )}

          <button
            onClick={openChat}
            className="flex items-center gap-1.5 px-3.5 py-2 border-2 border-slate-200 text-slate-700 text-sm font-medium rounded-lg hover:border-indigo-300 hover:text-indigo-600 transition-colors"
          >
            <MessageSquare className="w-4 h-4" />
            Message
          </button>

          <Link
            to={`/mentee/${mentee.id}`}
            className="flex items-center gap-1.5 px-3.5 py-2 border-2 border-slate-200 text-slate-700 text-sm font-medium rounded-lg hover:border-indigo-300 hover:text-indigo-600 transition-colors"
          >
            <Users className="w-4 h-4" />
            View profile
          </Link>

          {/*<button
            onClick={() => setExpanded((v) => !v)}
            className="ml-auto flex items-center gap-1 px-3 py-2 text-slate-500 text-xs font-medium rounded-lg hover:bg-slate-50 transition-colors"
          >
            {expanded ? (
              <>
                Hide details <ChevronUp className="w-4 h-4" />
              </>
            ) : (
              <>
                More details <ChevronDown className="w-4 h-4" />
              </>
            )}
          </button>*/}
        </div>
      </div>

      {/* ── Expanded panel ── */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            key="expanded"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-slate-100"
          >
            <div className="grid md:grid-cols-2 gap-6 p-6 bg-slate-50/60">
              {/* Skills */}
              <div>
                <h4 className="text-sm font-bold text-slate-700 mb-3 flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-indigo-500" />
                  Skill development
                </h4>
                <div className="space-y-3 relative">
                  {mentee.skills.map((skill, i) => (
                    <SkillBar key={skill.name} skill={skill} delay={i * 0.1} />
                  ))}
                </div>
              </div>

              {/* Session history */}
              <div>
                <h4 className="text-sm font-bold text-slate-700 mb-3 flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-indigo-500" />
                  Session history
                </h4>
                <div className="bg-white rounded-xl border border-slate-200 px-4 py-2">
                  {mentee.recentSessions.map((s) => (
                    <SessionRow key={s.id} session={s} />
                  ))}
                </div>
              </div>
            </div>

            {/* Update progress CTA */}
            <div className="px-6 pb-5 bg-slate-50/60">
              <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border-2 border-dashed border-indigo-300 text-indigo-600 text-sm font-medium rounded-xl hover:bg-indigo-50 transition-colors">
                <Award className="w-4 h-4" />
                Update {mentee.name.split(" ")[0]}'s progress after session
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Main page ─────────────────────────────────────────────────────────────────

export function MyMentees() {
  const { openChat, ChatPortal } = useChatPanel();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | Mentee["status"]>("all");

  const filtered = mentees.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.goal.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "all" || m.status === filter;
    return matchesSearch && matchesFilter;
  });

  const totalSessions = mentees.reduce((a, m) => a + m.sessionsCompleted, 0);
  const avgProgress = Math.round(
    mentees.reduce((a, m) => a + m.overallProgress, 0) / mentees.length,
  );
  const needsAttention = mentees.filter(
    (m) => m.status === "needs-attention",
  ).length;

  return (
    <div className="min-h-screen bg-background">
      {/* ── Nav ── */}
      <nav className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-8">
              <Link to="/" className="flex items-center gap-2">
                <Users className="w-6 h-6 text-indigo-600" />
                <span className="text-lg font-bold text-slate-900">
                  MentorMatch
                </span>
              </Link>
              <div className="hidden md:flex items-center gap-6">
                <Link
                  to="/mentor-dashboard"
                  className="text-slate-600 hover:text-slate-900"
                >
                  Dashboard
                </Link>
                <Link to="/my-mentees" className="text-indigo-600 font-medium">
                  My Mentees
                </Link>
                <Link
                  to="/resources"
                  className="text-slate-600 hover:text-slate-900"
                >
                  Resources
                </Link>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => openChat()}
                className="p-2 text-slate-600 hover:text-slate-900 relative"
              >
                <MessageSquare className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>
              <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                SC
              </div>
            </div>
          </div>
          <ChatPortal />
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* ── Page header ── */}
        <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-1">
              My Mentees
            </h1>
            <p className="text-slate-600">
              Track each mentee's progress toward their goals
            </p>
          </div>
          <Link
            to="/mentor-dashboard"
            className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 shadow-sm transition-colors"
          >
            Review new requests
          </Link>
        </div>

        {/* ── Summary stats ── */}
        <div className="grid sm:grid-cols-4 gap-4 mb-8">
          {[
            {
              label: "Active mentees",
              value: mentees.length,
              icon: Users,
              color: "text-indigo-600",
              bg: "bg-indigo-50",
            },
            {
              label: "Total sessions",
              value: totalSessions,
              icon: Calendar,
              color: "text-blue-600",
              bg: "bg-blue-50",
            },
            {
              label: "Avg. progress",
              value: `${avgProgress}%`,
              icon: TrendingUp,
              color: "text-green-600",
              bg: "bg-green-50",
            },
            {
              label: "Need attention",
              value: needsAttention,
              icon: AlertCircle,
              color: "text-amber-600",
              bg: "bg-amber-50",
            },
          ].map(({ label, value, icon: Icon, color, bg }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 flex items-center gap-4"
            >
              <div
                className={`w-10 h-10 ${bg} rounded-lg flex items-center justify-center flex-shrink-0`}
              >
                <Icon className={`w-5 h-5 ${color}`} />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900">{value}</div>
                <div className="text-xs text-slate-500 mt-0.5">{label}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Search & filter ── */}
        <div className="flex flex-wrap gap-3 mb-6">
          <div className="relative flex-1 min-w-48">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search mentees or goals…"
              className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400" />
            {(["all", "on-track", "active", "needs-attention"] as const).map(
              (f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                    filter === f
                      ? "bg-indigo-600 text-white shadow-sm"
                      : "bg-white border border-slate-200 text-slate-600 hover:border-indigo-300"
                  }`}
                >
                  {f === "all"
                    ? "All"
                    : f === "on-track"
                      ? "On track"
                      : f === "active"
                        ? "Active"
                        : "Needs attention"}
                </button>
              ),
            )}
          </div>
        </div>

        {/* ── Mentee cards ── */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-slate-400">
            <Users className="w-10 h-10 mx-auto mb-3 opacity-40" />
            <p className="font-medium">No mentees match your search</p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-6">
            {filtered.map((mentee) => (
              <MenteeCard key={mentee.id} mentee={mentee} openChat={openChat} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
