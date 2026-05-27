import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate, useLocation } from 'react-router';
import { motion } from 'motion/react';
import { Users, ArrowLeft, Calendar, Clock, MessageSquare, Video, CheckCircle2, Loader2 } from 'lucide-react';

import axiosClient from '../../api/axiosClient';

export function BookSession() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const stateMentor = location.state?.mentor;

  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [sessionType, setSessionType] = useState('video');
  const [topic, setTopic] = useState('');
  const [notes, setNotes] = useState('');

  const [isSuccess, setIsSuccess] = useState(false);

  const mentor = {
    name: stateMentor?.name ?? "",
    title: stateMentor?.title ?? "",
    image: stateMentor?.image ?? ""
  };

  const [rawAvailability, setRawAvailability] = useState<any[]>(
    stateMentor && Array.isArray(stateMentor.availability) && stateMentor.availability.length > 0
      ? stateMentor.availability
      : []
  );

  const [loading, setLoading] = useState(rawAvailability.length === 0);

  useEffect(() => {
    if (rawAvailability.length === 0) {
      fetch(`http://localhost:8080/api/mentors/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setRawAvailability(data.availability ?? []);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Failed to load availability:", err);
          setLoading(false);
        });
    }
  }, [id, rawAvailability.length]);

  const uniqueDays = Array.from(new Set(rawAvailability.map(slot => slot.day)));
  const availableDates = uniqueDays.map(day => ({
    date: day, 
    display: day 
  }));

  const timeSlots = rawAvailability
    .filter(slot => slot.day === selectedDate)
    .map(slot => slot.slotTime);

  const topics = [
    'Career Growth Strategy',
    'Leadership Development',
    'Technical Skills',
    'Interview Preparation',
    'General Advice',
    'Other',
  ];

  const handleBooking = async () => {
    const getNextDateString = (dayName: string): string => {
      const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      const targetDayIndex = daysOfWeek.indexOf(dayName);

      if (targetDayIndex === -1) return dayName; 

      const resultDate = new Date(); 
      const currentDayIndex = resultDate.getDay();

      let daysToAdd = (targetDayIndex + 7 - currentDayIndex) % 7;
        
      if (daysToAdd === 0 && selectedTime) {
        daysToAdd = 7;
      }

      resultDate.setDate(resultDate.getDate() + daysToAdd);

      const year = resultDate.getFullYear();
      const month = String(resultDate.getMonth() + 1).padStart(2, '0');
      const day = String(resultDate.getDate()).padStart(2, '0');

      return `${year}-${month}-${day}`;
    };

    const convertToAmPm = (timeStr: string): string => {
      if (!timeStr) return "";
      if (timeStr.includes("AM") || timeStr.includes("PM")) return timeStr;

      const [hoursStr, minutesStr] = timeStr.split(":");
      let hours = parseInt(hoursStr, 10);
      const minutes = minutesStr;
        
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12;
      hours = hours ? hours : 12; 

      return `${hours}:${minutes} ${ampm}`;
    };

    const formattedDate = getNextDateString(selectedDate); // "Monday" -> "2026-06-01"
    const formattedTime = convertToAmPm(selectedTime); // "10:00" -> "10:00 AM"

    const payload = {
      mentorId: Number(id), 
      menteeId: 6, // Hardcoded
      sessionDate: formattedDate, 
      sessionTime: formattedTime, 
      sessionType: sessionType,  
      topic: topic,              
      notes: notes
    };

    try {
      const response = await fetch("http://localhost:8080/api/sessions/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setIsSuccess(true);
        setTimeout(() => {
          navigate("/dashboard");
        }, 5000);
      } else {
        console.error("Failed to book session");
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
        <span className="ml-3 text-slate-600 font-medium">Loading slots...</span>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-100 p-8 text-center"
        >
          <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Booking Confirmed!
          </h2>
          <p className="text-slate-600 mb-6">
            Your session with <span className="font-semibold text-slate-800">{mentor.name}</span> has been successfully scheduled.
          </p>

          <div className="bg-slate-50 rounded-xl p-4 text-left space-y-2 text-sm text-slate-600 mb-6 border border-slate-100">
            <div><span className="font-medium text-slate-700">Day:</span> {selectedDate}</div>
            <div><span className="font-medium text-slate-700">Time:</span> {selectedTime}</div>
            <div><span className="font-medium text-slate-700">Type:</span> {sessionType === "video" ? "Video Call" : "Chat Only"}</div>
          </div>

          <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
            <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />
            Redirecting to dashboard...
          </div>
        </motion.div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-background">
      <nav className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-8">
              <Link to="/" className="flex items-center gap-2">
                <Users className="w-6 h-6 text-blue-600" />
                <span className="text-lg font-bold text-slate-900">MentorMatch</span>
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link 
          to={`/mentor/${id}`}
          state={{ mentor: stateMentor }}
          className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to profile
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm border border-slate-200 p-8"
            >
              <h1 className="text-2xl font-bold text-slate-900 mb-2">Book a Session</h1>
              <p className="text-slate-600 mb-8">Schedule a mentoring session with {mentor.name}</p>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-3">Session Type</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setSessionType('video')}
                      className={`p-4 rounded-lg border-2 text-left transition-all ${
                        sessionType === 'video'
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-slate-200 bg-white hover:border-blue-300'
                      }`}
                    >
                      <Video className="w-5 h-5 text-blue-600 mb-2" />
                      <div className="font-semibold text-slate-900">Video Call</div>
                      <div className="text-sm text-slate-600">Face-to-face session</div>
                    </button>
                    <button
                      onClick={() => setSessionType('chat')}
                      className={`p-4 rounded-lg border-2 text-left transition-all ${
                        sessionType === 'chat'
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-slate-200 bg-white hover:border-blue-300'
                      }`}
                    >
                      <MessageSquare className="w-5 h-5 text-blue-600 mb-2" />
                      <div className="font-semibold text-slate-900">Chat Only</div>
                      <div className="text-sm text-slate-600">Text-based session</div>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-3">
                    What would you like to discuss?
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {topics.map((t) => (
                      <button
                        key={t}
                        onClick={() => setTopic(t)}
                        className={`p-3 rounded-lg border-2 text-sm font-medium transition-all ${
                          topic === t
                            ? 'border-blue-600 bg-blue-50 text-blue-700'
                            : 'border-slate-200 bg-white text-slate-700 hover:border-blue-300'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-3">Select a Date</label>
                  <div className="grid grid-cols-3 gap-3">
                    {availableDates.map((dateOption) => (
                      <button
                        key={dateOption.date}
                        onClick={() => {
                          setSelectedDate(dateOption.date);
                          setSelectedTime(""); 
                        }}
                        className={`p-4 rounded-lg border-2 text-center transition-all ${
                          selectedDate === dateOption.date
                            ? 'border-blue-600 bg-blue-50 shadow-inner'
                            : 'border-slate-200 bg-white hover:border-blue-300'
                        }`}
                      >
                        <Calendar className="w-5 h-5 text-blue-600 mx-auto mb-2" />
                        <div className="text-sm font-medium text-slate-900">{dateOption.display}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {selectedDate && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                    <label className="block text-sm font-medium text-slate-700 mb-3">Select a Time</label>
                    <div className="grid grid-cols-4 gap-2">
                      {timeSlots.map((time) => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`p-3 rounded-lg border-2 text-sm font-medium transition-all ${
                            selectedTime === time
                              ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-inner'
                              : 'border-slate-200 bg-white text-slate-700 hover:border-blue-300'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-3">Additional Notes (Optional)</label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none bg-white"
                    placeholder="Share any specific topics or questions you'd like to cover..."
                  />
                </div>

                <button
                  onClick={handleBooking}
                  disabled={!selectedDate || !selectedTime || !topic}
                  className={`w-full py-4 rounded-lg font-medium transition-all shadow-sm ${
                    selectedDate && selectedTime && topic
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  Confirm Booking
                </button>
              </div>
            </motion.div>
          </div>

          <div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-lg border border-slate-200 p-6 sticky top-8"
            >
              <h3 className="font-semibold text-slate-900 mb-4">Booking Summary</h3>

              <div className="flex items-center gap-3 mb-6 pb-6 border-b border-slate-200">
                <img src={mentor.image} alt={mentor.name} className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <div className="font-semibold text-slate-900">{mentor.name}</div>
                  <div className="text-sm text-slate-600">{mentor.title}</div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="text-sm text-slate-600 mb-1">Session Type</div>
                  <div className="font-medium text-slate-900">
                    {sessionType === 'video' ? 'Video Call' : 'Chat Only'}
                  </div>
                </div>

                {topic && (
                  <div>
                    <div className="text-sm text-slate-600 mb-1">Topic</div>
                    <div className="font-medium text-slate-900">{topic}</div>
                  </div>
                )}

                {selectedDate && (
                  <div>
                    <div className="text-sm text-slate-600 mb-1">Date</div>
                    <div className="font-medium text-slate-900">
                      {availableDates.find((d) => d.date === selectedDate)?.display}
                    </div>
                  </div>
                )}

                {selectedTime && (
                  <div>
                    <div className="text-sm text-slate-600 mb-1">Time</div>
                    <div className="font-medium text-slate-900">{selectedTime}</div>
                  </div>
                )}

                <div className="pt-4 border-t border-slate-200">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Duration</span>
                    <span className="font-semibold text-slate-900">60 minutes</span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-slate-600">Price</span>
                    <span className="font-semibold text-green-600">Free</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <div className="flex gap-2">
                  <Clock className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-blue-900">
                    <p className="font-medium mb-1">Cancellation Policy</p>
                    <p className="text-blue-700">You can cancel or reschedule up to 24 hours before the session.</p>
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
