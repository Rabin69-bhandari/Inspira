'use client';
import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';

const CourseCard = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useUser();
  const clerkId = user?.id;

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/Get_course?clerkId=${clerkId}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        // Only take the first 2 courses if there are more
        setCourses(data.courses ? data.courses.slice(0, 2) : []);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching course data:', err);
      } finally {
        setLoading(false);
      }
    };

    if (clerkId) {
      fetchCourseData();
    }
  }, [clerkId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-600 rounded-md">
        Error: {error}
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No courses available</p>
      </div>
    );
  }

  return (
    <div className='flex gap-2'>
      {courses.map((course, index) => (
        <div 
          key={index} 
          className="border border-gray-200 min-w-80 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
        >
          <div className="bg-indigo-50 p-4">
            <h4 className="text-lg font-semibold text-gray-800">
              {course.subject || 'No Subject'}
            </h4>
            <p className="text-sm text-gray-600">
              {course.professorname || 'Professor not specified'}
            </p>
          </div>
          
          <div className="p-4">
            <div className="mb-3">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Progress</span>
                <span>{course.progress || 0}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-indigo-600 h-2 rounded-full" 
                  style={{ width: `${course.progress || 0}%` }}
                ></div>
              </div>
            </div>

            <div className="text-sm">
              <p className="text-gray-500">Learn:</p>
              <p className="text-gray-800 font-medium">
                {course.title || 'No title available'}
              </p>
            </div>

            <button className="mt-4 w-full py-2 bg-indigo-50 text-indigo-600 rounded-md text-sm font-medium hover:bg-indigo-100 transition-colors">
              View Course
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CourseCard;