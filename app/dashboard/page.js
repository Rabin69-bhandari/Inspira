"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "../components/sidebar";
import { useUser } from "@clerk/nextjs";
import { FiBook, FiCalendar, FiAward, FiBarChart2, FiClock, FiDownload } from "react-icons/fi";
import { Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const { isSignedIn, user } = useUser();
  const [courses, setCourses] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSignedIn) return;

    const userData = {
      clerkId: user.id,
      fullName: user.fullName,
      imageUrl: user.imageUrl,
      email: user.primaryEmailAddress?.emailAddress
    };

    // Send to backend once on first load
    fetch("/api/save-user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData)
    });

    // Mock data fetch - replace with actual API calls
    const fetchData = async () => {
      try {
        // Simulate API calls
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const mockCourses = [
          {
            id: "1",
            title: "Mathematics 101",
            instructor: "Dr. Smith",
            progress: 75,
            nextAssignment: "Chapter 5 Quiz"
          },
          {
            id: "2",
            title: "Computer Science Fundamentals",
            instructor: "Prof. Johnson",
            progress: 42,
            nextAssignment: "Final Project Proposal"
          },
          {
            id: "3",
            title: "Literature & Composition",
            instructor: "Dr. Williams",
            progress: 90,
            nextAssignment: "Essay Draft"
          }
        ];

        const mockAssignments = [
          {
            id: "1",
            title: "Linear Algebra Homework",
            course: "Mathematics 101",
            dueDate: "2023-11-15",
            status: "pending"
          },
          {
            id: "2",
            title: "Programming Challenge",
            course: "Computer Science Fundamentals",
            dueDate: "2023-11-10",
            status: "completed"
          },
          {
            id: "3",
            title: "Reading Response",
            course: "Literature & Composition",
            dueDate: "2023-11-08",
            status: "overdue"
          },
          {
            id: "4",
            title: "Midterm Exam Study Guide",
            course: "Mathematics 101",
            dueDate: "2023-11-20",
            status: "pending"
          }
        ];

        setCourses(mockCourses);
        setAssignments(mockAssignments);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [isSignedIn, user]);

  if (!isSignedIn) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (loading) return <div className="flex justify-center items-center h-screen">Loading dashboard...</div>;

  const performanceData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
    datasets: [
      {
        label: 'Your Performance',
        data: [65, 72, 78, 75, 82, 85],
        borderColor: '#4f46e5',
        backgroundColor: 'rgba(79, 70, 229, 0.1)',
      },
    ],
  };

  const courseProgressData = {
    labels: courses.map(course => course.title),
    datasets: [
      {
        data: courses.map(course => course.progress),
        backgroundColor: [
          'rgba(79, 70, 229, 0.8)',
          'rgba(99, 102, 241, 0.8)',
          'rgba(129, 140, 248, 0.8)',
        ],
        borderColor: [
          'rgba(79, 70, 229, 1)',
          'rgba(99, 102, 241, 1)',
          'rgba(129, 140, 248, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 p-6 md:p-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Welcome back, {user.firstName || "Student"}!
          </h1>
          <p className="text-gray-600">Here's what's happening with your courses</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Active Courses</p>
                <h3 className="text-2xl font-bold text-gray-800 mt-1">{courses.length}</h3>
              </div>
              <div className="p-3 rounded-lg bg-indigo-50 text-indigo-600">
                <FiBook className="w-6 h-6" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Pending Assignments</p>
                <h3 className="text-2xl font-bold text-gray-800 mt-1">
                  {assignments.filter(a => a.status === 'pending').length}
                </h3>
              </div>
              <div className="p-3 rounded-lg bg-blue-50 text-blue-600">
                <FiClock className="w-6 h-6" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Average Progress</p>
                <h3 className="text-2xl font-bold text-gray-800 mt-1">
                  {Math.round(courses.reduce((acc, course) => acc + course.progress, 0) / courses.length)}%
                </h3>
              </div>
              <div className="p-3 rounded-lg bg-green-50 text-green-600">
                <FiBarChart2 className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>

        {/* Performance Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Performance Trend</h3>
            <div className="h-64">
              <Line
                data={performanceData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'top',
                    },
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      max: 100,
                    },
                  },
                }}
              />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Course Progress</h3>
            <div className="h-64">
              <Doughnut
                data={courseProgressData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'bottom',
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>

        {/* Upcoming Assignments */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Upcoming Assignments</h3>
            <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
              View All
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assignment</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {assignments.map((assignment) => (
                  <tr key={assignment.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{assignment.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{assignment.course}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(assignment.dueDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        assignment.status === 'completed' 
                          ? 'bg-green-100 text-green-800'
                          : assignment.status === 'overdue'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button className="text-indigo-600 hover:text-indigo-900">
                        <FiDownload className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Your Courses */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Your Courses</h3>
            <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
              View All
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div key={course.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
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
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;