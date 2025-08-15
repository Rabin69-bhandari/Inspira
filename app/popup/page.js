"use client";

import { useState, useEffect } from 'react';

export default function ContentAdder({ onClose,courseId }) {
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState('');
  const [moduleCount, setModuleCount] = useState(0);
  const [modules, setModules] = useState([]);
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const [previewMode, setPreviewMode] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Current module form state
  const [currentModuleTitle, setCurrentModuleTitle] = useState('');
  const [currentModuleContent, setCurrentModuleContent] = useState('');
  const [currentModuleImageUrl, setCurrentModuleImageUrl] = useState('');

  console.log(courseId)

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  // Reset form state when module changes
  useEffect(() => {
    if (modules[currentModuleIndex]) {
      setCurrentModuleTitle(modules[currentModuleIndex].title || '');
      setCurrentModuleContent(modules[currentModuleIndex].content || '');
      setCurrentModuleImageUrl(modules[currentModuleIndex].imageUrl || '');
    } else {
      setCurrentModuleTitle('');
      setCurrentModuleContent('');
      setCurrentModuleImageUrl('');
    }
  }, [currentModuleIndex, modules]);

  const handleInitialSubmit = (e) => {
    e.preventDefault();
    const count = parseInt(e.target.moduleCount.value);
    setModuleCount(count);
    setModules(Array(count).fill({ title: '', content: '', imageUrl: '' }));
    setStep(2);
  };

  const handleModuleSubmit = (e) => {
    e.preventDefault();
    
    const updatedModules = [...modules];
    updatedModules[currentModuleIndex] = {
      title: currentModuleTitle,
      content: currentModuleContent,
      imageUrl: currentModuleImageUrl
    };
    setModules(updatedModules);

    if (currentModuleIndex < moduleCount - 1) {
      setCurrentModuleIndex(currentModuleIndex + 1);
    } else {
      setPreviewMode(true);
    }
  };

  const goToModule = (index) => {
    // Save current module before navigating away
    const updatedModules = [...modules];
    updatedModules[currentModuleIndex] = {
      title: currentModuleTitle,
      content: currentModuleContent,
      imageUrl: currentModuleImageUrl
    };
    setModules(updatedModules);
    
    setCurrentModuleIndex(index);
    setPreviewMode(false);
  };

  const resetForm = () => {
    setStep(1);
    setTitle('');
    setModuleCount(0);
    setModules([]);
    setCurrentModuleIndex(0);
    setPreviewMode(false);
    setCurrentModuleTitle('');
    setCurrentModuleContent('');
    setCurrentModuleImageUrl('');
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const contentData = {
    title: title,
    courseId:courseId,
    modules: modules.map(module => ({
      title: module.title,
      content: module.content,
      imageUrl: module.imageUrl || null
    }))
  };


  const saveContentToBackend = async () => {
    console.log(contentData)
    try {
   
      const response = await fetch('/api/content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contentData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Content saved successfully:', result);
      alert('Content saved successfully!');
      onClose();
    } catch (error) {
      console.error('Error saving content:', error);
      alert('Failed to save content. Please try again.');
    } 
  };


  if (!isMounted) return null;

  return (
    <div 
      className="fixed inset-0 bg-white backdrop-blur-md bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm transition-opacity duration-300"
      onClick={handleBackdropClick}
    >
      <div className={`bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300 ${isMounted ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-6">
          {step === 1 && (
            <div className="space-y-6">
              <h1 className="text-2xl font-bold text-gray-800">Create New Content</h1>
              <form onSubmit={handleInitialSubmit} className="space-y-5">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                    Content Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="moduleCount" className="block text-sm font-medium text-gray-700 mb-1">
                    Number of Modules
                  </label>
                  <input
                    type="number"
                    id="moduleCount"
                    name="moduleCount"
                    min="1"
                    max="20"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2.5 px-4 rounded-lg hover:bg-blue-700 transition duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Continue
                </button>
              </form>
            </div>
          )}

          {step === 2 && !previewMode && (
            <div className="space-y-6">
              <div>
                <h1 className="text-xl font-bold text-gray-800 truncate">{title}</h1>
                <p className="text-sm text-gray-500">
                  Module {currentModuleIndex + 1} of {moduleCount}
                </p>
              </div>
              
              <form onSubmit={handleModuleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="moduleTitle" className="block text-sm font-medium text-gray-700 mb-1">
                    Module Title
                  </label>
                  <input
                    type="text"
                    id="moduleTitle"
                    name="moduleTitle"
                    value={currentModuleTitle}
                    onChange={(e) => setCurrentModuleTitle(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                    Module Content
                  </label>
                  <textarea
                    id="content"
                    name="content"
                    rows="4"
                    value={currentModuleContent}
                    onChange={(e) => setCurrentModuleContent(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">
                    Module Image URL (Optional)
                  </label>
                  <input
                    type="url"
                    id="imageUrl"
                    name="imageUrl"
                    value={currentModuleImageUrl}
                    onChange={(e) => setCurrentModuleImageUrl(e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  />
                  {currentModuleImageUrl && (
                    <div className="mt-2">
                      <img 
                        src={currentModuleImageUrl} 
                        alt="Module preview" 
                        className="mt-1 max-h-32 rounded"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/300x200?text=Image+not+found';
                        }}
                      />
                    </div>
                  )}
                </div>
                
                <div className="flex justify-between pt-2">
                  {currentModuleIndex > 0 ? (
                    <button
                      type="button"
                      onClick={() => goToModule(currentModuleIndex - 1)}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                    >
                      Previous
                    </button>
                  ) : (
                    <div></div>
                  )}
                  
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    {currentModuleIndex < moduleCount - 1 ? 'Next' : 'Preview'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {previewMode && (
            <div className="space-y-6">
              <div>
                <h1 className="text-xl font-bold text-gray-800">{title}</h1>
                <p className="text-sm text-gray-500">{moduleCount} modules</p>
              </div>
              
              <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                {modules.map((module, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <h2 className="text-lg font-semibold text-gray-800 mb-2">
                      {module.title || `Module ${index + 1}`}
                    </h2>
                    {module.imageUrl && (
                      <img 
                        src={module.imageUrl} 
                        alt={module.title || `Module ${index + 1}`}
                        className="mb-3 w-full h-auto rounded-lg"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/300x200?text=Image+not+found';
                        }}
                      />
                    )}
                    <div className="text-sm text-gray-700 space-y-2">
                      {module.content.split('\n').map((paragraph, i) => (
                        <p key={i}>{paragraph}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex flex-col sm:flex-row justify-between gap-3 pt-2">
                <button
                  onClick={() => setPreviewMode(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  Edit Content
                </button>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={resetForm}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                  >
                    Start Over
                  </button>
                  
                  <button
                    onClick={() => saveContentToBackend()}
                    className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  >
                    Save Content
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}