/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
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
  Search
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

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-300 font-body">
      {/* Header Navigation */}
      <nav className="h-16 border-b border-[var(--border-primary)] bg-[var(--bg-surface)] px-8 flex items-center justify-between shrink-0 z-50">
        <div className="flex items-center gap-10 h-full">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-lodgra-navy rounded-lg flex items-center justify-center">
              <Home className="w-5 h-5 text-lodgra-yellow" strokeWidth={2.5} />
            </div>
            <span className="text-xl font-bold tracking-tight font-display text-lodgra-navy dark:text-white">Lodgra</span>
          </div>
          <div className="flex gap-2 text-[13px] font-bold text-[var(--text-secondary)] h-full items-center">
            <a href="#" className="flex items-center px-4 h-full border-b-2 border-lodgra-blue text-lodgra-blue transition-colors">Dashboard</a>
            <a href="#" className="flex items-center px-4 h-full border-b-2 border-transparent hover:border-grey-300 hover:text-[var(--text-primary)] transition-all">Propriedades</a>
            <a href="#" className="flex items-center px-4 h-full border-b-2 border-transparent hover:border-grey-300 hover:text-[var(--text-primary)] transition-all">Reservas</a>
            <a href="#" className="flex items-center px-4 h-full border-b-2 border-transparent hover:border-grey-300 hover:text-[var(--text-primary)] transition-all">Financeiro</a>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-grey-100 dark:hover:bg-grey-800 transition-all text-grey-500 hover:text-lodgra-blue"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold leading-none">fabiolpgomes</p>
              <p className="text-[10px] text-[var(--text-secondary)] font-medium mt-1">Admin Account</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-lodgra-navy border-2 border-white flex items-center justify-center text-white text-xs font-bold">F</div>
          </div>
          <button className="be-button px-4 py-2 text-xs border border-[var(--border-primary)] hover:bg-grey-100 dark:hover:bg-grey-800 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
            <LogOut className="w-3.5 h-3.5" />
            Sair
          </button>
        </div>
      </nav>

      {/* Content */}
      <main className="flex-1 overflow-y-auto p-8 custom-scrollbar">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header Title */}
          <div className="flex justify-between items-end">
            <div>
              <h2 className="text-3xl font-bold tracking-tight font-display mb-1">Painel Gerencial</h2>
              <p className="text-sm text-[var(--text-secondary)] font-medium">Indicadores de desempenho e faturamento Lodgra</p>
            </div>
            <div className="flex gap-3">
              <button className="be-button px-5 py-2.5 bg-lodgra-blue text-white hover:bg-lodgra-blue-hover text-sm shadow-sm active:scale-95 transition-all">
                <Plus size={18} strokeWidth={3} className="mr-1" /> Nova Reserva
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
                  <div className="bg-[var(--bg-secondary)] rounded-lg p-7 flex flex-col justify-center border border-[var(--border-primary)] relative overflow-hidden group/box">
                    <div className="absolute top-4 right-4 text-lodgra-blue opacity-5 group-hover/box:opacity-10 transition-opacity">
                      <Wallet size={64} />
                    </div>
                    <span className="text-[10px] uppercase text-[var(--text-secondary)] font-bold mb-4 tracking-widest">Previsão Contratada</span>
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
                      <h3 className="text-[11px] font-bold uppercase tracking-[0.1em]">Receita Estimada</h3>
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
                <h2 className="text-[11px] font-bold uppercase tracking-[0.15em] mb-8 flex items-center gap-2 text-[var(--text-primary)]">
                  <Clock className="w-3.5 h-3.5 text-lodgra-blue" /> Check-ins Próximos
                </h2>
                
                <div className="space-y-3 flex-1 overflow-y-auto custom-scrollbar pr-1">
                  {arrivals.map((arrival, index) => (
                    <div key={index} className="px-5 py-5 bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded hover:border-lodgra-blue transition-all cursor-pointer group relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-1 h-full bg-lodgra-blue opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <div className="flex justify-between items-start mb-4">
                        <div className="min-w-0 pr-4">
                          <h4 className="text-sm font-bold truncate group-hover:text-lodgra-blue transition-colors uppercase tracking-tight">{arrival.guest}</h4>
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
        </div>
      </main>
      
      {/* Footer */}
      <footer className="h-10 border-t border-[var(--border-primary)] bg-[var(--bg-primary)] flex items-center justify-between px-8 text-[9px] text-[var(--text-secondary)] font-mono shrink-0 uppercase tracking-[0.2em]">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-lodgra-green shadow-[0_0_8px_rgba(5,150,105,0.4)]"></div>
          Lodgra Precision v2.5.2
        </div>
        <div className="flex items-center gap-8">
          <span className="hover:text-lodgra-blue cursor-pointer transition-colors uppercase">Sistema: Operacional</span>
          <span className="text-lodgra-navy dark:text-white font-bold opacity-60">© 2024 Lodgra</span>
        </div>
      </footer>

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
