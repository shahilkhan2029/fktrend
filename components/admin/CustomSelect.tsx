'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

interface CustomSelectProps {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}

export default function CustomSelect({ label, value, options, onChange }: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-3 ml-1">{label}</label>
      
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between px-5 py-4 bg-zinc-50 border transition-all duration-300 rounded-2xl group ${
          isOpen ? 'border-[var(--color-gold)] ring-4 ring-[var(--color-gold)]/5 bg-white shadow-xl shadow-zinc-200/50' : 'border-zinc-200 hover:border-zinc-300'
        }`}
      >
        <span className={`text-sm font-bold tracking-tight ${value ? 'text-zinc-900' : 'text-zinc-400'}`}>
          {value || 'Select an option'}
        </span>
        <ChevronDown 
          size={18} 
          className={`text-zinc-400 group-hover:text-zinc-900 transition-transform duration-500 ${isOpen ? 'rotate-180 text-[var(--color-gold)]' : ''}`} 
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-[100] w-full mt-3 overflow-hidden bg-white/80 backdrop-blur-xl border border-zinc-100 rounded-[2rem] shadow-2xl shadow-zinc-900/10 transition-all duration-300 transform origin-top">
          <div className="max-h-64 overflow-y-auto py-2 px-1 custom-scrollbar">
            <style jsx>{`
              .custom-scrollbar::-webkit-scrollbar {
                width: 4px;
              }
              .custom-scrollbar::-webkit-scrollbar-track {
                background: transparent;
              }
              .custom-scrollbar::-webkit-scrollbar-thumb {
                background: #e4e4e7;
                border-radius: 10px;
              }
              .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                background: #d4d4d8;
              }
            `}</style>
            {options.map((option) => {
              const isActive = value === option;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    onChange(option);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-6 py-3.5 text-left text-sm font-bold transition-all duration-300 group ${
                    isActive 
                    ? 'bg-[var(--color-gold)]/10 text-[var(--color-gold)]' 
                    : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-950'
                  }`}
                >
                  <span className="tracking-tight">{option}</span>
                  {isActive && (
                    <div className="w-5 h-5 bg-[var(--color-gold)] rounded-full flex items-center justify-center">
                      <Check size={12} className="text-white" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
