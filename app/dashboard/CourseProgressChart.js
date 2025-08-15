"use client";
import React from "react";
import { Doughnut } from "react-chartjs-2";

const CourseProgressChart = ({ data }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Course Progress</h3>
      <div className="h-64">
        <Doughnut
          data={data}
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
  );
};

export default CourseProgressChart;