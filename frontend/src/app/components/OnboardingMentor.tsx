import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { motion } from "motion/react";
import { Users, ArrowRight, ArrowLeft } from "lucide-react";

export function OnboardingMentor() {
  const [step, setStep] = useState(1);
  const [customExpertise, setCustomExpertise] = useState("");
  const navigate = useNavigate();
  const totalSteps = 4;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    title: "",
    company: "",
    expertise: [] as string[],
    experience: "",
    availability: [] as string[],
    sessionTypes: [] as string[],
  });

  const expertiseOptions = [
    "Leadership",
    "Software Engineering",
    "Data Science",
    "Product Management",
    "UX/UI Design",
    "Marketing",
    "Sales",
    "Finance",
    "Human Resources",
    "Entrepreneurship"
  ];

  const sessionTypeOptions = [
    { value: "one-on-one", label: "One-on-One Sessions", description: "Individual mentorship" },
    { value: "group", label: "Group Sessions", description: "Mentor multiple mentees" },
    { value: "workshop", label: "Workshops", description: "Structured learning sessions" }
  ];

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      navigate("/mentor-dashboard");
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const toggleExpertise = (item: string) => {
    setFormData(prev => ({
      ...prev,
      expertise: prev.expertise.includes(item)
        ? prev.expertise.filter(e => e !== item)
        : [...prev.expertise, item]
    }));
  };

  const addCustomExpertise = () => {
    const trimmedExpertise = customExpertise.trim();
    if (!trimmedExpertise || formData.expertise.includes(trimmedExpertise)) {
      return;
    }

    setFormData(prev => ({
      ...prev,
      expertise: [...prev.expertise, trimmedExpertise]
    }));
    setCustomExpertise("");
  };

  const toggleSessionType = (type: string) => {
    setFormData(prev => ({
      ...prev,
      sessionTypes: prev.sessionTypes.includes(type)
        ? prev.sessionTypes.filter(t => t !== type)
        : [...prev.sessionTypes, type]
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6 group">
            <Users className="w-6 h-6 text-indigo-600 group-hover:scale-110 transition-transform" />
            <span className="text-xl font-bold text-slate-900">MentorMatch</span>
          </Link>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Create your mentor profile
          </h1>
          <p className="text-slate-600">
            Step {step} of {totalSteps}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-indigo-600"
              initial={{ width: 0 }}
              animate={{ width: `${(step / totalSteps) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Form Content */}
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-6"
        >
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                Professional Information
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Jane Smith"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="jane@company.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Current Title
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Senior Product Manager"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Tech Company Inc."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Years of Experience
                  </label>
                  <select
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="">Select experience</option>
                    <option value="5-7">5-7 years</option>
                    <option value="8-10">8-10 years</option>
                    <option value="11-15">11-15 years</option>
                    <option value="16+">16+ years</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">
                Areas of Expertise
              </h2>
              <p className="text-slate-600 mb-6">
                Select all areas where you can provide guidance
              </p>
              <div className="mb-4 flex gap-2">
                <input
                  type="text"
                  value={customExpertise}
                  onChange={(e) => setCustomExpertise(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addCustomExpertise();
                    }
                  }}
                  className="flex-1 px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Add a custom expertise area"
                />
                <button
                  type="button"
                  onClick={addCustomExpertise}
                  className="px-4 py-3 bg-slate-100 text-slate-700 rounded-lg border border-slate-300 hover:bg-slate-200 transition-colors"
                >
                  Add
                </button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {expertiseOptions.map((item) => (
                  <button
                    key={item}
                    onClick={() => toggleExpertise(item)}
                    className={`p-4 rounded-lg border-2 text-sm font-medium transition-all ${
                      formData.expertise.includes(item)
                        ? "border-indigo-600 bg-indigo-50 text-indigo-700"
                        : "border-slate-200 text-slate-700 hover:border-indigo-300"
                    }`}
                  >
                    {item}
                  </button>
                ))}
                {formData.expertise
                  .filter((item) => !expertiseOptions.includes(item))
                  .map((item) => (
                    <button
                      key={item}
                      onClick={() => toggleExpertise(item)}
                      className={`p-4 rounded-lg border-2 text-sm font-medium transition-all ${
                        formData.expertise.includes(item)
                          ? "border-indigo-600 bg-indigo-50 text-indigo-700"
                          : "border-slate-200 text-slate-700 hover:border-indigo-300"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">
                Session Preferences
              </h2>
              <p className="text-slate-600 mb-6">
                What types of sessions would you like to offer?
              </p>
              <div className="space-y-3">
                {sessionTypeOptions.map((type) => (
                  <button
                    key={type.value}
                    onClick={() => toggleSessionType(type.value)}
                    className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                      formData.sessionTypes.includes(type.value)
                        ? "border-indigo-600 bg-indigo-50"
                        : "border-slate-200 hover:border-indigo-300"
                    }`}
                  >
                    <div className="font-semibold text-slate-900">{type.label}</div>
                    <div className="text-sm text-slate-600">{type.description}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">
                Your Availability
              </h2>
              <p className="text-slate-600 mb-6">
                Select your preferred mentoring time slots
              </p>
              <div className="space-y-3">
                {[
                  { value: "weekday_morning", label: "Weekday Mornings", time: "9:00 AM - 12:00 PM" },
                  { value: "weekday_afternoon", label: "Weekday Afternoons", time: "12:00 PM - 5:00 PM" },
                  { value: "weekday_evening", label: "Weekday Evenings", time: "5:00 PM - 9:00 PM" },
                  { value: "weekend", label: "Weekends", time: "Flexible hours" }
                ].map((slot) => (
                  <button
                    key={slot.value}
                    onClick={() => {
                      const newAvailability = formData.availability.includes(slot.value)
                        ? formData.availability.filter(a => a !== slot.value)
                        : [...formData.availability, slot.value];
                      setFormData({ ...formData, availability: newAvailability });
                    }}
                    className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                      formData.availability.includes(slot.value)
                        ? "border-indigo-600 bg-indigo-50"
                        : "border-slate-200 hover:border-indigo-300"
                    }`}
                  >
                    <div className="font-semibold text-slate-900">{slot.label}</div>
                    <div className="text-sm text-slate-600">{slot.time}</div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* Navigation Buttons */}
        <div className="flex justify-between gap-4">
          <button
            onClick={handleBack}
            disabled={step === 1}
            className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2 ${
              step === 1
                ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                : "bg-white border-2 border-slate-300 text-slate-700 hover:border-slate-400"
            }`}
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
          <button
            onClick={handleNext}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-all flex items-center gap-2"
          >
            {step === totalSteps ? "Complete" : "Continue"}
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
