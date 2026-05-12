import { Link } from "react-router";
import { motion } from "motion/react";
import { 
  Users, 
  Calendar, 
  Star, 
  TrendingUp, 
  Clock,
  MessageSquare,
  Award,
  CheckCircle,
  Video
} from "lucide-react";

export function MentorDashboard() {
  const upcomingSessions = [
    {
      id: 1,
      mentee: "Alex Johnson",
      menteeImage: "https://images.unsplash.com/photo-1706025090996-63717544be2d?w=100",
      topic: "Career Transition Strategy",
      date: "Tomorrow",
      time: "2:00 PM - 3:00 PM",
      type: "video",
      isFirstSession: false
    },
    {
      id: 2,
      mentee: "Maria Garcia",
      menteeImage: "https://images.unsplash.com/photo-1652471949169-9c587e8898cd?w=100",
      topic: "Leadership Development",
      date: "Thursday",
      time: "10:00 AM - 11:00 AM",
      type: "video",
      isFirstSession: true
    },
    {
      id: 3,
      mentee: "David Chen",
      menteeImage: "https://images.unsplash.com/photo-1543132220-7bc04a0e790a?w=100",
      topic: "Technical Skills Guidance",
      date: "Friday",
      time: "3:00 PM - 4:00 PM",
      type: "chat",
      isFirstSession: false
    }
  ];

  const activeMentees = [
    {
      id: 1,
      name: "Alex Johnson",
      image: "https://images.unsplash.com/photo-1706025090996-63717544be2d?w=100",
      goal: "Software Engineering Leadership",
      sessionsCompleted: 6,
      progress: 75,
      nextSession: "Tomorrow, 2:00 PM"
    },
    {
      id: 2,
      name: "Maria Garcia",
      image: "https://images.unsplash.com/photo-1652471949169-9c587e8898cd?w=100",
      goal: "Team Management",
      sessionsCompleted: 3,
      progress: 45,
      nextSession: "Thursday, 10:00 AM"
    },
    {
      id: 3,
      name: "David Chen",
      image: "https://images.unsplash.com/photo-1543132220-7bc04a0e790a?w=100",
      goal: "System Design & Architecture",
      sessionsCompleted: 8,
      progress: 85,
      nextSession: "Friday, 3:00 PM"
    },
    {
      id: 4,
      name: "Sarah Williams",
      image: "https://images.unsplash.com/photo-1762522921456-cdfe882d36c3?w=100",
      goal: "Career Growth Strategy",
      sessionsCompleted: 4,
      progress: 55,
      nextSession: "Next Monday"
    }
  ];

  const recentFeedback = [
    {
      id: 1,
      mentee: "Alex Johnson",
      rating: 5,
      comment: "Incredible session! Sarah's insights on leadership transitions were exactly what I needed.",
      date: "2 days ago"
    },
    {
      id: 2,
      mentee: "David Chen",
      rating: 5,
      comment: "Very helpful system design guidance. Practical examples made complex concepts clear.",
      date: "1 week ago"
    }
  ];

  const pendingRequests = [
    {
      id: 1,
      name: "Emily Rodriguez",
      image: "https://images.unsplash.com/photo-1765648684613-b77086065bc1?w=100",
      goal: "Product Management Transition",
      matchScore: 95,
      message: "I'm transitioning from engineering to product management and would love your guidance..."
    },
    {
      id: 2,
      name: "Michael Thompson",
      image: "https://images.unsplash.com/photo-1648757766966-43d24bf7a264?w=100",
      goal: "Engineering Leadership",
      matchScore: 88,
      message: "Looking to develop leadership skills to move into a management role..."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-8">
              <Link to="/" className="flex items-center gap-2">
                <Users className="w-6 h-6 text-indigo-600" />
                <span className="text-lg font-bold text-slate-900">MentorMatch</span>
              </Link>
              <div className="hidden md:flex items-center gap-6">
                <Link to="/mentor-dashboard" className="text-indigo-600 font-medium">
                  Dashboard
                </Link>
                <Link to="/mentor-dashboard" className="text-slate-600 hover:text-slate-900">
                  My Mentees
                </Link>
                <Link to="/mentor-dashboard" className="text-slate-600 hover:text-slate-900">
                  Availability
                </Link>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 text-slate-600 hover:text-slate-900 relative">
                <MessageSquare className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>
              <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                SC
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Welcome back, Dr. Chen! 👋
          </h1>
          <p className="text-slate-600">
            You have 3 sessions scheduled this week
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-xl shadow-sm border border-slate-200"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-600 text-sm">Total Sessions</span>
              <Calendar className="w-5 h-5 text-indigo-600" />
            </div>
            <div className="text-3xl font-bold text-slate-900">234</div>
            <div className="text-sm text-green-600 mt-1">+12 this month</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-6 rounded-xl shadow-sm border border-slate-200"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-600 text-sm">Active Mentees</span>
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <div className="text-3xl font-bold text-slate-900">{activeMentees.length}</div>
            <div className="text-sm text-slate-600 mt-1">Currently mentoring</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-6 rounded-xl shadow-sm border border-slate-200"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-600 text-sm">Average Rating</span>
              <Star className="w-5 h-5 text-yellow-600" />
            </div>
            <div className="text-3xl font-bold text-slate-900">4.9</div>
            <div className="text-sm text-slate-600 mt-1">From 234 reviews</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white p-6 rounded-xl shadow-sm border border-slate-200"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-600 text-sm">Impact Hours</span>
              <Clock className="w-5 h-5 text-green-600" />
            </div>
            <div className="text-3xl font-bold text-slate-900">195</div>
            <div className="text-sm text-green-600 mt-1">Hours of mentoring</div>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Upcoming Sessions */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-900">Upcoming Sessions</h2>
                <Link to="#" className="text-indigo-600 text-sm font-medium hover:underline">
                  View calendar
                </Link>
              </div>
              <div className="space-y-4">
                {upcomingSessions.map((session) => (
                  <div
                    key={session.id}
                    className="flex items-center gap-4 p-4 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors"
                  >
                    <img
                      src={session.menteeImage}
                      alt={session.mentee}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-slate-900">{session.mentee}</span>
                        {session.isFirstSession && (
                          <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                            First Session
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-slate-600">{session.topic}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-slate-900">{session.date}</div>
                      <div className="text-sm text-slate-600">{session.time}</div>
                    </div>
                    <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 flex items-center gap-2">
                      <Video className="w-4 h-4" />
                      Join
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Active Mentees */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-900">Active Mentees</h2>
                <Link to="#" className="text-indigo-600 text-sm font-medium hover:underline">
                  View all
                </Link>
              </div>
              <div className="grid gap-4">
                {activeMentees.map((mentee) => (
                  <div
                    key={mentee.id}
                    className="p-4 rounded-lg border border-slate-200 hover:border-indigo-300 transition-colors"
                  >
                    <div className="flex items-start gap-4 mb-3">
                      <img
                        src={mentee.image}
                        alt={mentee.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="font-semibold text-slate-900">{mentee.name}</div>
                        <div className="text-sm text-slate-600">{mentee.goal}</div>
                        <div className="text-xs text-slate-500 mt-1">
                          {mentee.sessionsCompleted} sessions • Next: {mentee.nextSession}
                        </div>
                      </div>
                      <button className="text-slate-600 hover:text-slate-900">
                        <MessageSquare className="w-5 h-5" />
                      </button>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-slate-600">Progress</span>
                        <span className="text-sm font-semibold text-slate-900">{mentee.progress}%</span>
                      </div>
                      <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-indigo-600"
                          initial={{ width: 0 }}
                          animate={{ width: `${mentee.progress}%` }}
                          transition={{ duration: 0.8 }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Feedback */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-xl font-bold text-slate-900 mb-6">Recent Feedback</h2>
              <div className="space-y-4">
                {recentFeedback.map((feedback) => (
                  <div key={feedback.id} className="pb-4 border-b border-slate-200 last:border-0 last:pb-0">
                    <div className="flex items-start justify-between mb-2">
                      <div className="font-semibold text-slate-900">{feedback.mentee}</div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-slate-600 text-sm mb-2">"{feedback.comment}"</p>
                    <div className="text-xs text-slate-500">{feedback.date}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Pending Requests */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4">
                New Requests ({pendingRequests.length})
              </h3>
              <div className="space-y-4">
                {pendingRequests.map((request) => (
                  <div key={request.id} className="p-4 rounded-lg bg-indigo-50 border border-indigo-200">
                    <div className="flex items-start gap-3 mb-3">
                      <img
                        src={request.image}
                        alt={request.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="font-semibold text-slate-900 text-sm">{request.name}</div>
                        <div className="text-xs text-slate-600">{request.goal}</div>
                        <div className="flex items-center gap-1 mt-1">
                          <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                            {request.matchScore}% match
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-slate-600 mb-3 line-clamp-2">{request.message}</p>
                    <div className="flex gap-2">
                      <button className="flex-1 px-3 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700">
                        Accept
                      </button>
                      <button className="px-3 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg text-sm font-medium hover:border-indigo-300">
                        View
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Impact Stats */}
            <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-xl shadow-lg p-6 text-white">
              <Award className="w-10 h-10 mb-4" />
              <h3 className="text-lg font-bold mb-2">Your Impact</h3>
              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-indigo-100 text-sm">Mentees helped</span>
                  <span className="font-bold text-xl">47</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-indigo-100 text-sm">Goals achieved</span>
                  <span className="font-bold text-xl">32</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-indigo-100 text-sm">Success rate</span>
                  <span className="font-bold text-xl">98%</span>
                </div>
              </div>
              <div className="pt-4 border-t border-indigo-400">
                <p className="text-indigo-100 text-sm">
                  You're in the top 5% of mentors on the platform! 🎉
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <button className="w-full px-4 py-3 bg-indigo-50 text-indigo-700 rounded-lg font-medium hover:bg-indigo-100 transition-colors flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Update Availability
                </button>
                <button className="w-full px-4 py-3 bg-slate-50 text-slate-700 rounded-lg font-medium hover:bg-slate-100 transition-colors flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  View All Mentees
                </button>
                <button className="w-full px-4 py-3 bg-slate-50 text-slate-700 rounded-lg font-medium hover:bg-slate-100 transition-colors flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  View Analytics
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
