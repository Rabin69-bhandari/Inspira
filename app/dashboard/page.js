"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "../components/sidebar";
import { useUser } from "@clerk/nextjs";
import { FiBook, FiClock, FiBarChart2 } from "react-icons/fi";
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
import StatsCard from "./StatsCard";
import PerformanceChart from "./PerformanceChart";
import CourseProgressChart from "./CourseProgressChart";
import AssignmentsTable from "./AssignmentsTable";
import CourseCard from "./CourseCard";
import WelcomeHeader from "./WelcomeHeader";

// Register ChartJS components
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

    // Send user data to backend
    fetch("/api/save-user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData)
    });

    // Mock data fetch - replace with actual API calls
    const fetchData = async () => {
      try {
        // Simulate API loading
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock courses data
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

        // Mock assignments data
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

  // Chart data configuration
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
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Fixed Sidebar - won't scroll */}
      <div className="flex-shrink-0">
        <Sidebar />
      </div>

      {/* Scrollable Main Content Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 md:p-8">
          <WelcomeHeader user={user} />

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatsCard 
              title="Active Courses" 
              value={courses.length} 
              icon={FiBook} 
              colorClass="bg-indigo-50 text-indigo-600" 
            />
            <StatsCard 
              title="Pending Assignments" 
              value={assignments.filter(a => a.status === 'pending').length} 
              icon={FiClock} 
              colorClass="bg-blue-50 text-blue-600" 
            />
            <StatsCard 
              title="Average Progress" 
              value={Math.round(courses.reduce((acc, course) => acc + course.progress, 0) / courses.length) + '%'} 
              icon={FiBarChart2} 
              colorClass="bg-green-50 text-green-600" 
            />
          </div>

          {/* Performance Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <PerformanceChart data={performanceData} />
            <CourseProgressChart data={courseProgressData} />
          </div>

          {/* Upcoming Assignments */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Upcoming Assignments</h3>
              <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
                View All
              </button>
            </div>
            <AssignmentsTable assignments={assignments} />
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
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;