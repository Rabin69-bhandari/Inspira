'use client';
import { useState, useCallback } from 'react';
import { FiUser, FiMail, FiLock, FiEdit, FiSave, FiChevronLeft } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

const COLORS = {
  primary: '#3B82F6',
  secondary: '#60A5FA',
  light: '#EFF6FF',
  dark: '#1E40AF',
  text: '#1F2937',
  muted: '#6B7280'
};

export default function StudentProfile() {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [student, setStudent] = useState({
    name: 'Alex Johnson',
    image: '/default-avatar.jpg',
    cohort: 'Fall 2023',
    semester: 'Semester 4',
    email: 'alex.johnson@university.edu',
    about: 'Computer Science major with interest in AI and Machine Learning. Currently completing my senior year.',
    recentCourse: 'CS 401 - Advanced Algorithms'
  });

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    // In a real app, you would save to database here
    setIsEditing(false);
  }, []);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setStudent(prev => ({ ...prev, [name]: value }));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <button 
        onClick={() => router.back()}
        className="flex items-center text-gray-600 hover:text-gray-800 mb-6"
      >
        <FiChevronLeft className="mr-1" /> Back
      </button>

      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="md:flex">
          {/* Left Panel - Profile Image and Basic Info */}
          <div className="md:w-1/3 p-8 border-r border-gray-200">
            <div className="flex flex-col items-center">
              <div className="relative mb-4">
                <img 
                  src={student.image} 
                  alt="Student" 
                  className="w-40 h-40 rounded-full object-cover border-4 border-blue-100"
                />
                {isEditing && (
                  <button className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-md">
                    <FiEdit className="text-blue-500" />
                  </button>
                )}
              </div>
              
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={student.name}
                  onChange={handleChange}
                  className="text-2xl font-bold text-center mb-2 px-2 py-1 border rounded"
                />
              ) : (
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{student.name}</h2>
              )}
              
              <div className="text-center mb-6">
                <p className="text-gray-600">{student.cohort}</p>
                <p className="text-gray-600">{student.semester}</p>
              </div>

              <div className="w-full">
                <h3 className="font-semibold text-gray-700 mb-2">Recent Course</h3>
                {isEditing ? (
                  <input
                    type="text"
                    name="recentCourse"
                    value={student.recentCourse}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded mb-4"
                  />
                ) : (
                  <p className="bg-blue-50 text-blue-800 px-4 py-2 rounded-lg">{student.recentCourse}</p>
                )}
              </div>
            </div>
          </div>

          {/* Right Panel - About Me and Contact Info */}
          <div className="md:w-2/3 p-8">
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <FiUser className="mr-2" /> About Me
              </h3>
              {isEditing ? (
                <textarea
                  name="about"
                  value={student.about}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-3 py-2 border rounded"
                />
              ) : (
                <p className="text-gray-700">{student.about}</p>
              )}
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <FiMail className="mr-2" /> Contact Information
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    {isEditing ? (
                      <input
                        type="email"
                        name="email"
                        value={student.email}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded"
                      />
                    ) : (
                      <p className="text-gray-700">{student.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <button className="flex items-center text-blue-600 hover:text-blue-800">
                      <FiLock className="mr-2" /> Change Password
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 flex justify-end">
              {isEditing ? (
                <div className="space-x-3">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 border border-gray-600 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
                  >
                    <FiSave className="mr-2" /> Save Changes
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
                >
                  <FiEdit className="mr-2" /> Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}