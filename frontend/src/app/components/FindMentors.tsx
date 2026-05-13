import { useState, useEffect } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { Users, Search, Filter, Star, MapPin, Briefcase, Loader2 } from "lucide-react";

// Matches the data structure from our Spring Boot API + our UI mock fields
interface Mentor {
  id: number;
  name: string;
  title: string;
  company: string;
  rating: number;
  sessions: number; // mapped from reviewCount
  bio: string;      // mapped from profileBio
  expertise: string[]; // mapped from skills
  image: string;
  matchScore: number;
  location: string;
  availability: string;
}

export function FindMentors() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [loading, setLoading] = useState(true);

  const filters = [
    { id: "all", label: "All Mentors" },
    { id: "high-match", label: "Top Matches" },
    { id: "available", label: "Available This Week" },
    { id: "popular", label: "Most Popular" }
  ];

  const imageUrls = [
    "https://images.unsplash.com/photo-1762522921456-cdfe882d36c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHByb2Zlc3Npb25hbCUyMHdvbWFuJTIwaGVhZHNob3R8ZW58MXx8fHwxNzc1NDcwOTI5fDA&ixlib=rb-4.1.0&q=80&w=400",
    "https://images.unsplash.com/photo-1652471949169-9c587e8898cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMHdvbWFuJTIwYnVzaW5lc3MlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzc1NTQ5MTc3fDA&ixlib=rb-4.1.0&q=80&w=400",
    "https://images.unsplash.com/photo-1770058428154-9eee8a6a1fbb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaWRkbGUlMjBhZ2VkJTIwd29tYW4lMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzc1NTQ5MTc3fDA&ixlib=rb-4.1.0&q=80&w=400",
    "https://images.unsplash.com/photo-1543132220-7bc04a0e790a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBidXNpbmVzcyUyMHByb2Zlc3Npb25hbCUyMHBvcnRyYWl0fGVufDF8fHx8MTc3NTU0OTA0OXww&ixlib=rb-4.1.0&q=80&w=400",
    "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZW50b3J8ZW58MXx8fHwxNzc1NTQ5MTc3fDA&ixlib=rb-4.1.0&q=80&w=400",
  ];

  useEffect(() => {
    // Build query for skills if we implement the backend filter later
    // fetch(`http://localhost:8080/api/mentors?skill=${searchQuery}`)
    fetch("http://localhost:8080/api/mentors")
      .then((res) => res.json())
      .then((data) => {
        // Map the backend DTO to match our UI expectations and add mock data for missing fields
        const populatedData = data.map((m: any, index: number) => ({
          id: m.id,
          name: m.name,
          title: m.title,
          company: m.company,
          rating: m.rating || 4.8,
          sessions: m.reviewCount || 15,
          bio:
            m.profileBio ||
            "Experienced professional passionate about mentoring.",
          expertise: m.skills || [],
          // Mocking the fields the backend DTO doesn't have yet:
          image: imageUrls[index],
          matchScore: Math.floor(Math.random() * 20) + 80, // Generates a random score between 80-99%
          location: "Cluj-Napoca, RO",
          availability: "Available this week",
        }));

        setMentors(populatedData);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch mentors:", err);
        setLoading(false);
      });
  }, []);

  return (
    // Removed bg-background so it inherits the beautiful light blue gradient from Root.tsx
    <div className="min-h-screen">
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
                AI {/* Initials for Alex Ionescu */}
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
              className="w-full pl-12 pr-4 py-4 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 placeholder-slate-500 shadow-sm"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedFilter === filter.id
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-white text-slate-700 border border-slate-300 hover:border-blue-300 shadow-sm"
                }`}
              >
                {filter.label}
              </button>
            ))}
            <button className="px-4 py-2 rounded-lg font-medium bg-white text-slate-700 border border-slate-300 hover:border-blue-300 flex items-center gap-2 shadow-sm">
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

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
            <span className="ml-3 text-slate-600 font-medium">Finding the best mentors...</span>
          </div>
        )}

        {/* Mentor Grid */}
        {!loading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mentors.map((mentor, index) => (
              <motion.div
                key={mentor.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                {/* CRITICAL: Passing the mentor object via state so MentorProfile.tsx can read it */}
                <Link
                  to={`/mentor/${mentor.id}`}
                  state={{ mentor }} 
                  className="block bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden hover:shadow-xl hover:border-blue-300 transition-all"
                >
                  {/* Match Score Badge */}
                  <div className="relative">
                    <img
                      src={mentor.image}
                      alt={mentor.name}
                      className="w-full h-48 object-cover bg-slate-100"
                    />
                    <div className="absolute top-3 right-3 px-3 py-1 bg-green-500 text-white rounded-full text-sm font-semibold shadow-sm">
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
                    <p className="text-sm text-slate-600 mb-3 line-clamp-2 italic">
                      "{mentor.bio}"
                    </p>

                    {/* Expertise Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {mentor.expertise.slice(0, 2).map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-medium border border-blue-100"
                        >
                          {skill}
                        </span>
                      ))}
                      {mentor.expertise.length > 2 && (
                        <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs font-medium border border-slate-200">
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
                      <span className="text-sm text-green-600 font-medium bg-green-50 px-2 py-0.5 rounded">
                        {mentor.availability}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}