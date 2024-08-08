import React from 'react';
import { useLocation } from 'react-router-dom';
import NavClient from '@/components/navigation/NavClient';
import NavCounselor from '@/components/navigation/NavCounselor';
import Router from '@/Router';

const routeBackgroundColors: { [key: string]: string } = {
  '/signup/counselor': 'bg-blue-50',
  '/supervision': 'bg-blue-50',
  '/supervision/:supervisionId': 'bg-blue-50',
  '/mycounsel/counselor/history': 'bg-blue-50',
  '/mycounsel/counselor/record': 'bg-blue-50',
};

function getBackgroundColor(pathname: string): string {
  for (const [route, color] of Object.entries(routeBackgroundColors)) {
    if (pathname.startsWith(route)) {
      return color;
    }
  }
  return 'bg-orange-50'; // 기본 배경색
}

function App() {
  const location = useLocation();
  const backgroundColor = getBackgroundColor(location.pathname);

  return (
    <div className="App grid grid-cols-8 min-h-screen">
      <div className="fixed flex min-h-screen col-span-1">
        <NavCounselor />
      </div>
      <div className={`col-start-2 col-span-7 px-16 py-6 ${backgroundColor}`}>
        <Router />
      </div>
    </div>
  );
}

export default App;
