"use client";

import { useEffect, use ,useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import ReactPlayer from "react-player";
import Link from "next/link";

import { FiChevronLeft, FiChevronRight, FiClock, FiBookOpen } from "react-icons/fi";

const CoursePage = ({ params }) => {
  const router = useRouter();
  const unwrappedParams = use(params);
  const { id } = unwrappedParams;
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const fetchCourse = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/courseslearn/${id}`, {
        next: { revalidate: 3600 } // Cache for 1 hour
      });
      
      if (!res.ok) throw new Error("Failed to load course");
      const data = await res.json();
      setCourse(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) fetchCourse();
  }, [id, fetchCourse]);

  const handleModuleChange = (newIndex) => {
    setCurrentModuleIndex(newIndex);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentModule = course?.modules?.[currentModuleIndex] || {};

  if (loading) return (
    <div className="max-w-6xl mx-auto p-4 lg:p-8">
      <div className="animate-pulse space-y-8">
        <div className="h-10 bg-gray-200 rounded w-3/4"></div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 space-y-6">
            <div className="aspect-video bg-gray-200 rounded-xl"></div>
            <div className="h-8 bg-gray-200 rounded w-1/2"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-4/6"></div>
            </div>
          </div>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-12 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  if (error) return (
    <div className="max-w-6xl mx-auto p-4 lg:p-8">
      <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-medium text-red-800">Error loading course</h3>
            <p className="text-red-600">{error}</p>
          </div>
          <button 
            onClick={fetchCourse}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );

  if (!course) return (
    <div className="max-w-6xl mx-auto p-4 lg:p-8">
      <div className="bg-white rounded-xl shadow-sm p-8 text-center">
        <h3 className="text-xl font-medium text-gray-900">Course not found</h3>
        <p className="mt-2 text-gray-600">The requested course could not be found</p>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-4 lg:p-8">
      {/* Course Header */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{course.title}</h1>
            <p className="text-gray-600 mt-2">
              Last updated: {new Date(course.updatedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center text-sm text-gray-500">
              <FiClock className="mr-1" />
              {course.modules?.length || 0} modules
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <FiBookOpen className="mr-1" />
              {course.subject || 'General'}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Module Content */}
        <div className="lg:col-span-3">
          {/* Video Player */}
          {isClient && currentModule.imageUrl && (
            <div className="bg-black rounded-xl overflow-hidden mb-6 aspect-video">
                <Link href={currentModule.imageUrl}>Click Me</Link>
              
            </div>
          )}

          {/* Module Title and Content */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {currentModule.title || `Module ${currentModuleIndex + 1}`}
            </h2>
            
            <div className="prose max-w-none text-gray-700">
              {currentModule.content?.split("\n").map((paragraph, i) => (
                <p key={i} className="mb-4">{paragraph}</p>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-6">
            <button
              onClick={() => handleModuleChange(currentModuleIndex - 1)}
              disabled={currentModuleIndex === 0}
              className="flex items-center px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FiChevronLeft className="mr-2" />
              Previous
            </button>
            
            <div className="text-sm text-gray-500 flex items-center">
              Module {currentModuleIndex + 1} of {course.modules?.length || 0}
            </div>
            
            <button
              onClick={() => handleModuleChange(currentModuleIndex + 1)}
              disabled={currentModuleIndex === (course.modules?.length || 1) - 1}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
              <FiChevronRight className="ml-2" />
            </button>
          </div>
        </div>

        {/* Module Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100">
              <h3 className="font-medium text-gray-900">Course Modules</h3>
            </div>
            <div className="divide-y divide-gray-100">
              {course.modules?.map((module, index) => (
                <button
                  key={index}
                  onClick={() => handleModuleChange(index)}
                  className={`w-full text-left p-4 hover:bg-gray-50 transition ${
                    currentModuleIndex === index ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                      currentModuleIndex === index ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'
                    }`}>
                      {index + 1}
                    </div>
                    <span className="truncate">{module.title || `Module ${index + 1}`}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePage;