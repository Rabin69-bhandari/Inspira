"use client";
import { useEffect, useState } from "react";
import { FiBook, FiClock, FiCalendar, FiAward, FiSearch } from "react-icons/fi";
import Sidebar from "../components/sidebar";

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleEnroll = async (courseId) => {
    try {
  
      const res = await fetch("/api/save-user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({courseId }),
      });
  
      const data = await res.json();
  
      if (res.ok) {
        alert("Enrolled successfully!");
      } else {
        alert("Enrollment failed: " + data.error);
      }
    } catch (error) {
      console.error("Error enrolling:", error);
      alert("Something went wrong!");
    }
  };
  const fetchCourses = async () => {
    try {
      const res = await fetch("/api/courses");
      if (!res.ok) {
        throw new Error("Failed to fetch courses");
      }
      const data = await res.json();
      setCourses(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  
  // Filter courses based on search term
  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  if (error) return (
    <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
      <div className="flex items-center">
        <div className="text-red-500 mr-3">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <p className="font-medium">Error loading courses</p>
          <p className="text-sm text-gray-600">{error}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex">

    <Sidebar />
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Courses</h1>
        <p className="mt-2 text-lg text-gray-600">View and manage your enrolled courses</p>
      </div>

      {/* Search and Stats */}
      <div className="mb-8">
        <div className="relative max-w-md mb-6">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search courses..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-50 text-blue-600 mr-4">
                <FiBook size={20} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Total Courses</p>
                <p className="text-2xl font-semibold">{courses.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-50 text-green-600 mr-4">
                <FiClock size={20} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">In Progress</p>
                <p className="text-2xl font-semibold">
                  {courses.filter(c => c.status === 'in-progress').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-50 text-purple-600 mr-4">
                <FiCalendar size={20} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Upcoming</p>
                <p className="text-2xl font-semibold">
                  {courses.filter(c => c.status === 'upcoming').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-yellow-50 text-yellow-600 mr-4">
                <FiAward size={20} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Completed</p>
                <p className="text-2xl font-semibold">
                  {courses.filter(c => c.status === 'completed').length}
                </p>  
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Course List */}
      <div>
        {filteredCourses.length === 0 ? (
          <div className="bg-white rounded-lg shadow border border-gray-200 p-8 text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900">No courses found</h3>
            <p className="mt-2 text-sm text-gray-600">
              {searchTerm ? "No courses match your search" : "You are not enrolled in any courses yet"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <div key={course._id} className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className={`p-3 rounded-lg ${getStatusColor(course.status).bg} ${getStatusColor(course.status).text} mr-4`}>
                      <FiBook size={20} />
                    </div>
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(course.status).badge}`}>
                      {formatStatus(course.status)}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{course.title}</h3>
                  <p className="text-gray-600 mb-4">{course.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Start: {course.startDate || 'TBD'}</span>
                    <button onClick={() => handleEnroll(course._id)} className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                      Enroll Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>

    </div>
  );
}

// Helper functions
function formatStatus(status) {
  const statusMap = {
    'not-started': 'Not Started',
    'in-progress': 'In Progress',
    'completed': 'Completed',
    'upcoming': 'Upcoming'
  };
  return statusMap[status] || status;
}

function getStatusColor(status) {
  const colors = {
    'not-started': {
      bg: 'bg-gray-100',
      text: 'text-gray-600',
      badge: 'bg-gray-100 text-gray-800'
    },
    'in-progress': {
      bg: 'bg-blue-100',
      text: 'text-blue-600',
      badge: 'bg-blue-100 text-blue-800'
    },
    'completed': {
      bg: 'bg-green-100',
      text: 'text-green-600',
      badge: 'bg-green-100 text-green-800'
    },
    'upcoming': {
      bg: 'bg-purple-100',
      text: 'text-purple-600',
      badge: 'bg-purple-100 text-purple-800'
    }
  };
  return colors[status] || colors['not-started'];
}