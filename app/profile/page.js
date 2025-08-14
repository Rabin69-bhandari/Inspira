'use client';

import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FiUser, FiMail, FiCalendar, FiEdit, FiSave, FiLock, FiArrowLeft } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [toast, setToast] = useState(null);
  const router = useRouter();

  // Mock user data - replace with actual user data from your auth provider
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    joinDate: 'January 15, 2023',
    bio: 'Frontend developer passionate about building beautiful user interfaces.',
  });

  const formik = useFormik({
    initialValues: {
      name: user.name,
      email: user.email,
      bio: user.bio,
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      bio: Yup.string().max(200, 'Bio should not exceed 200 characters'),
    }),
    onSubmit: async (values) => {
      try {
        // Simulate API call to update user profile
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setUser({
          ...user,
          name: values.name,
          email: values.email,
          bio: values.bio,
        });
        
        setToast({
          visible: true,
          message: 'Profile updated successfully!',
          type: 'success'
        });
        
        setIsEditing(false);
      } catch (error) {
        setToast({
          visible: true,
          message: 'Failed to update profile. Please try again.',
          type: 'error'
        });
      }
    },
  });

  // Auto-hide toast after 5 seconds
  useEffect(() => {
    if (toast?.visible) {
      const timer = setTimeout(() => {
        setToast({ ...toast, visible: false });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 relative">
      {/* Back arrow in top left */}
      <button 
        onClick={() => router.back()}
        className="absolute top-4 left-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
        aria-label="Go back"
      >
        <FiArrowLeft className="h-6 w-6 text-gray-600" />
      </button>

      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            My Profile
          </h1>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-white">
            <div className="flex flex-col items-center sm:flex-row sm:items-end">
              <div className="relative mb-4 sm:mb-0 sm:mr-6">
                <div className="w-24 h-24 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
                  <FiUser className="h-12 w-12" />
                </div>
                {isEditing && (
                  <button className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-md">
                    <FiEdit className="h-4 w-4 text-indigo-600" />
                  </button>
                )}
              </div>
              <div>
                {isEditing ? (
                  <input
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="text-2xl font-bold bg-white bg-opacity-20 rounded px-3 py-1 w-full sm:w-auto"
                  />
                ) : (
                  <h2 className="text-2xl font-bold">{user.name}</h2>
                )}
                <p className="mt-1 opacity-90">{user.email}</p>
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="p-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Personal Info */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <FiUser className="mr-2" /> Personal Information
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Full Name</label>
                    {isEditing ? (
                      <>
                        <input
                          name="name"
                          value={formik.values.name}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                        {formik.errors.name && formik.touched.name && (
                          <p className="mt-1 text-sm text-red-600">{formik.errors.name}</p>
                        )}
                      </>
                    ) : (
                      <p className="mt-1 text-gray-900">{user.name}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Email</label>
                    {isEditing ? (
                      <>
                        <input
                          name="email"
                          type="email"
                          value={formik.values.email}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                        {formik.errors.email && formik.touched.email && (
                          <p className="mt-1 text-sm text-red-600">{formik.errors.email}</p>
                        )}
                      </>
                    ) : (
                      <p className="mt-1 text-gray-900">{user.email}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Member Since</label>
                    <p className="mt-1 text-gray-900 flex items-center">
                      <FiCalendar className="mr-2" /> {user.joinDate}
                    </p>
                  </div>
                </div>
              </div>

              {/* Bio */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">About Me</h3>
                {isEditing ? (
                  <>
                    <textarea
                      name="bio"
                      rows="4"
                      value={formik.values.bio}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                    {formik.errors.bio && formik.touched.bio && (
                      <p className="mt-1 text-sm text-red-600">{formik.errors.bio}</p>
                    )}
                    <p className="mt-1 text-xs text-gray-500 text-right">
                      {formik.values.bio.length}/200 characters
                    </p>
                  </>
                ) : (
                  <p className="text-gray-700">{user.bio || 'No bio provided'}</p>
                )}
              </div>
            </div>

            {/* Password Section */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <FiLock className="mr-2" /> Password
              </h3>
              <button className="text-indigo-600 hover:text-indigo-800 font-medium">
                Change Password
              </button>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex justify-end space-x-3">
              {isEditing ? (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      formik.resetForm();
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => formik.handleSubmit()}
                    disabled={!formik.isValid || formik.isSubmitting}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FiSave className="mr-2" /> Save Changes
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(true);
                    formik.setValues({
                      name: user.name,
                      email: user.email,
                      bio: user.bio,
                    });
                  }}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <FiEdit className="mr-2" /> Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {toast?.visible && (
        <div className={`fixed bottom-4 right-4 p-4 rounded-md shadow-lg transition-all duration-300 ${toast.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
          <div className="flex items-center">
            <div className="flex-shrink-0">
              {toast.type === 'success' ? (
                <svg className="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">{toast.message}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}