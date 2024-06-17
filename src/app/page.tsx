'use client';
import { useState } from 'react';

function PeopleSidebar() {
  return (
    <div className='w-[320px] grow bg-orange-600 rounded'>PeopleSidebar</div>
  );
}

function ChatSidebar() {
  return (
    <div className='w-[320px] grow bg-orange-600 rounded'>ChatSidebar</div>
  );
}

export default function Home() {
  const [sidebarId, setSidebarId] = useState('');

  const openSidebar = (id: string) => {
    setSidebarId(id);
  };

  const closeSidebar = () => {
    setSidebarId('');
  };

  const toggleSidebar = (id: string) => {
    if (sidebarId === id) {
      closeSidebar();
    } else {
      openSidebar(id);
    }
  };

  return (
    <main className='flex min-h-screen flex-col items-center justify-between bg-yellow-400'>
      <nav className='w-full h-7 flex space gap-x-4'>
        <button
          onClick={() => toggleSidebar('people')}
          className='w-20 h-full bg-blue-500 p-3 flex justify-center items-center rounded'
        >
          People
        </button>
        <button
          onClick={() => toggleSidebar('chat')}
          className='w-20 h-full bg-blue-500 p-3 flex justify-center items-center rounded'
        >
          Chat
        </button>
      </nav>
      <div className='w-full grow h-full py-5 flex flex-col bg-slate-500'>
        {sidebarId === 'people' && <PeopleSidebar />}
        {sidebarId === 'chat' && <ChatSidebar />}
      </div>
    </main>
  );
}
