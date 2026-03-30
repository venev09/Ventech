/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  PlusCircle, 
  Smartphone, 
  Gamepad2, 
  Laptop, 
  MapPin, 
  Calendar, 
  ChevronRight, 
  Trash2, 
  CheckCircle, 
  ArrowLeft,
  X,
  Filter,
  Menu,
  ShoppingBag,
  MessageCircle,
  Tag
} from 'lucide-react';
import { Listing, Category, Condition } from './types';
import { INITIAL_LISTINGS } from './constants';

// --- Components ---

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/10 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform">
            VT
          </div>
          <div className="hidden sm:block">
            <h1 className="text-xl font-bold tracking-tight">VenTech</h1>
            <p className="text-[10px] text-text-muted uppercase tracking-widest leading-none">Техника, която вдъхновира</p>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link to="/listings" className="text-sm font-medium hover:text-primary transition-colors">Обяви</Link>
          <Link to="/sell" className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold hover:bg-primary hover:text-white transition-all">
            <PlusCircle size={18} />
            Продай
          </Link>
          <Link to="/admin" className="text-sm font-medium text-text-muted hover:text-white transition-colors">Админ</Link>
        </div>

        <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-surface border-b border-white/10 p-4 flex flex-col gap-4 md:hidden shadow-2xl"
          >
            <Link to="/listings" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium">Всички обяви</Link>
            <Link to="/sell" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium text-primary flex items-center gap-2">
              <PlusCircle size={20} /> Продай техника
            </Link>
            <Link to="/admin" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium text-text-muted">Админ панел</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const ListingCard = ({ listing }: { listing: Listing }) => {
  return (
    <motion.div 
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-surface rounded-2xl overflow-hidden border border-white/5 hover:border-primary/30 transition-all group relative"
    >
      <Link to={`/listing/${listing.id}`}>
        <div className="aspect-[4/3] overflow-hidden relative">
          <img 
            src={listing.images[0]} 
            alt={listing.title} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            referrerPolicy="no-referrer"
          />
          <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border border-white/10">
            {listing.condition}
          </div>
          {listing.isSold && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <span className="px-4 py-2 bg-red-500 text-white font-bold rounded-lg rotate-[-12deg] border-2 border-white">ПРОДАДЕНО</span>
            </div>
          )}
        </div>
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors">{listing.title}</h3>
            <span className="text-primary font-black text-lg">{listing.price} лв</span>
          </div>
          <div className="flex items-center gap-4 text-xs text-text-muted">
            <div className="flex items-center gap-1">
              <MapPin size={14} />
              {listing.location}
            </div>
            <div className="flex items-center gap-1">
              <Calendar size={14} />
              {new Date(listing.date).toLocaleDateString('bg-BG')}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

// --- Pages ---

