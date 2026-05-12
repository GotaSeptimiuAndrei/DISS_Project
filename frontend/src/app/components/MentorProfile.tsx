import { Link, useParams } from "react-router";
import { motion } from "motion/react";
import {
  Users,
  ArrowLeft,
  Star,
  Calendar,
  MapPin,
  Briefcase,
  Award,
  MessageSquare,
  Video,
  CheckCircle,
} from "lucide-react";
import { useChatPanel } from "./ChatPanel";

export function MentorProfile() {
  const { id } = useParams();

  const { openChat, ChatPortal } = useChatPanel();

  // Mock data - in real app, fetch based on id
  const mentor = {
    name: "Dr. Sarah Chen",
    title: "Chief Technology Officer",
    company: "Amazon",
    location: "San Francisco, CA",
    rating: 4.9,
    reviewCount: 234,
    sessionsCompleted: 234,
    responseTime: "Within 2 hours",
    image:
      "https://images.unsplash.com/photo-1762522921456-cdfe882d36c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHByb2Zlc3Npb25hbCUyMHdvbWFuJTIwaGVhZHNob3R8ZW58MXx8fHwxNzc1NDcwOTI5fDA&ixlib=rb-4.1.0&q=80&w=800",
    bio: "Seasoned technology executive with 15+ years of experience leading engineering teams at scale at Amazon. Passionate about helping early-career professionals navigate the complexities of technical leadership and career growth.",
    expertise: [
      "Leadership Development",
      "Tech Strategy",
      "Career Growth",
      "Team Building",
      "System Design",
      "Engineering Management",
    ],
    experience: [
      {
        title: "Chief Technology Officer",
        company: "Amazon",
        period: "2020 - Present",
        description:
          "Leading global engineering organization of 500+ engineers",
      },
      {
        title: "VP of Engineering",
        company: "Amazon",
        period: "2017 - 2020",
        description: "Built and scaled payments infrastructure team",
      },
      {
        title: "Senior Engineering Manager",
        company: "Amazon",
        period: "2012 - 2017",
        description: "Led multiple product engineering teams",
      },
    ],
    education: [
      {
        degree: "Ph.D. in Computer Science",
        school: "Stanford University",
        year: "2012",
      },
      {
        degree: "B.S. in Computer Engineering",
        school: "MIT",
        year: "2006",
      },
    ],
    reviews: [
      {
        name: "Alex Johnson",
        role: "Software Engineer",
        rating: 5,
        date: "2 weeks ago",
        text: "Dr. Chen provided invaluable guidance on transitioning into a leadership role. Her insights were practical and immediately applicable.",
        avatar:
          "https://images.unsplash.com/photo-1706025090996-63717544be2d?w=100",
      },
      {
        name: "Maria Garcia",
        role: "Engineering Manager",
        rating: 5,
        date: "1 month ago",
        text: "Amazing mentor! Her experience in scaling teams helped me navigate challenges in my new role.",
        avatar:
          "https://images.unsplash.com/photo-1652471949169-9c587e8898cd?w=100",
      },
    ],
    availability: [
      { day: "Monday", slots: ["2:00 PM", "4:00 PM"] },
      { day: "Wednesday", slots: ["10:00 AM", "3:00 PM"] },
      { day: "Friday", slots: ["1:00 PM", "5:00 PM"] },
    ],
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-8">
              <Link to="/" className="flex items-center gap-2">
                <Users className="w-6 h-6 text-blue-600" />
                <span className="text-lg font-bold text-slate-900">
                  MentorMatch
                </span>
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                JD
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link
          to="/find-mentors"
          className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to search
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden"
            >
              <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-700" />
              <div className="px-8 pb-8">
                <div className="flex flex-col sm:flex-row items-start gap-6">
                  <img
                    src={mentor.image}
                    alt={mentor.name}
                    className="w-32 h-32 -mt-16 shrink-0 rounded-xl object-cover border-4 border-white shadow-lg"
                  />
                  <div className="flex-1 pt-0 sm:pt-2">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h1 className="text-3xl font-bold text-slate-900 mb-1">
                          {mentor.name}
                        </h1>
                        <p className="text-lg text-slate-600 mb-2">
                          {mentor.title}
                        </p>
                        <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                          <div className="flex items-center gap-1">
                            <Briefcase className="w-4 h-4" />
                            <span>{mentor.company}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span>{mentor.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 mt-4">
                      <div className="flex items-center gap-1">
                        <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        <span className="font-bold text-slate-900">
                          {mentor.rating}
                        </span>
                        <span className="text-slate-600">
                          ({mentor.reviewCount} reviews)
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-slate-600">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span>{mentor.sessionsCompleted} sessions</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* About */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl shadow-sm border border-slate-200 p-6"
            >
              <h2 className="text-xl font-bold text-slate-900 mb-4">About</h2>
              <p className="text-slate-600 leading-relaxed">{mentor.bio}</p>
            </motion.div>

            {/* Expertise */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-sm border border-slate-200 p-6"
            >
              <h2 className="text-xl font-bold text-slate-900 mb-4">
                Areas of Expertise
              </h2>
              <div className="flex flex-wrap gap-2">
                {mentor.expertise.map((skill, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Experience */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl shadow-sm border border-slate-200 p-6"
            >
              <h2 className="text-xl font-bold text-slate-900 mb-4">
                Experience
              </h2>
              <div className="space-y-6">
                {mentor.experience.map((exp, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Briefcase className="w-6 h-6 text-blue-600" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900">
                        {exp.title}
                      </h3>
                      <p className="text-sm text-slate-600">{exp.company}</p>
                      <p className="text-sm text-slate-500 mb-2">
                        {exp.period}
                      </p>
                      <p className="text-sm text-slate-600">
                        {exp.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Education */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-xl shadow-sm border border-slate-200 p-6"
            >
              <h2 className="text-xl font-bold text-slate-900 mb-4">
                Education
              </h2>
              <div className="space-y-4">
                {mentor.education.map((edu, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                        <Award className="w-6 h-6 text-indigo-600" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900">
                        {edu.degree}
                      </h3>
                      <p className="text-sm text-slate-600">{edu.school}</p>
                      <p className="text-sm text-slate-500">{edu.year}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Reviews */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-xl shadow-sm border border-slate-200 p-6"
            >
              <h2 className="text-xl font-bold text-slate-900 mb-6">Reviews</h2>
              <div className="space-y-6">
                {mentor.reviews.map((review, index) => (
                  <div
                    key={index}
                    className="pb-6 border-b border-slate-200 last:border-0 last:pb-0"
                  >
                    <div className="flex items-start gap-4">
                      <img
                        src={review.avatar}
                        alt={review.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <div className="font-semibold text-slate-900">
                              {review.name}
                            </div>
                            <div className="text-sm text-slate-600">
                              {review.role}
                            </div>
                          </div>
                          <div className="text-sm text-slate-500">
                            {review.date}
                          </div>
                        </div>
                        <div className="flex items-center gap-1 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-4 h-4 fill-yellow-400 text-yellow-400"
                            />
                          ))}
                        </div>
                        <p className="text-slate-600">{review.text}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Booking Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-lg border border-slate-200 p-6 sticky top-8"
            >
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-slate-900 mb-2">
                  Free
                </div>
                <p className="text-sm text-slate-600">
                  Sessions offered on volunteer basis
                </p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3 text-sm">
                  <Video className="w-5 h-5 text-blue-600" />
                  <span className="text-slate-600">
                    Video sessions available
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <MessageSquare className="w-5 h-5 text-blue-600" />
                  <span className="text-slate-600">
                    Responds {mentor.responseTime}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <span className="text-slate-600">Flexible scheduling</span>
                </div>
              </div>

              <Link
                to={`/book/${id}`}
                className="block w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-medium text-center hover:bg-blue-700 transition-colors mb-3"
              >
                Book a Session
              </Link>

              <button
                onClick={() => openChat()}
                className="w-full px-6 py-3 bg-white text-blue-600 border-2 border-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors"
              >
                Send Message
              </button>
              <ChatPortal />

              {/* Quick Stats */}
              <div className="mt-6 pt-6 border-t border-slate-200">
                <h3 className="font-semibold text-slate-900 mb-3">
                  Why mentees choose Sarah
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Response rate</span>
                    <span className="font-semibold text-slate-900">100%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Avg. response time</span>
                    <span className="font-semibold text-slate-900">
                      2 hours
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Completion rate</span>
                    <span className="font-semibold text-slate-900">98%</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
