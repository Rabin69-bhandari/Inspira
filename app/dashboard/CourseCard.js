"use client";
import React from "react";

const CourseCard = ({ course }) => {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
      <div className="bg-indigo-50 p-4">
        <h4 className="text-lg font-semibold text-gray-800">{course.title}</h4>
        <p className="text-sm text-gray-600">{course.instructor}</p>
      </div>
      <div className="p-4">
        <div className="mb-3">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Progress</span>
            <span>{course.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-indigo-600 h-2 rounded-full" 
              style={{ width: `${course.progress}%` }}
            ></div>
          </div>
        </div>
        {course.nextAssignment && (
          <div className="text-sm">
            <p className="text-gray-500">Next Assignment:</p>
            <p className="text-gray-800 font-medium">{course.nextAssignment}</p>
          </div>
        )}
        <button className="mt-4 w-full py-2 bg-indigo-50 text-indigo-600 rounded-md text-sm font-medium hover:bg-indigo-100 transition-colors">
          View Course
        </button>
      </div>
    </div>
  );
};

export default CourseCard;