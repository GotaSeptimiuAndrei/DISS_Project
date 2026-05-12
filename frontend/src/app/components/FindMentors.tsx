import { useState } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { Users, Search, Filter, Star, MapPin, Briefcase } from "lucide-react";

export function FindMentors() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const mentors = [
    {
      id: 1,
      name: "Dr. Sarah Chen",
      title: "Chief Technology Officer",
      company: "Amazon",
      location: "San Francisco, CA",
      expertise: ["Leadership", "Tech Strategy", "Career Growth"],
      rating: 4.9,
      sessions: 234,
      matchScore: 95,
      hourlyRate: "Free",
      availability: "Available this week",
      image: "https://images.unsplash.com/photo-1762522921456-cdfe882d36c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHByb2Zlc3Npb25hbCUyMHdvbWFuJTIwaGVhZHNob3R8ZW58MXx8fHwxNzc1NDcwOTI5fDA&ixlib=rb-4.1.0&q=80&w=400",
      bio: "Former VP of Engineering with 15+ years of experience in scaling tech teams and products."
    },
    {
      id: 2,
      name: "Marcus Williams",
      title: "Senior Product Manager",
      company: "Amazon",
      location: "Seattle, WA",
      expertise: ["Product Strategy", "Data Analysis", "UX Research"],
      rating: 4.8,
      sessions: 189,
      matchScore: 92,
      hourlyRate: "Free",
      availability: "Available next week",
      image: "https://images.unsplash.com/photo-1543132220-7bc04a0e790a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBidXNpbmVzcyUyMHByb2Zlc3Npb25hbCUyMHBvcnRyYWl0fGVufDF8fHx8MTc3NTU0OTA0OXww&ixlib=rb-4.1.0&q=80&w=400",
      bio: "Product leader passionate about helping aspiring PMs navigate their career journey."
    },
    {
      id: 3,
      name: "James Park",
      title: "Senior Software Architect",
      company: "Amazon",
      location: "Mountain View, CA",
      expertise: ["System Design", "Technical Leadership", "Cloud Architecture"],
      rating: 4.9,
      sessions: 127,
      matchScore: 88,
      hourlyRate: "Free",
      availability: "Available this week",
      image: "https://images.unsplash.com/photo-1706025090996-63717544be2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMG1hbiUyMHByb2Zlc3Npb25hbCUyMGhlYWRzaG90fGVufDF8fHx8MTc3NTQ2NTQ0N3ww&ixlib=rb-4.1.0&q=80&w=400",
      bio: "Architect with expertise in large-scale distributed systems and mentoring junior engineers."
    },
    {
      id: 4,
      name: "Angela Rodriguez",
      title: "VP of Product",
      company: "Amazon",
      location: "Redmond, WA",
      expertise: ["Product Management", "Strategy", "Team Building"],
      rating: 4.8,
      sessions: 89,
      matchScore: 90,
      hourlyRate: "Free",
      availability: "Available in 2 weeks",
      image: "https://images.unsplash.com/photo-1652471949169-9c587e8898cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMHdvbWFuJTIwYnVzaW5lc3MlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzc1NTQ5MTc3fDA&ixlib=rb-4.1.0&q=80&w=400",
      bio: "Product executive helping mentees develop strategic thinking and leadership skills."
    },
    {
      id: 5,
      name: "David Martinez",
      title: "Director of Engineering",
      company: "Amazon",
      location: "Austin, TX",
      expertise: ["Team Leadership", "Career Growth", "Engineering Excellence"],
      rating: 4.9,
      sessions: 156,
      matchScore: 87,
      hourlyRate: "Free",
      availability: "Available this week",
      image: "https://images.unsplash.com/photo-1648757766966-43d24bf7a264?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXRpbm8lMjBtYW4lMjBidXNpbmVzcyUyMHBvcnRyYWl0fGVufDF8fHx8MTc3NTU0OTE3N3ww&ixlib=rb-4.1.0&q=80&w=400",
      bio: "Engineering leader with a passion for developing the next generation of technical leaders."
    },
    {
      id: 6,
      name: "Jennifer Thompson",
      title: "Head of Design",
      company: "Amazon",
      location: "San Francisco, CA",
      expertise: ["UX Design", "Design Systems", "Creative Leadership"],
      rating: 4.9,
      sessions: 112,
      matchScore: 85,
      hourlyRate: "Free",
      availability: "Available next week",
      image: "https://images.unsplash.com/photo-1770058428154-9eee8a6a1fbb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaWRkbGUlMjBhZ2VkJTIwd29tYW4lMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzc1NTQ5MTc4fDA&ixlib=rb-4.1.0&q=80&w=400",
      bio: "Design leader committed to mentoring designers at all career stages."
    }
  ];

  const filters = [
    { id: "all", label: "All Mentors" },
    { id: "high-match", label: "Top Matches" },
    { id: "available", label: "Available This Week" },
    { id: "popular", label: "Most Popular" }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-8">
              <Link to="/" className="flex items-center gap-2">
                <Users className="w-6 h-6 text-blue-600" />
                <span className="text-lg font-bold text-slate-900">MentorMatch</span>
              </Link>
              <div className="hidden md:flex items-center gap-6">
                <Link to="/dashboard" className="text-slate-600 hover:text-slate-900">
                  Dashboard
                </Link>
                <Link to="/find-mentors" className="text-blue-600 font-medium">
                  Find Mentors
                </Link>
                <Link to="/my-mentors" className="text-slate-600 hover:text-slate-900">
                  My Mentors
                </Link>
                <Link to="/progress" className="text-slate-600 hover:text-slate-900">
                  Progress
                </Link>
              </div>
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
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Find Your Perfect Mentor
          </h1>
          <p className="text-slate-600">
            Discover experienced professionals matched to your goals and learning style
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, expertise, or company..."
              className="w-full pl-12 pr-4 py-4 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 placeholder-slate-500"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedFilter === filter.id
                    ? "bg-blue-600 text-white"
                    : "bg-white text-slate-700 border border-slate-300 hover:border-blue-300"
                }`}
              >
                {filter.label}
              </button>
            ))}
            <button className="px-4 py-2 rounded-lg font-medium bg-white text-slate-700 border border-slate-300 hover:border-blue-300 flex items-center gap-2">
              <Filter className="w-4 h-4" />
              More Filters
            </button>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-slate-600">
            Showing <span className="font-semibold text-slate-900">{mentors.length}</span> mentors
          </p>
        </div>

        {/* Mentor Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mentors.map((mentor, index) => (
            <motion.div
              key={mentor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to={`/mentor/${mentor.id}`}
                className="block bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-lg hover:border-blue-300 transition-all"
              >
                {/* Match Score Badge */}
                <div className="relative">
                  <img
                    src={mentor.image}
                    alt={mentor.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-3 right-3 px-3 py-1 bg-green-500 text-white rounded-full text-sm font-semibold">
                    {mentor.matchScore}% Match
                  </div>
                </div>

                <div className="p-5">
                  {/* Name and Title */}
                  <h3 className="text-lg font-bold text-slate-900 mb-1">
                    {mentor.name}
                  </h3>
                  <p className="text-sm text-slate-600 mb-1">{mentor.title}</p>
                  
                  {/* Company and Location */}
                  <div className="flex items-center gap-4 text-xs text-slate-500 mb-3">
                    <div className="flex items-center gap-1">
                      <Briefcase className="w-3 h-3" />
                      <span>{mentor.company}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      <span>{mentor.location.split(',')[0]}</span>
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-sm text-slate-600 mb-3 line-clamp-2">
                    {mentor.bio}
                  </p>

                  {/* Expertise Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {mentor.expertise.slice(0, 2).map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                    {mentor.expertise.length > 2 && (
                      <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs font-medium">
                        +{mentor.expertise.length - 2}
                      </span>
                    )}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                    <div className="flex items-center gap-1 text-sm">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold text-slate-900">{mentor.rating}</span>
                      <span className="text-slate-600">({mentor.sessions})</span>
                    </div>
                    <span className="text-sm text-green-600 font-medium">
                      {mentor.availability}
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
