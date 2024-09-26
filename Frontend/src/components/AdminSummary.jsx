import React from 'react';

const AdminSummary = () => {
  const getGreeting = () => {
    const hours = new Date().getHours();
    if (hours < 12) {
      return 'Good Morning';
    } else if (hours < 18) {
      return 'Good Afternoon';
    } else {
      return 'Good Evening';
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-gradient-to-r from-teal-400 to-teal-600 text-white rounded-lg shadow-lg text-center transform transition-transform duration-300 hover:scale-105 hover:animate-vibrate">
        <h1 className="text-3xl font-bold">{getGreeting()}, Admin!</h1>
        <p className="mt-2 text-lg italic">Welcome to your Admin Panel!</p>
        <p className="mt-4 text-md">You’re in charge. Let’s make great things happen!</p>
      </div>
    </div>
  );
};

export default AdminSummary;
