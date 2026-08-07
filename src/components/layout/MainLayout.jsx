import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { Home, Leaf, BookOpen, User, Settings, Store, ShoppingBag } from 'lucide-react';
import { useEffect } from 'react';
import EventModal from '../modals/EventModal';
import { SaveManager } from '../../managers/SaveManager';

export default function MainLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!SaveManager.getCurrentUsername()) {
      navigate('/login', { replace: true });
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-farm-bg">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white/80 backdrop-blur-lg border-r border-farm-green-light p-6 flex flex-col gap-8 flex-shrink-0 relative z-10 shadow-soft md:shadow-none">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-farm-green rounded-xl flex items-center justify-center text-white shadow-soft">
            <Leaf size={24} strokeWidth={2.5} />
          </div>
          <h1 className="text-2xl font-extrabold text-farm-green-dark tracking-tight">FARMEEZ</h1>
        </div>
        
        <nav className="flex-1 flex flex-col gap-2">
          <NavItem to="/app" icon={<Home size={20} />} label="Dashboard" end />
          <NavItem to="/app/learn" id="tour-learning" icon={<BookOpen size={20} />} label="Learn" />
          <NavItem to="/app/market" id="tour-marketplace" icon={<Store size={20} />} label="Market" />
          <NavItem to="/app/store" id="tour-farm-supply" icon={<ShoppingBag size={20} />} label="Farm Supply" />
          <NavItem to="/app/profile" id="tour-profile" icon={<User size={20} />} label="Profile" />
          <NavItem to="/app/settings" id="tour-settings" icon={<Settings size={20} />} label="Settings" />
        </nav>

      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto relative h-screen">
        {/* Decorative background blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-farm-sky-light rounded-full blur-3xl opacity-60 -z-10 translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-farm-green-light rounded-full blur-3xl opacity-40 -z-10 translate-y-1/3"></div>
        
        <div className="max-w-6xl mx-auto h-full">
          <Outlet />
        </div>
      </main>
      
      <EventModal />
    </div>
  );
}

function NavItem({ to, icon, label, end, id }) {
  return (
    <NavLink 
      to={to} 
      end={end}
      id={id}
      className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-bold ${
      isActive 
        ? 'bg-farm-green text-white shadow-soft transform hover:-translate-y-1' 
        : 'text-slate-500 hover:bg-farm-green-light/50 hover:text-farm-green-dark'
    }`}>
      {icon}
      <span>{label}</span>
    </NavLink>
  );
}
