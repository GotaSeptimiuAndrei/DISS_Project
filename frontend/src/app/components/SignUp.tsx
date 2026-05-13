import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { motion } from "motion/react";
import { Users, GraduationCap, Briefcase } from "lucide-react";

export function SignUp() {
  const [role, setRole] = useState<"mentee" | "mentor" | null>(null);
  const navigate = useNavigate();

  const handleRoleSelection = (selectedRole: "mentee" | "mentor") => {
    setRole(selectedRole);
    setTimeout(() => {
      navigate(selectedRole === "mentee" ? "/onboarding/mentee" : "/onboarding/mentor");
    }, 500);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <Link to="/" className="inline-flex items-center gap-2 mb-8 group">
            <Users className="w-8 h-8 text-blue-600 group-hover:scale-110 transition-transform" />
            <span className="text-2xl font-bold text-slate-900">
              MentorMatch
            </span>
          </Link>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Welcome! How would you like to get started?
          </h1>
          <p className="text-xl text-slate-600">
            Choose your role to begin your journey
          </p>
        </div>

        {/* Role Selection Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <motion.button
            onClick={() => handleRoleSelection("mentee")}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`p-8 rounded-2xl border-2 text-left transition-all ${
              role === "mentee"
                ? "border-blue-600 bg-blue-50"
                : "border-slate-200 bg-white hover:border-blue-300 shadow-lg"
            }`}
          >
            <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
              <GraduationCap className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">
              I'm a Mentee
            </h2>
            <p className="text-slate-600 mb-4">
              I want to learn from experienced professionals and grow my skills
            </p>
            <ul className="space-y-2 text-sm text-slate-600">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">✓</span>
                <span>Find mentors matched to your goals</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">✓</span>
                <span>Book 1-on-1 guidance sessions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">✓</span>
                <span>Track your progress and achievements</span>
              </li>
            </ul>
          </motion.button>

          <motion.button
            onClick={() => handleRoleSelection("mentor")}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`p-8 rounded-2xl border-2 text-left transition-all ${
              role === "mentor"
                ? "border-indigo-600 bg-indigo-50"
                : "border-slate-200 bg-white hover:border-indigo-300 shadow-lg"
            }`}
          >
            <div className="w-16 h-16 bg-indigo-100 rounded-xl flex items-center justify-center mb-6">
              <Briefcase className="w-8 h-8 text-indigo-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">
              I'm a Mentor
            </h2>
            <p className="text-slate-600 mb-4">
              I want to share my expertise and help others succeed
            </p>
            <ul className="space-y-2 text-sm text-slate-600">
              <li className="flex items-start gap-2">
                <span className="text-indigo-600 mt-0.5">✓</span>
                <span>Connect with motivated learners</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-600 mt-0.5">✓</span>
                <span>Set your own availability and schedule</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-600 mt-0.5">✓</span>
                <span>Make an impact on others' careers</span>
              </li>
            </ul>
          </motion.button>
        </div>

        <div className="text-center text-sm text-slate-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
