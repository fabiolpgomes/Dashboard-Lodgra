/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  Home, 
  Calendar, 
  Wallet, 
  BarChart3, 
  Settings, 
  ChevronDown, 
  LogOut,
  TrendingUp,
  Clock,
  Plus,
  CheckCircle2,
  AlertCircle,
  XCircle,
  ArrowUpRight,
  Sun,
  Moon,
  Search,
  Building2,
  Users,
  MapPin,
  Star,
  Edit,
  Trash2,
  X,
  Menu
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line,
  Cell,
  PieChart,
  Pie
} from 'recharts';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const occupancyData = [
  { name: 'Dez', value: 0 },
  { name: 'Jan', value: 0 },
  { name: 'Fev', value: 0 },
  { name: 'Mar', value: 12 },
  { name: 'Abr', value: 22 },
  { name: 'Mai', value: 28 },
];

const revenueData = [
  { name: 'Mar', eur: 800, brl: 4000 },
  { name: 'Abr', eur: 600, brl: 9000 },
  { name: 'Mai', eur: 2495, brl: 17230 },
];

const statusData = [
  { name: 'Confirmadas', value: 50, color: '#059669' },
  { name: 'Pendentes', value: 5, color: '#ffc000' },
  { name: 'Canceladas', value: 2, color: '#f87171' },
];

const arrivals = [
  {
    guest: 'Ana Cardeal',
    property: 'AHS T2 Espaçoso • 5 noites',
    channel: 'BOOKING.COM',
    checkIn: '14 MAI',
    day: 'Terça-feira',
    active: true
  },
  {
    guest: 'Carmelina Sequeira',
    property: 'Lakeside Studio • 1 noite',
    channel: 'BOOKING.COM',
    checkIn: '18 MAI',
    day: 'Sábado',
    active: false
  }
];