const HomePage = ({ listings }: { listings: Listing[] }) => {
  const featured = listings.filter(l => !l.isSold).slice(0, 4);

  return (
    <div className="space-y-16 pb-20">
      {/* Hero */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/60 to-background z-10" />
          <img 
            src="https://picsum.photos/seed/tech-hero/1920/1080?blur=5" 
            className="w-full h-full object-cover opacity-40"
            referrerPolicy="no-referrer"
          />
        </div>
        
        <div className="relative z-20 text-center px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-8xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent tracking-tighter">
              VEN TECH
            </h1>
            <p className="text-xl md:text-3xl font-light text-text-muted mb-10 italic">
              "Техника, която вдъхновира"
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/listings" className="w-full sm:w-auto px-8 py-4 bg-primary text-white rounded-2xl font-bold text-lg shadow-xl shadow-primary/30 hover:scale-105 transition-all">
                Разгледай обявите
              </Link>
              <Link to="/sell" className="w-full sm:w-auto px-8 py-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl font-bold text-lg hover:bg-white/10 transition-all">
                Продай своята техника
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
          <Filter className="text-primary" /> Категории
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: 'Phones', label: 'Телефони', icon: Smartphone, color: 'from-blue-500 to-cyan-400' },
            { name: 'PlayStations', label: 'Конзоли', icon: Gamepad2, color: 'from-purple-600 to-indigo-500' },
            { name: 'Laptops', label: 'Лаптопи', icon: Laptop, color: 'from-pink-500 to-rose-400' },
          ].map((cat) => (
            <Link 
              key={cat.name}
              to={`/listings?category=${cat.name}`}
              className="group relative h-48 rounded-3xl overflow-hidden border border-white/5"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-20 group-hover:opacity-40 transition-opacity`} />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                <cat.icon size={48} className="text-white group-hover:scale-110 transition-transform" />
                <span className="text-2xl font-black uppercase tracking-widest">{cat.label}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Последни обяви</h2>
          <Link to="/listings" className="text-primary font-semibold flex items-center gap-1 hover:underline">
            Виж всички <ChevronRight size={18} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map(listing => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </section>
    </div>
  );
};

const ListingsPage = ({ listings }: { listings: Listing[] }) => {
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>(searchParams.get('category') || 'All');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [conditionFilter, setConditionFilter] = useState<string>('All');

  const filteredListings = useMemo(() => {
    return listings.filter(l => {
      const matchesSearch = l.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === 'All' || l.category === categoryFilter;
      const matchesCondition = conditionFilter === 'All' || l.condition === conditionFilter;
      const matchesPrice = l.price >= priceRange[0] && l.price <= priceRange[1];
      return matchesSearch && matchesCategory && matchesCondition && matchesPrice && !l.isSold;
    });
  }, [listings, searchTerm, categoryFilter, conditionFilter, priceRange]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col md:flex-row gap-8">
      {/* Sidebar */}
      <aside className="w-full md:w-64 space-y-8">
        <div>
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Search size={18} className="text-primary" /> Търсене
          </h3>
          <div className="relative">
            <input 
              type="text" 
              placeholder="Търси продукт..."
              className="w-full bg-surface border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-4">Категория</h3>
          <div className="flex flex-col gap-2">
            {['All', 'Phones', 'PlayStations', 'Laptops'].map(cat => (
              <button 
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`text-left px-4 py-2 rounded-lg text-sm transition-all ${categoryFilter === cat ? 'bg-primary text-white' : 'hover:bg-white/5 text-text-muted'}`}
              >
                {cat === 'All' ? 'Всички' : cat === 'Phones' ? 'Телефони' : cat === 'PlayStations' ? 'Конзоли' : 'Лаптопи'}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-4">Състояние</h3>
          <div className="flex flex-col gap-2">
            {['All', 'Excellent', 'Good', 'Fair'].map(cond => (
              <button 
                key={cond}
                onClick={() => setConditionFilter(cond)}
                className={`text-left px-4 py-2 rounded-lg text-sm transition-all ${conditionFilter === cond ? 'bg-secondary text-white' : 'hover:bg-white/5 text-text-muted'}`}
              >
                {cond === 'All' ? 'Всички' : cond}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-4 text-text-muted">Цена (до {priceRange[1]} лв)</h3>
          <input 
            type="range" 
            min="0" 
            max="5000" 
            step="50"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
            className="w-full accent-primary"
          />
        </div>
      </aside>

      {/* Grid */}
      <main className="flex-1">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Обяви</h2>
          <span className="text-text-muted text-sm">{filteredListings.length} намерени</span>
        </div>

        {filteredListings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredListings.map(listing => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-surface rounded-3xl border border-dashed border-white/10">
            <ShoppingBag size={48} className="mx-auto text-text-muted mb-4 opacity-20" />
            <p className="text-text-muted">Няма намерени обяви по тези критерии.</p>
          </div>
        )}
      </main>
    </div>
  );
};

const ListingDetailPage = ({ listings }: { listings: Listing[] }) => {
  const { id } = useParams();
  const listing = listings.find(l => l.id === id);
  const navigate = useNavigate();

  if (!listing) return <div className="p-20 text-center">Обявата не е намерена.</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-text-muted hover:text-white mb-8 transition-colors">
        <ArrowLeft size={20} /> Назад
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Gallery */}
        <div className="space-y-4">
          <div className="aspect-square rounded-3xl overflow-hidden border border-white/10">
            <img 
              src={listing.images[0]} 
              alt={listing.title} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {listing.images.map((img, i) => (
              <div key={i} className="aspect-square rounded-xl overflow-hidden border border-white/10 opacity-50 hover:opacity-100 cursor-pointer transition-opacity">
                <img src={img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="space-y-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-xs font-bold uppercase tracking-widest">{listing.category}</span>
              <span className="px-3 py-1 bg-secondary/20 text-secondary rounded-full text-xs font-bold uppercase tracking-widest">{listing.condition}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-2">{listing.title}</h1>
            <p className="text-3xl font-bold text-primary">{listing.price} лв</p>
          </div>

          <div className="bg-surface p-6 rounded-2xl border border-white/5 space-y-4">
            <h3 className="font-bold text-lg border-b border-white/5 pb-2">Описание</h3>
            <p className="text-text-muted leading-relaxed">{listing.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-surface p-4 rounded-xl border border-white/5 flex items-center gap-3">
              <MapPin className="text-primary" />
              <div>
                <p className="text-[10px] text-text-muted uppercase font-bold">Локация</p>
                <p className="font-semibold">{listing.location}</p>
              </div>
            </div>
            <div className="bg-surface p-4 rounded-xl border border-white/5 flex items-center gap-3">
              <Calendar className="text-secondary" />
              <div>
                <p className="text-[10px] text-text-muted uppercase font-bold">Дата</p>
                <p className="font-semibold">{new Date(listing.date).toLocaleDateString('bg-BG')}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <a 
              href={`tel:${listing.sellerContact}`}
              className="flex-1 flex items-center justify-center gap-2 bg-primary text-white py-4 rounded-2xl font-bold text-lg hover:scale-[1.02] transition-all shadow-lg shadow-primary/20"
            >
              <MessageCircle size={24} /> Свържи се с продавача
            </a>
            <button className="flex-1 flex items-center justify-center gap-2 bg-white/5 border border-white/10 py-4 rounded-2xl font-bold text-lg hover:bg-white/10 transition-all">
              <Tag size={24} /> Направи оферта
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const SellPage = ({ onAddListing }: { onAddListing: (l: Listing) => void }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    category: 'Phones' as Category,
    price: '',
    condition: 'Excellent' as Condition,
    description: '',
    location: '',
    contact: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newListing: Listing = {
      id: Math.random().toString(36).substr(2, 9),
      title: formData.title,
      category: formData.category,
      price: parseFloat(formData.price),
      condition: formData.condition,
      location: formData.location,
      date: new Date().toISOString().split('T')[0],
      description: formData.description,
      images: [`https://picsum.photos/seed/${formData.title}/800/600`],
      sellerContact: formData.contact,
      isSold: false
    };
    onAddListing(newListing);
    navigate('/listings');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-black mb-8 text-center">Публикувай обява</h1>
      
      <form onSubmit={handleSubmit} className="bg-surface p-8 rounded-3xl border border-white/5 space-y-6 shadow-2xl">
        <div className="space-y-2">
          <label className="text-sm font-bold text-text-muted uppercase tracking-wider">Заглавие</label>
          <input 
            required
            type="text" 
            className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary"
            placeholder="напр. iPhone 15 Pro Max 256GB"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-text-muted uppercase tracking-wider">Категория</label>
            <select 
              className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary"
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value as Category})}
            >
              <option value="Phones">Телефони</option>
              <option value="PlayStations">Конзоли</option>
              <option value="Laptops">Лаптопи</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-text-muted uppercase tracking-wider">Цена (лв)</label>
            <input 
              required
              type="number" 
              className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary"
              placeholder="0.00"
              value={formData.price}
              onChange={(e) => setFormData({...formData, price: e.target.value})}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-text-muted uppercase tracking-wider">Състояние</label>
          <div className="flex gap-4">
            {(['Excellent', 'Good', 'Fair'] as Condition[]).map(c => (
              <button
                key={c}
                type="button"
                onClick={() => setFormData({...formData, condition: c})}
                className={`flex-1 py-3 rounded-xl border text-sm font-bold transition-all ${formData.condition === c ? 'bg-primary border-primary text-white' : 'bg-background border-white/10 text-text-muted'}`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-text-muted uppercase tracking-wider">Описание</label>
          <textarea 
            required
            rows={4}
            className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary"
            placeholder="Опишете състоянието, комплекта и други детайли..."
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-text-muted uppercase tracking-wider">Град</label>
            <input 
              required
              type="text" 
              className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary"
              placeholder="напр. София"
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-text-muted uppercase tracking-wider">Телефон за връзка</label>
            <input 
              required
              type="tel" 
              className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary"
              placeholder="+359..."
              value={formData.contact}
              onChange={(e) => setFormData({...formData, contact: e.target.value})}
            />
          </div>
        </div>

        <button 
          type="submit"
          className="w-full bg-gradient-to-r from-primary to-secondary text-white py-4 rounded-2xl font-black text-xl shadow-xl shadow-primary/20 hover:scale-[1.01] transition-all"
        >
          Публикувай обявата
        </button>
      </form>
    </div>
  );
};

const AdminPage = ({ listings, onDelete, onToggleSold }: { listings: Listing[], onDelete: (id: string) => void, onToggleSold: (id: string) => void }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-black">Админ Панел</h1>
        <span className="bg-surface px-4 py-2 rounded-full border border-white/10 text-sm font-bold">{listings.length} обяви общо</span>
      </div>

      <div className="bg-surface rounded-3xl border border-white/5 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white/5 text-text-muted text-[10px] uppercase tracking-widest font-bold">
                <th className="px-6 py-4">Продукт</th>
                <th className="px-6 py-4">Категория</th>
                <th className="px-6 py-4">Цена</th>
                <th className="px-6 py-4">Статус</th>
                <th className="px-6 py-4 text-right">Действия</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {listings.map(listing => (
                <tr key={listing.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={listing.images[0]} className="w-10 h-10 rounded-lg object-cover" referrerPolicy="no-referrer" />
                      <span className="font-semibold">{listing.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-text-muted">{listing.category}</td>
                  <td className="px-6 py-4 font-bold">{listing.price} лв</td>
                  <td className="px-6 py-4">
                    {listing.isSold ? (
                      <span className="px-2 py-1 bg-red-500/20 text-red-500 rounded text-[10px] font-bold uppercase">Продадено</span>
                    ) : (
                      <span className="px-2 py-1 bg-green-500/20 text-green-500 rounded text-[10px] font-bold uppercase">Активно</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => onToggleSold(listing.id)}
                        className={`p-2 rounded-lg transition-colors ${listing.isSold ? 'text-text-muted hover:text-green-500' : 'text-green-500 hover:bg-green-500/10'}`}
                        title={listing.isSold ? "Маркирай като активно" : "Маркирай като продадено"}
                      >
                        <CheckCircle size={20} />
                      </button>
                      <button 
                        onClick={() => onDelete(listing.id)}
                        className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                        title="Изтрий обявата"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const Footer = () => (
  <footer className="bg-surface border-t border-white/5 py-12 mt-20">
    <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center text-white font-bold">VT</div>
          <span className="text-xl font-bold">VenTech</span>
        </div>
        <p className="text-text-muted text-sm leading-relaxed">
          Най-доброто място за покупка и продажба на втора употреба техника в България.
        </p>
      </div>
      <div>
        <h4 className="font-bold mb-4 uppercase text-xs tracking-widest text-primary">Бързи връзки</h4>
        <ul className="space-y-2 text-sm text-text-muted">
          <li><Link to="/listings" className="hover:text-white transition-colors">Всички обяви</Link></li>
          <li><Link to="/sell" className="hover:text-white transition-colors">Продай техника</Link></li>
          <li><Link to="/admin" className="hover:text-white transition-colors">Админ панел</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold mb-4 uppercase text-xs tracking-widest text-secondary">Категории</h4>
        <ul className="space-y-2 text-sm text-text-muted">
          <li><Link to="/listings?category=Phones" className="hover:text-white transition-colors">Телефони</Link></li>
          <li><Link to="/listings?category=PlayStations" className="hover:text-white transition-colors">Конзоли</Link></li>
          <li><Link to="/listings?category=Laptops" className="hover:text-white transition-colors">Лаптопи</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold mb-4 uppercase text-xs tracking-widest text-accent">Контакт</h4>
        <p className="text-sm text-text-muted">София, България</p>
        <p className="text-sm text-text-muted">support@ventech.bg</p>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-white/5 text-center text-xs text-text-muted">
      &copy; {new Date().getFullYear()} VenTech. Всички права запазени.
    </div>
  </footer>
);

// --- Main App ---

export default function App() {
  const [listings, setListings] = useState<Listing[]>(() => {
    const saved = localStorage.getItem('ventech_listings');
    return saved ? JSON.parse(saved) : INITIAL_LISTINGS;
  });

  useEffect(() => {
    localStorage.setItem('ventech_listings', JSON.stringify(listings));
  }, [listings]);

  const handleAddListing = (newListing: Listing) => {
    setListings(prev => [newListing, ...prev]);
  };

  const handleDeleteListing = (id: string) => {
    if (window.confirm('Сигурни ли сте, че искате да изтриете тази обява?')) {
      setListings(prev => prev.filter(l => l.id !== id));
    }
  };

  const handleToggleSold = (id: string) => {
    setListings(prev => prev.map(l => l.id === id ? { ...l, isSold: !l.isSold } : l));
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col selection:bg-primary selection:text-white">
        <Navbar />
        
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage listings={listings} />} />
            <Route path="/listings" element={<ListingsPage listings={listings} />} />
            <Route path="/listing/:id" element={<ListingDetailPage listings={listings} />} />
            <Route path="/sell" element={<SellPage onAddListing={handleAddListing} />} />
            <Route path="/admin" element={
              <AdminPage 
                listings={listings} 
                onDelete={handleDeleteListing} 
                onToggleSold={handleToggleSold} 
              />
            } />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}
