import React from 'react';
import { Search, Bell, User, LayoutGrid } from 'lucide-react';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';

export function TopNav() {
  return (
    <header className="h-16 border-b border-slate-200 bg-white flex items-center justify-between px-6 z-10 sticky top-0">
      <div className="flex items-center flex-1 gap-4">
        <div className="relative w-96 hidden md:block">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
          <Input 
            placeholder="Search books, orders, customers..." 
            className="pl-9 bg-slate-50 border-slate-200 focus-visible:ring-slate-300 shadow-none h-9 text-sm"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="text-slate-500 hover:text-slate-900">
          <LayoutGrid className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="text-slate-500 hover:text-slate-900 relative">
          <Bell className="h-4 w-4" />
          <span className="absolute top-2 right-2.5 w-1.5 h-1.5 bg-red-500 rounded-full border border-white"></span>
        </Button>
        <div className="w-px h-6 bg-slate-200 mx-1"></div>
        <Button variant="ghost" className="gap-2 pl-2 text-slate-700">
          <div className="w-7 h-7 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center text-xs font-bold">
            AH
          </div>
          <span className="text-sm font-medium hidden sm:inline-block">Admin</span>
        </Button>
      </div>
    </header>
  );
}