export default function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [activeTab, setActiveTab] = useState<'dashboard' | 'properties' | 'reservations' | 'financial'>('dashboard');
  
  // Property Management States
  const [properties, setProperties] = useState([
    { id: 1, name: 'AHS T2 Espaçoso', type: 'Apartamento', city: 'Lisboa', price: '120€', rating: 4.8, status: 'Online', guests: 4 },
    { id: 2, name: 'Lakeside Studio', type: 'Estúdio', city: 'Porto', price: '85€', rating: 4.9, status: 'Online', guests: 2 },
    { id: 3, name: 'Villa Sol e Mar', type: 'Moradia', city: 'Algarve', price: '350€', rating: 4.7, status: 'Offline', guests: 8 },
    { id: 4, name: 'City Center Loft', type: 'Loft', city: 'Coimbra', price: '95€', rating: 4.5, status: 'Online', guests: 3 },
  ]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<any>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const handleEditClick = (prop: any) => {
    setSelectedProperty({ ...prop });
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (prop: any) => {
    setSelectedProperty(prop);
    setIsDeleteOpen(true);
  };

  const confirmDelete = () => {
    setProperties(prev => prev.filter(p => p.id !== selectedProperty.id));
    setIsDeleteOpen(false);
    setSelectedProperty(null);
  };

  const handleUpdateProperty = (e: React.FormEvent) => {
    e.preventDefault();
    setProperties(prev => prev.map(p => p.id === selectedProperty.id ? selectedProperty : p));
    setIsEditModalOpen(false);
    setSelectedProperty(null);
  };

  const reservationsList = [
    { id: 'RES-001', guest: 'Ana Cardeal', checkIn: '14 Mai', checkOut: '19 Mai', status: 'Confirmado', amount: '600€', property: 'AHS T2 Espaçoso' },
    { id: 'RES-002', guest: 'João Silva', checkIn: '20 Mai', checkOut: '22 Mai', status: 'Pendente', amount: '240€', property: 'Lakeside Studio' },
    { id: 'RES-003', guest: 'Maria Santos', checkIn: '25 Mai', checkOut: '30 Mai', status: 'Confirmado', amount: '1.750€', property: 'Villa Sol e Mar' },
    { id: 'RES-004', guest: 'Pedro Costa', checkIn: '02 Jun', checkOut: '05 Jun', status: 'Cancelado', amount: '285€', property: 'City Center Loft' },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-300 font-body relative">
      {/* Mobile Backdrop */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[55] lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar Navigation */}
      <aside className={cn(
        "fixed lg:static inset-y-0 left-0 w-[280px] border-r border-[var(--border-primary)] bg-[var(--bg-surface)] flex flex-col shrink-0 z-[60] lg:z-50 transition-transform duration-300 ease-in-out lg:translate-x-0",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-lodgra-navy rounded-xl flex items-center justify-center shadow-lg shadow-lodgra-navy/20">
              <Home className="w-6 h-6 text-lodgra-yellow" strokeWidth={2.5} />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight font-display text-lodgra-navy dark:text-lodgra-yellow leading-none">Lodgra</span>
              <span className="text-[10px] font-bold text-lodgra-blue uppercase tracking-[0.2em] mt-1">Management</span>
            </div>
          </div>
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="p-2 hover:bg-grey-100 dark:hover:bg-grey-800 rounded-lg lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 px-4 py-4 space-y-1.5 overflow-y-auto custom-scrollbar">
          <nav className="space-y-1">
            <button 
              onClick={() => { setActiveTab('dashboard'); setIsSidebarOpen(false); }}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold text-sm group",
                activeTab === 'dashboard' 
                  ? "bg-lodgra-blue text-white shadow-lg shadow-lodgra-blue/20" 
                  : "text-[var(--text-secondary)] hover:bg-grey-100 dark:hover:bg-grey-800 hover:text-[var(--text-primary)]"
              )}
            >
              <LayoutDashboard size={20} className={cn(activeTab === 'dashboard' ? "text-white" : "text-lodgra-blue")} />
              Dashboard
            </button>
            <button 
              onClick={() => { setActiveTab('properties'); setIsSidebarOpen(false); }}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold text-sm group",
                activeTab === 'properties' 
                  ? "bg-lodgra-blue text-white shadow-lg shadow-lodgra-blue/20" 
                  : "text-[var(--text-secondary)] hover:bg-grey-100 dark:hover:bg-grey-800 hover:text-[var(--text-primary)]"
              )}
            >
              <Building2 size={20} className={cn(activeTab === 'properties' ? "text-white" : "text-lodgra-blue")} />
              Propriedades
            </button>
            <button 
              onClick={() => { setActiveTab('reservations'); setIsSidebarOpen(false); }}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold text-sm group",
                activeTab === 'reservations' 
                  ? "bg-lodgra-blue text-white shadow-lg shadow-lodgra-blue/20" 
                  : "text-[var(--text-secondary)] hover:bg-grey-100 dark:hover:bg-grey-800 hover:text-[var(--text-primary)]"
              )}
            >
              <Calendar size={20} className={cn(activeTab === 'reservations' ? "text-white" : "text-lodgra-blue")} />
              Reservas
            </button>
            <button 
              onClick={() => { setActiveTab('financial'); setIsSidebarOpen(false); }}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold text-sm group",
                activeTab === 'financial' 
                  ? "bg-lodgra-blue text-white shadow-lg shadow-lodgra-blue/20" 
                  : "text-[var(--text-secondary)] hover:bg-grey-100 dark:hover:bg-grey-800 hover:text-[var(--text-primary)]"
              )}
            >
              <Wallet size={20} className={cn(activeTab === 'financial' ? "text-white" : "text-lodgra-blue")} />
              Financeiro
            </button>
          </nav>

          <div className="pt-8 pb-4">
            <span className="px-4 text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-[0.2em] mb-4 block">Configurações</span>
            <nav className="space-y-1">
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[var(--text-secondary)] hover:bg-grey-100 dark:hover:bg-grey-800 hover:text-[var(--text-primary)] transition-all font-bold text-sm">
                <BarChart3 size={20} className="text-lodgra-blue" />
                Relatórios
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[var(--text-secondary)] hover:bg-grey-100 dark:hover:bg-grey-800 hover:text-[var(--text-primary)] transition-all font-bold text-sm">
                <Settings size={20} className="text-lodgra-blue" />
                Ajustes
              </button>
            </nav>
          </div>
        </div>

          <div className="p-4 mt-auto border-t border-[var(--border-primary)] space-y-4 hidden lg:block">
            <div className="flex items-center justify-between bg-grey-50 dark:bg-grey-900 px-4 py-3 rounded-xl border border-[var(--border-primary)]">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-secondary)]">Modo {theme === 'dark' ? 'Noite' : 'Dia'}</span>
            <button 
              onClick={toggleTheme}
              className="p-1.5 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-primary)] text-lodgra-blue shadow-sm hover:scale-110 transition-transform"
            >
              {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
            </button>
          </div>

          <div className="p-4 rounded-2xl bg-lodgra-navy dark:bg-grey-900 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-16 h-16 bg-lodgra-blue/20 rounded-full blur-2xl -mr-8 -mt-8 group-hover:scale-150 transition-transform duration-500"></div>
            <div className="flex items-center gap-3 relative z-10">
              <div className="w-10 h-10 rounded-full bg-lodgra-blue border-2 border-lodgra-navy flex items-center justify-center text-white text-sm font-bold shadow-lg">F</div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-white leading-none truncate">fabiolpgomes</p>
                <p className="text-[9px] text-lodgra-blue font-bold mt-1 uppercase tracking-tighter">Proprietário</p>
              </div>
              <button className="ml-auto text-white/40 hover:text-white transition-colors">
                <LogOut size={16} />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Top Header */}
        <header className="h-16 bg-[var(--bg-surface)] border-b border-[var(--border-primary)] px-4 lg:px-8 flex items-center justify-between shrink-0 z-40">
           <div className="flex items-center gap-2 lg:gap-4">
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="p-2 hover:bg-grey-100 dark:hover:bg-grey-800 rounded-lg lg:hidden text-lodgra-blue"
              >
                <Menu size={24} />
              </button>
              <h1 className="text-sm lg:text-lg font-bold font-display uppercase tracking-tight truncate">
                {activeTab === 'dashboard' && 'Visão Geral'}
                {activeTab === 'properties' && 'Portfólio'}
                {activeTab === 'reservations' && 'Reservas'}
                {activeTab === 'financial' && 'Gestão'}
              </h1>
              <div className="h-4 w-[1px] bg-[var(--border-primary)] mx-1 lg:mx-2 hidden sm:block"></div>
              <div className="hidden sm:flex items-center gap-2 text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-[0.2em]">
                <Clock size={12} className="text-lodgra-blue" />
                Atualizado
              </div>
           </div>

           <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 bg-grey-100 dark:bg-grey-800 px-4 py-2 rounded-full border border-[var(--border-primary)]">
                <Search size={14} className="text-[var(--text-secondary)]" />
                <input 
                  type="text" 
                  placeholder="Buscar reserva ou hóspede..." 
                  className="bg-transparent border-none outline-none text-[11px] font-bold uppercase tracking-wider w-48 placeholder:text-grey-400"
                />
              </div>
              
              <div className="flex items-center gap-2">
                <button className="w-10 h-10 rounded-full bg-[var(--bg-surface)] border border-[var(--border-primary)] flex items-center justify-center text-[var(--text-secondary)] hover:border-lodgra-blue hover:text-lodgra-blue transition-all relative">
                  <Star size={18} />
                  <span className="absolute top-2 right-2 w-2 h-2 bg-lodgra-blue rounded-full border-2 border-[var(--bg-surface)] shadow-lodgra-blue/50"></span>
                </button>
                <button className="w-10 h-10 rounded-full bg-[var(--bg-surface)] border border-[var(--border-primary)] flex items-center justify-center text-[var(--text-secondary)] hover:border-lodgra-blue hover:text-lodgra-blue transition-all">
                  <LayoutDashboard size={18} />
                </button>
              </div>
           </div>
        </header>

        {/* Content Wrapper */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8 custom-scrollbar bg-grey-50/50 dark:bg-[#08090F]">
          <div className="max-w-7xl mx-auto space-y-6 lg:space-y-8 pb-12">
          
          {activeTab === 'dashboard' && (
            <>
              {/* Header Title */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
                <div>
                  <h2 className="text-2xl lg:text-3xl font-bold tracking-tight font-display mb-1">Painel Gerencial</h2>
                  <p className="text-xs lg:text-sm text-[var(--text-secondary)] font-medium">Indicadores de desempenho Lodgra</p>
                </div>
                <div className="flex gap-3 w-full sm:w-auto">
                  <button className="be-button flex-1 sm:flex-none px-5 py-2.5 bg-lodgra-blue text-white hover:bg-lodgra-blue-hover text-sm active:scale-95 transition-all">
                    <Plus size={18} strokeWidth={3} className="mr-1 inline" /> Nova Reserva
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-12 gap-6">
                {/* Left Column */}
                <div className="col-span-12 lg:col-span-8 space-y-6">
                  
                  {/* Top Stats Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div className="be-card be-card-hover p-6">
                      <p className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-widest mb-3">Imóveis Ativos</p>
                      <div className="flex items-baseline gap-2">
                        <h3 className="text-4xl font-bold font-display">07</h3>
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-lodgra-green/10 text-lodgra-green">ONLINE</span>
                      </div>
                    </div>

                    <div className="be-card be-card-hover p-6">
                      <p className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-widest mb-3">Reservas Totais</p>
                      <div className="flex items-baseline gap-2">
                        <h3 className="text-4xl font-bold font-display">57</h3>
                        <span className="text-[10px] text-lodgra-green font-bold flex items-center gap-0.5">
                          <TrendingUp size={12} /> +12%
                        </span>
                      </div>
                    </div>

                    <div className="be-card be-card-hover p-6">
                      <p className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-widest mb-3">Ocupação MAI</p>
                      <div className="flex items-baseline gap-2">
                        <h3 className="text-4xl font-bold font-display text-lodgra-yellow">28%</h3>
                        <span className="text-[10px] text-[var(--text-secondary)] font-bold">META ALCANÇADA</span>
                      </div>
                    </div>
                  </div>

                  {/* Financial Panel */}
                  <div className="be-card p-8 group">
                    <div className="flex justify-between items-center mb-8 pb-6 border-b border-[var(--border-primary)]">
                      <div>
                        <h2 className="text-xl font-bold font-display uppercase tracking-tight">Fluxo Financeiro</h2>
                        <p className="text-[10px] text-[var(--text-secondary)] font-bold mt-1 uppercase tracking-widest">Maio 2024 • Consolidado</p>
                      </div>
                      <div className="flex gap-2">
                        <button className="be-button px-3 py-1 bg-grey-100 dark:bg-grey-800 text-[9px] font-bold text-[var(--text-secondary)] hover:text-lodgra-blue transition-colors uppercase tracking-widest">Detalhes</button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div className="space-y-8">
                        <div className="flex flex-col">
                          <span className="text-[10px] uppercase text-lodgra-blue font-bold tracking-widest mb-2">Euro (EUR)</span>
                          <span className="text-4xl font-bold font-display">2.495,03 €</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[10px] uppercase text-lodgra-green font-bold tracking-widest mb-2">Real (BRL)</span>
                          <span className="text-4xl font-bold font-display">R$ 17.230</span>
                        </div>
                      </div>
                      <div className="be-card p-7 flex flex-col justify-center relative overflow-hidden group/box">
                        <div className="absolute top-4 right-4 text-lodgra-blue opacity-5 group-hover/box:opacity-10 transition-opacity">
                          <Wallet size={64} />
                        </div>
                        <span className="text-[10px] uppercase text-[var(--text-secondary)] font-bold mb-4 tracking-widest">Previsão Anual Contratada</span>
                        <span className="text-3xl font-bold font-display text-lodgra-blue mb-2">21.836,12 €</span>
                        <div className="flex items-center gap-2 text-xs font-bold text-lodgra-blue/80">
                          <Plus size={14} strokeWidth={3} /> 44 NOVAS RESERVAS
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Charts Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="be-card p-6">
                      <div className="flex justify-between items-start mb-8">
                        <div>
                          <h3 className="text-[11px] font-bold uppercase tracking-[0.1em]">Taxa de Ocupação</h3>
                          <p className="text-[10px] text-[var(--text-secondary)] font-medium mt-1 uppercase tracking-tight">Médias Semestrais</p>
                        </div>
                      </div>
                      <div className="h-[200px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={occupancyData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-primary)" vertical={false} />
                            <XAxis 
                              dataKey="name" 
                              axisLine={false} 
                              tickLine={false} 
                              tick={{ fill: 'var(--text-secondary)', fontSize: 10, fontWeight: 700 }} 
                            />
                            <YAxis 
                              axisLine={false} 
                              tickLine={false} 
                              tick={{ fill: 'var(--text-secondary)', fontSize: 10, fontWeight: 700 }} 
                              tickFormatter={(v) => `${v}%`}
                            />
                            <Tooltip 
                              contentStyle={{ 
                                backgroundColor: 'var(--bg-surface)', 
                                border: '1px solid var(--border-primary)', 
                                borderRadius: '4px',
                                fontSize: '12px',
                                fontWeight: '600'
                              }}
                              cursor={{ fill: 'rgba(0,0,0,0.02)' }}
                            />
                            <Bar 
                              dataKey="value" 
                              fill="#1E3A8A" 
                              radius={[2, 2, 0, 0]} 
                              barSize={24}
                            />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    <div className="be-card p-6">
                      <div className="flex justify-between items-start mb-8">
                        <div>
                          <h3 className="text-[11px] font-bold uppercase tracking-[0.1em]">Receita do Mês</h3>
                          <p className="text-[10px] text-[var(--text-secondary)] font-medium mt-1 uppercase tracking-tight">Progressão Financeira</p>
                        </div>
                        <div className="flex gap-4">
                           <div className="flex items-center gap-1.5 text-[9px] font-bold text-[var(--text-secondary)] uppercase"><div className="w-1.5 h-1.5 rounded-full bg-lodgra-blue"></div>EUR</div>
                           <div className="flex items-center gap-1.5 text-[9px] font-bold text-[var(--text-secondary)] uppercase"><div className="w-1.5 h-1.5 rounded-full bg-lodgra-green"></div>BRL</div>
                        </div>
                      </div>
                      <div className="h-[200px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={revenueData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-primary)" vertical={false} />
                            <XAxis 
                              dataKey="name" 
                              axisLine={false} 
                              tickLine={false} 
                              tick={{ fill: 'var(--text-secondary)', fontSize: 10, fontWeight: 700 }} 
                            />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--text-secondary)', fontSize: 10, fontWeight: 700 }} />
                            <Tooltip 
                              contentStyle={{ 
                                backgroundColor: 'var(--bg-surface)', 
                                border: '1px solid var(--border-primary)', 
                                borderRadius: '4px',
                                fontSize: '12px',
                                fontWeight: '600'
                              }}
                            />
                            <Line 
                              type="monotone" 
                              dataKey="eur" 
                              stroke="#1E3A8A" 
                              strokeWidth={3} 
                              dot={{ r: 0 }}
                              activeDot={{ r: 5, fill: '#1E3A8A', strokeWidth: 0 }} 
                            />
                            <Line 
                              type="monotone" 
                              dataKey="brl" 
                              stroke="#059669" 
                              strokeWidth={3} 
                              dot={{ r: 0 }}
                              activeDot={{ r: 5, fill: '#059669', strokeWidth: 0 }} 
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="col-span-12 lg:col-span-4 space-y-6">
                  
                  {/* Arrivals Panel */}
                  <div className="be-card p-6 flex flex-col h-full min-h-[500px]">
                    <h2 className="text-[11px] font-bold uppercase tracking-[0.15em] mb-8 flex items-center gap-2 text-[var(--text-primary)] font-display">
                      <Clock className="w-3.5 h-3.5 text-lodgra-blue" /> Check-ins Próximos
                    </h2>
                    
                    <div className="space-y-3 flex-1 overflow-y-auto custom-scrollbar pr-1">
                      {arrivals.map((arrival, index) => (
                        <div key={index} className="px-5 py-5 be-card hover:border-lodgra-blue transition-all cursor-pointer group relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-1 h-full bg-lodgra-blue opacity-0 group-hover:opacity-100 transition-opacity"></div>
                          <div className="flex justify-between items-start mb-4">
                            <div className="min-w-0 pr-4">
                              <h4 className="text-sm font-bold truncate group-hover:text-lodgra-blue transition-colors uppercase tracking-tight font-display">{arrival.guest}</h4>
                            <p className="text-[11px] text-[var(--text-secondary)] font-medium mt-1 uppercase line-clamp-1">{arrival.property}</p>
                          </div>
                          <div className="text-right shrink-0">
                            <p className="text-xs font-bold font-mono text-lodgra-blue">{arrival.checkIn}</p>
                            <p className="text-[9px] text-[var(--text-secondary)] font-bold uppercase tracking-tighter">{arrival.day}</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-auto">
                          <div className="text-[10px] font-black text-lodgra-blue flex items-center gap-2">
                            <span className={cn("w-1.5 h-1.5 rounded-full", arrival.active ? "bg-lodgra-blue animate-pulse" : "bg-grey-400")} />
                            {arrival.channel}
                          </div>
                          <span className="text-[10px] font-bold text-lodgra-blue opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest">Ver Mais →</span>
                        </div>
                      </div>
                      ))}
                    </div>
                    
                    <div className="mt-10 pt-8 border-t border-[var(--border-primary)]">
                      <div className="text-[10px] text-[var(--text-secondary)] font-bold uppercase tracking-widest mb-6 px-1">Distribuição de Status</div>
                      <div className="flex items-center gap-8">
                        <div className="w-24 h-24 relative shrink-0">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={statusData}
                                cx="50%"
                                cy="50%"
                                innerRadius={32}
                                outerRadius={46}
                                paddingAngle={4}
                                dataKey="value"
                              >
                                {statusData.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                                ))}
                              </Pie>
                            </PieChart>
                          </ResponsiveContainer>
                          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                            <span className="text-xl font-bold font-display text-[var(--text-primary)]">57</span>
                          </div>
                        </div>
                        <div className="flex flex-col gap-3 flex-1">
                          {statusData.map((status, index) => (
                            <div key={index} className="flex items-center justify-between group cursor-default">
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: status.color }}></div>
                                <span className="text-[9px] text-[var(--text-secondary)] font-bold uppercase">{status.name}</span>
                              </div>
                              <span className="text-xs font-bold group-hover:text-lodgra-blue transition-colors text-[var(--text-primary)]">{status.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="flex flex-col gap-3">
                    <button className="be-button w-full py-4 bg-[var(--bg-primary)] border border-[var(--border-primary)] text-[var(--text-primary)] hover:border-lodgra-blue hover:text-lodgra-blue text-[10px] font-bold tracking-[0.15em] uppercase transition-all">
                      Calendário Semanal
                    </button>
                    <button className="be-button w-full py-4 bg-lodgra-navy text-white hover:bg-lodgra-navy/90 text-[10px] font-bold tracking-[0.15em] uppercase transition-all">
                      Escala de Limpeza
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'properties' && (
            <div className="space-y-8 animate-in fade-in duration-500">
               <div className="flex justify-between items-end">
                <div>
                  <h2 className="text-3xl font-bold tracking-tight font-display mb-1">Propriedades</h2>
                  <p className="text-sm text-[var(--text-secondary)] font-medium">Gestão de portfólio Lodgra</p>
                </div>
                <div className="flex gap-3">
                  <button className="be-button px-5 py-2.5 bg-lodgra-blue text-white hover:bg-lodgra-blue-hover text-sm active:scale-95 transition-all">
                    <Plus size={18} strokeWidth={3} className="mr-1" /> Adicionar Imóvel
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {properties.map((prop) => (
                  <div key={prop.id} className="be-card overflow-hidden group hover:border-lodgra-blue transition-all relative">
                    <div className="absolute top-3 right-3 z-20 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => handleEditClick(prop)}
                        className="w-8 h-8 rounded-full bg-white dark:bg-lodgra-navy shadow-sm flex items-center justify-center text-lodgra-blue hover:bg-lodgra-blue hover:text-white transition-all"
                        title="Editar"
                      >
                        <Edit size={14} />
                      </button>
                      <button 
                        onClick={() => handleDeleteClick(prop)}
                        className="w-8 h-8 rounded-full bg-white dark:bg-lodgra-navy shadow-sm flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-all"
                        title="Excluir"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <div className="h-48 bg-grey-100 dark:bg-grey-800 relative">
                       <div className="absolute top-3 left-3 bg-white/90 dark:bg-black/80 px-2 py-1 rounded text-[9px] font-black uppercase tracking-widest text-lodgra-navy dark:text-lodgra-yellow">
                         {prop.type}
                       </div>
                       <div className="absolute top-3 right-3 bg-lodgra-navy text-white px-2 py-1 rounded text-[9px] font-bold group-hover:hidden transition-all">
                         {prop.status}
                       </div>
                       <div className="w-full h-full flex items-center justify-center text-grey-300 dark:text-grey-700">
                          <Building2 size={48} />
                       </div>
                    </div>
                    <div className="p-5">
                       <h4 className="font-bold text-lg mb-1 font-display truncate">{prop.name}</h4>
                       <div className="flex items-center gap-2 text-[11px] text-[var(--text-secondary)] font-bold uppercase tracking-wider mb-4">
                          <MapPin size={12} className="text-lodgra-blue" /> {prop.city}
                       </div>
                       <div className="flex justify-between items-end pt-4 border-t border-[var(--border-primary)]">
                          <div>
                             <p className="text-[10px] text-[var(--text-secondary)] font-bold uppercase tracking-widest">Diária</p>
                             <p className="text-xl font-bold font-display text-lodgra-blue">{prop.price}</p>
                          </div>
                          <div className="flex items-center gap-1 px-2 py-1 bg-lodgra-yellow/10 text-lodgra-yellow rounded text-xs font-bold">
                             <Star size={12} fill="currentColor" /> {prop.rating}
                          </div>
                       </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'reservations' && (
            <div className="space-y-8 animate-in fade-in duration-500">
               <div className="flex justify-between items-end">
                <div>
                  <h2 className="text-3xl font-bold tracking-tight font-display mb-1">Reservas</h2>
                  <p className="text-sm text-[var(--text-secondary)] font-medium">Controle de ocupação e hospedes</p>
                </div>
                <div className="flex gap-3">
                   <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-secondary)]" />
                      <input 
                        type="text" 
                        placeholder="Pesquisar..." 
                        className="be-button pl-10 pr-4 py-2 text-sm border border-[var(--border-primary)] bg-[var(--bg-surface)] focus:border-lodgra-blue focus:ring-1 focus:ring-lodgra-blue/20 outline-none w-64"
                      />
                   </div>
                  <button className="be-button px-5 py-2.5 bg-lodgra-blue text-white hover:bg-lodgra-blue-hover text-sm active:scale-95 transition-all">
                    <Plus size={18} strokeWidth={3} className="mr-1" /> Nova Reserva
                  </button>
                </div>
              </div>

              <div className="be-card overflow-x-auto custom-scrollbar">
                 <table className="w-full text-left min-w-[800px]">
                    <thead>
                       <tr className="bg-grey-50 dark:bg-grey-900/50 border-b border-[var(--border-primary)]">
                          <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[var(--text-secondary)]">Ref</th>
                          <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[var(--text-secondary)]">Hóspede</th>
                          <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[var(--text-secondary)]">Imóvel</th>
                          <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[var(--text-secondary)]">Período</th>
                          <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[var(--text-secondary)]">Valor</th>
                          <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[var(--text-secondary)]">Status</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--border-primary)]">
                       {reservationsList.map((res) => (
                          <tr key={res.id} className="hover:bg-grey-50 dark:hover:bg-grey-800/20 transition-colors cursor-pointer group">
                             <td className="px-6 py-5 text-xs font-mono font-bold text-lodgra-blue">{res.id}</td>
                             <td className="px-6 py-5">
                                <div className="font-bold text-sm">{res.guest}</div>
                             </td>
                             <td className="px-6 py-5">
                                <div className="text-xs font-medium text-[var(--text-secondary)]">{res.property}</div>
                             </td>
                             <td className="px-6 py-5">
                                <div className="text-xs font-bold">{res.checkIn} — {res.checkOut}</div>
                             </td>
                             <td className="px-6 py-5">
                                <div className="text-sm font-bold font-display">{res.amount}</div>
                             </td>
                             <td className="px-6 py-5">
                                <span className={cn(
                                   "text-[9px] font-bold px-2 py-0.5 rounded uppercase",
                                   res.status === 'Confirmado' ? "bg-lodgra-green/10 text-lodgra-green" :
                                   res.status === 'Pendente' ? "bg-lodgra-yellow/10 text-lodgra-yellow" :
                                   "bg-red-500/10 text-red-500"
                                )}>
                                   {res.status}
                                </span>
                             </td>
                          </tr>
                       ))}
                    </tbody>
                 </table>
              </div>
            </div>
          )}

          {activeTab === 'financial' && (
             <div className="flex flex-col items-center justify-center p-20 be-card h-[500px]">
                <div className="w-16 h-16 bg-lodgra-blue/10 rounded-full flex items-center justify-center text-lodgra-blue mb-4">
                  <Wallet size={32} />
                </div>
                <h3 className="text-xl font-bold font-display mb-2">Módulo Financeiro</h3>
                <p className="text-[var(--text-secondary)] text-sm max-w-sm text-center">Aguardando consolidação de dados bancários e integrações de gateway para exibição completa.</p>
                <button className="be-button mt-8 px-6 py-2 border border-lodgra-blue text-lodgra-blue font-bold uppercase text-[10px] tracking-widest hover:bg-lodgra-blue hover:text-white transition-all">Solicitar Acesso</button>
             </div>
          )}

        </div>
      </main>

      {/* Footer */}
      <footer className="h-10 border-t border-[var(--border-primary)] bg-lodgra-navy dark:bg-[var(--bg-primary)] flex items-center justify-between px-8 text-[9px] text-[var(--text-secondary)] dark:text-slate-400 font-mono shrink-0 uppercase tracking-[0.2em]">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-lodgra-green shadow-none"></div>
          Lodgra Precision v2.5.2
        </div>
        <div className="flex items-center gap-8">
          <span className="hover:text-lodgra-yellow cursor-pointer transition-colors uppercase">Sistema: Operacional</span>
          <span className="text-white font-bold opacity-60">© 2024 Lodgra</span>
        </div>
      </footer>
    </div>

      {/* Modals */}
      <AnimatePresence>
        {isEditModalOpen && selectedProperty && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsEditModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="be-card w-full max-w-lg bg-[var(--bg-surface)] p-6 lg:p-8 relative z-10 shadow-2xl overflow-y-auto max-h-[90vh] custom-scrollbar"
            >
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h3 className="text-xl font-bold font-display uppercase tracking-tight">Editar Propriedade</h3>
                  <p className="text-[10px] text-[var(--text-secondary)] font-bold mt-1 uppercase tracking-widest">ID: {selectedProperty.id}</p>
                </div>
                <button 
                  onClick={() => setIsEditModalOpen(false)}
                  className="p-2 hover:bg-grey-100 dark:hover:bg-grey-800 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleUpdateProperty} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-secondary)] mb-2 block">Nome da Propriedade</label>
                    <input 
                      type="text" 
                      value={selectedProperty.name}
                      onChange={(e) => setSelectedProperty({...selectedProperty, name: e.target.value})}
                      className="w-full px-4 py-3 be-card border-[var(--border-primary)] bg-[var(--bg-primary)] focus:border-lodgra-blue focus:ring-1 focus:ring-lodgra-blue/20 outline-none text-sm font-bold"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-secondary)] mb-2 block">Cidade</label>
                      <input 
                        type="text" 
                        value={selectedProperty.city}
                        onChange={(e) => setSelectedProperty({...selectedProperty, city: e.target.value})}
                        className="w-full px-4 py-3 be-card border-[var(--border-primary)] bg-[var(--bg-primary)] focus:border-lodgra-blue focus:ring-1 focus:ring-lodgra-blue/20 outline-none text-sm font-bold"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-secondary)] mb-2 block">Diária</label>
                      <input 
                        type="text" 
                        value={selectedProperty.price}
                        onChange={(e) => setSelectedProperty({...selectedProperty, price: e.target.value})}
                        className="w-full px-4 py-3 be-card border-[var(--border-primary)] bg-[var(--bg-primary)] focus:border-lodgra-blue focus:ring-1 focus:ring-lodgra-blue/20 outline-none text-sm font-bold font-display"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-secondary)] mb-2 block">Tipo</label>
                      <select 
                        value={selectedProperty.type}
                        onChange={(e) => setSelectedProperty({...selectedProperty, type: e.target.value})}
                        className="w-full px-4 py-3 be-card border-[var(--border-primary)] bg-[var(--bg-primary)] focus:border-lodgra-blue focus:ring-1 focus:ring-lodgra-blue/20 outline-none text-sm font-bold appearance-none"
                      >
                        <option value="Apartamento">Apartamento</option>
                        <option value="Estúdio">Estúdio</option>
                        <option value="Moradia">Moradia</option>
                        <option value="Loft">Loft</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-secondary)] mb-2 block">Status</label>
                      <select 
                        value={selectedProperty.status}
                        onChange={(e) => setSelectedProperty({...selectedProperty, status: e.target.value})}
                        className="w-full px-4 py-3 be-card border-[var(--border-primary)] bg-[var(--bg-primary)] focus:border-lodgra-blue focus:ring-1 focus:ring-lodgra-blue/20 outline-none text-sm font-bold appearance-none"
                      >
                        <option value="Online">Online</option>
                        <option value="Offline">Offline</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-6">
                  <button 
                    type="button"
                    onClick={() => setIsEditModalOpen(false)}
                    className="be-button flex-1 py-3 border border-[var(--border-primary)] text-[var(--text-primary)] hover:bg-grey-100 dark:hover:bg-grey-800 font-bold uppercase text-[10px] tracking-widest"
                  >
                    Cancelar
                  </button>
                  <button 
                    type="submit"
                    className="be-button flex-1 py-3 bg-lodgra-blue text-white hover:bg-lodgra-blue-hover font-bold uppercase text-[10px] tracking-widest shadow-lg shadow-lodgra-blue/20"
                  >
                    Salvar Alterações
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

        {isDeleteOpen && selectedProperty && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDeleteOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="be-card w-full max-w-sm bg-[var(--bg-surface)] p-6 lg:p-8 relative z-10 shadow-2xl text-center"
            >
              <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                 <AlertCircle size={32} />
              </div>
              <h3 className="text-xl font-bold font-display mb-2 uppercase tracking-tight">Excluir Imóvel?</h3>
              <p className="text-[var(--text-secondary)] text-sm mb-8">
                Tem certeza que deseja remover <span className="text-[var(--text-primary)] font-bold">{selectedProperty.name}</span>? Esta ação não pode ser desfeita.
              </p>

              <div className="flex gap-3">
                <button 
                  onClick={() => setIsDeleteOpen(false)}
                  className="be-button flex-1 py-3 border border-[var(--border-primary)] text-[var(--text-primary)] hover:bg-grey-100 dark:hover:bg-grey-800 font-bold uppercase text-[10px] tracking-widest"
                >
                  Cancelar
                </button>
                <button 
                  onClick={confirmDelete}
                  className="be-button flex-1 py-3 bg-red-500 text-white hover:bg-red-600 font-bold uppercase text-[10px] tracking-widest"
                >
                  Excluir
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Global Style overrides for charts/scrollbar */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: var(--border-primary);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: var(--text-secondary);
        }
      `}</style>
    </div>
  );
}
