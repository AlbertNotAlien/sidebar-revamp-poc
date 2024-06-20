'use client';
import { useState, useEffect } from 'react';
import { create } from 'zustand';

const defaultPeopleList = ['Alice', 'Bob', 'Charlie', 'David', 'Eve'];

interface PeopleState {
  peopleList: string[];
  setPeopleList: (peopleList: string[]) => void;
  increasePerson: () => void;
}

const usePeopleStore = create<PeopleState>((set) => ({
  peopleList: [],
  setPeopleList: (peopleList) => set({ peopleList }),
  increasePerson: () =>
    set((state) => ({ peopleList: [...state.peopleList, 'New Person'] })),
}));

function PeopleSidebar() {
  const { peopleList, increasePerson } = usePeopleStore((state) => ({
    peopleList: state.peopleList,
    increasePerson: state.increasePerson,
  }));

  useEffect(() => {
    console.log('PeopleSidebar mounted');
    return () => {
      console.log('PeopleSidebar unmounted');
    };
  });

  return (
    <div className='w-[320px] grow bg-orange-600 rounded'>
      <p>PeopleSidebar</p>
      {peopleList.map((person) => (
        <p key={person}>{person}</p>
      ))}
      <button
        className='w-[100px] bg-red-400 h-[20px]'
        onClick={increasePerson}
      >
        add
      </button>
    </div>
  );
}

function PeopleToolbarButton({
  openPeopleSidebar,
}: {
  openPeopleSidebar: () => void;
}) {
  const { peopleList, setPeopleList } = usePeopleStore((state) => ({
    peopleList: state.peopleList,
    setPeopleList: state.setPeopleList,
  }));

  useEffect(() => {
    setPeopleList(defaultPeopleList);
  }, [setPeopleList]);

  useEffect(() => {
    console.log('PeopleToolbarButton mounted');
    return () => {
      console.log('PeopleToolbarButton unmounted');
    };
  });

  return (
    <button
      onClick={openPeopleSidebar}
      className='w-32 h-full bg-blue-500 p-3 flex justify-center items-center rounded'
    >
      {`People (${peopleList.length})`}
    </button>
  );
}

function ChatSidebar() {
  useEffect(() => {
    console.log('ChatSidebar mounted');
    return () => {
      console.log('ChatSidebar unmounted');
    };
  });

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

  useEffect(() => {
    console.log('Home mounted');
    return () => {
      console.log('Home unmounted');
    };
  });

  return (
    <main className='flex min-h-screen flex-col items-center justify-between bg-yellow-400'>
      <nav className='w-full h-7 flex space gap-x-4'>
        <PeopleToolbarButton
          openPeopleSidebar={() => toggleSidebar('people')}
        />
        <button
          onClick={() => toggleSidebar('chat')}
          className='w-32 h-full bg-blue-500 p-3 flex justify-center items-center rounded'
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
