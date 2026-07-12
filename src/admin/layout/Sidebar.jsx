import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, BookOpen, Users, ShoppingCart, 
  BarChart, Settings, FileText, FolderTree, PenTool, LayoutTemplate, Shield
} from 'lucide-react';

const navGroups = [
  {
    title: 'Dashboard',
    items: [
      { name: 'Overview', path: '/admin', icon: LayoutDashboard },
    ]
  },
  {
    title: 'Content',
    items: [
      { name: 'Books', path: '/admin/books', icon: BookOpen },
      { name: 'Categories', path: '/admin/categories', icon: FolderTree },
      { name: 'Blog Posts', path: '/admin/blog', icon: PenTool },
      { name: 'Pages', path: '/admin/pages', icon: FileText },
      { name: 'Homepage Builder', path: '/admin/builder', icon: LayoutTemplate },
    ]
  },
  {
    title: 'Commerce',
    items: [
      { name: 'Orders', path: '/admin/orders', icon: ShoppingCart },
      { name: 'Customers', path: '/admin/customers', icon: Users },
    ]
  },
  {
    title: 'System',
    items: [
      { name: 'Analytics', path: '/admin/analytics', icon: BarChart },
      { name: 'Settings', path: '/admin/settings', icon: Settings },
      { name: 'Legacy CMS', path: '/decap-manager/index.html', icon: Shield, external: true },
    ]
  }
];

export function Sidebar() {
  return (
    <aside className="w-64 bg-[#0e1117] text-slate-300 flex flex-col h-screen border-r border-slate-800">
      <div className="h-16 flex items-center px-6 border-b border-slate-800">
        <h1 className="font-extrabold text-white text-lg tracking-tight">
          CyberShelf <span className="text-slate-500 font-normal">Admin</span>
        </h1>
      </div>
      
      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-8 no-scrollbar">
        {navGroups.map((group, idx) => (
          <div key={idx}>
            <h3 className="px-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              {group.title}
            </h3>
            <div className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon;
                if (item.external) {
                  return (
                    <a 
                      key={item.name}
                      href={item.path}
                      className="flex items-center gap-3 px-2 py-2 text-sm font-medium rounded-md hover:bg-slate-800 hover:text-white transition-colors"
                    >
                      <Icon className="w-4 h-4 text-slate-400" />
                      {item.name}
                    </a>
                  )
                }
                return (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    end={item.path === '/admin'}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                        isActive 
                          ? 'bg-slate-800 text-white' 
                          : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
                      }`
                    }
                  >
                    <Icon className="w-4 h-4" />
                    {item.name}
                  </NavLink>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
