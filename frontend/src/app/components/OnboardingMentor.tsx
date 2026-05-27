import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { motion } from 'motion/react';
import {
  Users,
  ArrowRight,
  ArrowLeft,
  Loader2,
} from 'lucide-react';

import axiosClient from '../../api/axiosClient';

interface MentorAvailability {
  day: string;
  slotTime: string;
}

export function OnboardingMentor() {
  const [step, setStep] = useState(1);
  const [customExpertise, setCustomExpertise] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const totalSteps = 4;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    title: '',
    company: '',
    expertise: [] as string[],
    experience: '',
    availability: [] as MentorAvailability[],
    sessionTypes: [] as string[],
  });

  const expertiseOptions = [
    'Leadership',
    'Software Engineering',
    'Data Science',
    'Product Management',
    'UX/UI Design',
    'Marketing',
    'Sales',
    'Finance',
    'Human Resources',
    'Entrepreneurship',
  ];

  const availabilityOptions = [
    {
      day: 'Monday',
      slots: ['09:00', '11:00', '14:00', '18:00'],
    },
    {
      day: 'Tuesday',
      slots: ['09:00', '11:00', '14:00', '18:00'],
    },
    {
      day: 'Wednesday',
      slots: ['09:00', '11:00', '14:00', '18:00'],
    },
    {
      day: 'Thursday',
      slots: ['09:00', '11:00', '14:00', '18:00'],
    },
    {
      day: 'Friday',
      slots: ['09:00', '11:00', '14:00', '18:00'],
    },
    {
      day: 'Saturday',
      slots: ['10:00', '13:00'],
    },
  ];

  const handleNext = async () => {
    setError('');

    if (step < totalSteps) {
      setStep((prev) => prev + 1);
      return;
    }

    await handleSubmit();
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
    }
  };

  const toggleExpertise = (skill: string) => {
    const exists = formData.expertise.includes(skill);

    setFormData({
      ...formData,
      expertise: exists
        ? formData.expertise.filter((item) => item !== skill)
        : [...formData.expertise, skill],
    });
  };

  const addCustomExpertise = () => {
    const trimmed = customExpertise.trim();

    if (!trimmed) return;

    if (!formData.expertise.includes(trimmed)) {
      setFormData({
        ...formData,
        expertise: [...formData.expertise, trimmed],
      });
    }

    setCustomExpertise('');
  };

  const toggleSessionType = (type: string) => {
    const exists = formData.sessionTypes.includes(type);

    setFormData({
      ...formData,
      sessionTypes: exists
        ? formData.sessionTypes.filter((item) => item !== type)
        : [...formData.sessionTypes, type],
    });
  };

  const toggleAvailability = (day: string, slotTime: string) => {
    const exists = formData.availability.some(
      (slot) => slot.day === day && slot.slotTime === slotTime,
    );

    setFormData({
      ...formData,
      availability: exists
        ? formData.availability.filter(
            (slot) => !(slot.day === day && slot.slotTime === slotTime),
          )
        : [...formData.availability, { day, slotTime }],
    });
  };

  const isSlotSelected = (day: string, slotTime: string) => {
    return formData.availability.some(
      (slot) => slot.day === day && slot.slotTime === slotTime,
    );
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      setError('');

      const payload = {
        name: formData.name,
        email: formData.email,
        title: formData.title,
        company: formData.company,
        experienceSummary: formData.experience,
        skills: formData.expertise,
        availability: formData.availability,
        sessionTypes: formData.sessionTypes,
      };

      // Backend endpoint can be adjusted later by the backend teammate
      console.log('Submitting mentor onboarding data:', payload);
      // ide majd be kell tenni a megfelelo POST register endpointot
      await axiosClient.post('/', payload);

      navigate('/mentor-dashboard');
    } catch (err) {
      console.error(err);
      setError('Failed to complete onboarding. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white px-4 py-10">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <Users className="w-8 h-8 text-indigo-600" />
            <span className="text-2xl font-bold text-slate-900">
              MentorMatch
            </span>
          </Link>

          <h1 className="text-4xl font-bold text-slate-900 mb-3">
            Mentor Onboarding
          </h1>

          <p className="text-slate-600">
            Complete your mentor profile to start helping mentees.
          </p>
        </div>

        <div className="flex items-center justify-center gap-3 mb-10">
          {Array.from({ length: totalSteps }).map((_, index) => (
            <div
              key={index}
              className={`h-3 rounded-full transition-all ${
                index + 1 <= step
                  ? 'bg-indigo-600 w-12'
                  : 'bg-slate-300 w-3'
              }`}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200"
        >
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                Basic Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Job Title
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">
                Expertise & Experience
              </h2>

              <p className="text-slate-600 mb-6">
                Select your expertise areas.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                {expertiseOptions.map((skill) => (
                  <button
                    key={skill}
                    onClick={() => toggleExpertise(skill)}
                    className={`px-4 py-3 rounded-lg border-2 transition-all ${
                      formData.expertise.includes(skill)
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                        : 'border-slate-200 hover:border-indigo-300'
                    }`}
                  >
                    {skill}
                  </button>
                ))}
              </div>

              <div className="flex gap-3 mb-6">
                <input
                  type="text"
                  value={customExpertise}
                  onChange={(e) => setCustomExpertise(e.target.value)}
                  placeholder="Add custom expertise"
                  className="flex-1 px-4 py-3 border border-slate-300 rounded-lg"
                />

                <button
                  onClick={addCustomExpertise}
                  className="px-5 py-3 bg-indigo-600 text-white rounded-lg"
                >
                  Add
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Experience Summary
                </label>

                <textarea
                  rows={5}
                  value={formData.experience}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      experience: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg"
                  placeholder="Tell mentees about your experience..."
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">
                Session Preferences
              </h2>

              <p className="text-slate-600 mb-6">
                Choose the session types you offer.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    value: 'video',
                    label: 'Video Calls',
                    description: '1-on-1 video mentoring sessions',
                  },
                  {
                    value: 'chat',
                    label: 'Chat Mentoring',
                    description: 'Async mentorship through chat',
                  },
                ].map((type) => (
                  <button
                    key={type.value}
                    onClick={() => toggleSessionType(type.value)}
                    className={`p-5 rounded-xl border-2 text-left transition-all ${
                      formData.sessionTypes.includes(type.value)
                        ? 'border-indigo-600 bg-indigo-50'
                        : 'border-slate-200 hover:border-indigo-300'
                    }`}
                  >
                    <div className="font-semibold text-slate-900 mb-1">
                      {type.label}
                    </div>
                    <div className="text-sm text-slate-600">
                      {type.description}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">
                Set Your Availability
              </h2>

              <p className="text-slate-600 mb-6">
                Choose the time slots when you are available.
              </p>

              <div className="space-y-6">
                {availabilityOptions.map((dayOption) => (
                  <div key={dayOption.day}>
                    <h3 className="font-semibold text-slate-900 mb-3">
                      {dayOption.day}
                    </h3>

                    <div className="flex flex-wrap gap-3">
                      {dayOption.slots.map((slot) => {
                        const selected = isSlotSelected(
                          dayOption.day,
                          slot,
                        );

                        return (
                          <button
                            key={`${dayOption.day}-${slot}`}
                            onClick={() =>
                              toggleAvailability(dayOption.day, slot)
                            }
                            className={`px-4 py-2 rounded-lg border-2 transition-all ${
                              selected
                                ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                                : 'border-slate-200 hover:border-indigo-300'
                            }`}
                          >
                            {slot}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error}
            </div>
          )}
        </motion.div>

        <div className="flex justify-between mt-8">
          <button
            onClick={handleBack}
            disabled={step === 1 || isSubmitting}
            className={`px-6 py-3 rounded-lg flex items-center gap-2 transition-all ${
              step === 1
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                : 'bg-white border border-slate-300 hover:border-slate-400'
            }`}
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>

          <button
            onClick={handleNext}
            disabled={isSubmitting}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg flex items-center gap-2 transition-all"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                {step === totalSteps ? 'Complete' : 'Continue'}
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
