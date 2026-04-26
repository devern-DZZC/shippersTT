import React, { useState, useEffect } from 'react';
import { RefreshCw, Minimize2, ExternalLink, XCircle, AlertTriangle, Info, Instagram } from 'lucide-react';

interface WidgetProps {
  state: any;
  onLaunch: () => void;
  onRefresh: () => void;
  onRecalculate: (overrides: { category: string; weight_lbs: number }) => void;
  onClose: () => void;
}

const CATEGORY_OPTIONS = [
  'bag', 'car parts', 'clothing', 'electronics', 'laptop', 'perfume', 'phone', 'shoes', 'other',
];

export function Widget({ state, onLaunch, onRefresh, onRecalculate, onClose }: WidgetProps) {
  const [formCategory, setFormCategory] = useState(state.form?.category || state.classification?.category || 'other');
  const [formWeight, setFormWeight] = useState(String(state.form?.weight_lbs ?? state.classification?.estimated_weight_lbs ?? ''));

  useEffect(() => {
    if (state.classification?.category) setFormCategory(state.classification.category);
    if (state.classification?.estimated_weight_lbs) setFormWeight(String(state.classification.estimated_weight_lbs));
    if (state.form?.category) setFormCategory(state.form.category);
    if (state.form?.weight_lbs) setFormWeight(String(state.form.weight_lbs));
  }, [state.classification, state.form]);

  if (state.status === 'collapsed') {
    return (
      <button
        onClick={onLaunch}
        className="fixed right-6 bottom-6 z-[2147483647] bg-[#0077b6] hover:bg-[#062b84] hover:shadow-2xl hover:shadow-[#062b84]/40 hover:-translate-y-1 hover:scale-105 transition-all duration-300 text-white font-bold py-3.5 px-6 rounded-full shadow-xl flex items-center gap-3 group font-display border border-[#38bdf8]/30"
      >
        <div className="bg-white p-0.5 rounded-full overflow-hidden shadow-sm">
          <img src={chrome.runtime.getURL('shippers_logo.jpeg')} alt="Shippers TT" className="w-6 h-6 rounded-full group-hover:rotate-12 transition-transform object-cover" />
        </div>
        <span className="tracking-wide">ShippersTT Quote</span>
      </button>
    );
  }

  const quote = state.quote || {};
  const product = state.product || {};

  const handleRecalculate = (e: React.FormEvent) => {
    e.preventDefault();
    onRecalculate({
      category: formCategory,
      weight_lbs: Number.parseFloat(formWeight),
    });
  };

  const money = (val: number) => {
    if (typeof val !== 'number' || Number.isNaN(val)) return 'TTD $0.00';
    return `TTD $${val.toFixed(2)}`;
  };

  const statusLabel = {
    loading: 'Fetching quote...',
    quoted: '',
    error: 'Quote unavailable',
    'not-product-page': '',
  }[state.status as string] ?? '';

  const showBreakdown = state.status === 'quoted';

  return (
    <div className="fixed right-6 bottom-6 w-[380px] z-[2147483647] font-sans antialiased text-[#010a21] rounded-3xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(6,43,132,0.3)] border border-[#0077b6]/30 bg-white flex flex-col max-h-[85vh] animate-in slide-in-from-bottom-8 fade-in duration-300 ring-4 ring-[#0077b6]/20">

      {/* Header */}
      <div className="bg-[#062b84] px-5 py-4 flex items-center justify-between relative overflow-hidden shadow-md">
        {/* Subtle decorative overlay */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full blur-2xl -mr-8 -mt-8 pointer-events-none"></div>
        <div className="flex gap-3.5 items-center relative z-10 w-full pr-4">
          <div className="bg-white p-1.5 rounded-xl shadow-lg shrink-0 border border-white/20">
            <img src={chrome.runtime.getURL('shippers_logo.jpeg')} alt="Logo" className="w-[42px] h-[42px] rounded-lg object-cover" />
          </div>
          <div className="flex-1 truncate">
            <h1 className="text-[22px] font-display font-black tracking-wide text-white drop-shadow-md leading-tight">SHIPPERSTT</h1>
            {statusLabel && <div className="text-[12px] font-bold text-[#67e8f9] mb-0.5 tracking-wide">{statusLabel}</div>}
          </div>
        </div>
        <button onClick={onClose} className="p-2 rounded-full hover:bg-[#0077b6] text-white transition-colors relative z-10 shrink-0" title="Minimize">
          <Minimize2 size={18} />
        </button>
      </div>

      {/* Scrollable Content Container */}
      <div className="flex-1 overflow-y-auto px-5 py-5 space-y-5 bg-[#f8fbff]">

        {/* Product Summary */}
        {!['loading', 'error', 'collapsed', 'not-product-page'].includes(state.status as string) && (
          <div className="space-y-1">
            <div className="font-bold text-[15px] leading-snug line-clamp-2 text-[#010a21]">
              {product.title || state.scraped?.title || 'Amazon item'}
            </div>
            <div className="text-[13px] text-[#005f8f] font-semibold bg-white border border-[#0077b6]/20 px-2 py-1 rounded inline-block shadow-sm">
              Amazon USD ${typeof product.price_usd === 'number' ? product.price_usd.toFixed(2) : state.scraped?.price_usd?.toFixed?.(2) || '0.00'}
            </div>
          </div>
        )}

        {/* Warnings */}
        {state.warnings?.length > 0 && (
          <div className="space-y-2">
            {state.warnings.map((w: string, i: number) => (
              <div key={i} className="flex gap-2 p-3 bg-[#fff4db] text-[#8a5a00] border border-[rgba(196,136,0,0.2)] rounded-2xl text-[12px] leading-relaxed font-medium">
                <AlertTriangle size={16} className="shrink-0 mt-0.5" />
                <span>{w}</span>
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {state.status === 'error' && (
          <div className="flex gap-2 p-3 bg-[#fee2e2] text-[#991b1b] border border-[rgba(153,27,27,0.15)] rounded-2xl text-[12px] leading-relaxed font-medium">
            <XCircle size={16} className="shrink-0 mt-0.5" />
            <span>{state.error || 'Unable to generate a quote.'}</span>
          </div>
        )}

        {/* Loading */}
        {state.status === 'loading' && (
          <div className="py-10 flex flex-col items-center justify-center text-[#0077b6] space-y-4">
            <RefreshCw size={36} className="animate-spin text-[#38bdf8]" />
            <div className="text-[14px] font-bold animate-pulse text-[#062b84]">Analyzing product details...</div>
          </div>
        )}

        {/* Not a product page */}
        {state.status === 'not-product-page' && (
          <div className="p-8 flex flex-col items-center justify-center text-center space-y-4 bg-[#f8fbff] relative z-20 min-h-[250px]">
            <div className="bg-[#e0f0ff] p-4 rounded-full text-[#0077b6] mb-2 ring-4 ring-white shadow-sm">
              <Info size={32} />
            </div>
            <h3 className="text-[18px] font-display font-black text-[#062b84]">Not an item page</h3>
            <p className="text-[14px] text-[#005f8f] leading-relaxed max-w-[240px] font-medium">
              Navigate to an Amazon product page, then open the widget to estimate your shipping cost.
            </p>
          </div>
        )}

        {/* Quote Breakdown */}
        {showBreakdown && quote && (
          <div className="bg-white rounded-2xl p-4.5 border border-[#cbd5e1] space-y-3 shadow-md shadow-[#062b84]/5 relative overflow-hidden">
            {/* Subtle highlight left border */}
            <div className="absolute top-0 left-0 w-1 h-full bg-[#0077b6]"></div>

            <div className="flex justify-between text-[13px]">
              <span className="text-[#005f8f] font-medium">Item Cost</span>
              <span className="font-bold">{money(quote.item_cost)}</span>
            </div>
            <div className="flex justify-between text-[13px]">
              <span className="text-[#005f8f] font-medium">US Sales Tax</span>
              <span className="font-bold">{money(quote.tax)}</span>
            </div>
            <div className="flex justify-between text-[13px]">
              <span className="text-[#005f8f] font-medium">Shipping & Clearing</span>
              <span className="font-bold">{money(quote.shipping)}</span>
            </div>
            {quote.service_charge > 0 && (
              <div className="flex justify-between text-[13px]">
                <span className="text-[#005f8f] font-medium">Logistics Fee</span>
                <span className="font-bold">{money(quote.service_charge)}</span>
              </div>
            )}
            <div className="pt-3.5 mt-3 border-t border-slate-200 flex justify-between items-center bg-[#f8fbff] -mx-4.5 -mb-4.5 p-4.5 shadow-inner">
              <span className="font-bold text-[14px] text-[#010a21]">Total Cost</span>
              <span className="font-display font-black text-[22px] text-[#062b84] tracking-tight">{money(quote.total_cost)}</span>
            </div>
          </div>
        )}

      </div>

      {/* Form Container */}
      {!['loading', 'not-product-page'].includes(state.status as string) && (
        <form className="bg-[#f0f6ff] p-5 border-t border-[#cbd5e1] space-y-4 shrink-0 shadow-[0_-4px_10px_rgba(0,0,0,0.02)] relative z-20" onSubmit={handleRecalculate}>
          <div className="flex justify-between mb-2 items-center">
            <span className="text-[12px] uppercase font-black text-[#0077b6] flex items-center gap-1.5 tracking-wide">
              <ExternalLink size={14} /> Edit Details
            </span>
          </div>

          <div className="space-y-3.5">
            <div className="space-y-1.5">
              <label className="text-[12px] font-bold text-[#005f8f]">Category</label>
              <select
                value={formCategory}
                onChange={(e) => setFormCategory(e.target.value)}
                className="w-full bg-white border border-[#cbd5e1] rounded-xl py-2.5 px-3.5 text-[14px] font-semibold text-[#010a21] shadow-sm outline-none focus:ring-4 focus:ring-[#38bdf8]/30 focus:border-[#0077b6] transition-all cursor-pointer appearance-none"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23005f8f'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', backgroundSize: '1rem' }}
              >
                {CATEGORY_OPTIONS.map(cat => (
                  <option key={cat} value={cat}>
                    {cat.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-[12px] font-bold text-[#005f8f]">Weight (lbs)</label>
              <input
                type="number"
                min="0.1" step="0.1"
                value={formWeight}
                onChange={(e) => setFormWeight(e.target.value)}
                className="w-full bg-white border border-[#cbd5e1] rounded-xl py-2.5 px-3.5 text-[14px] font-semibold text-[#010a21] shadow-sm outline-none focus:ring-4 focus:ring-[#38bdf8]/30 focus:border-[#0077b6] transition-all placeholder:font-normal"
                placeholder="2.0"
              />
            </div>
          </div>

          <div className="pt-3 flex gap-3">
            <button type="submit" className="flex-1 bg-[#0077b6] hover:bg-[#062b84] hover:shadow-lg hover:shadow-[#062b84]/20 hover:-translate-y-[1px] transition-all text-white rounded-xl py-3 px-4 text-[14px] font-bold outline-none focus:ring-4 focus:ring-[#0077b6]/50">
              Recalculate
            </button>
            <button type="button" onClick={onRefresh} className="flex-1 bg-white hover:bg-[#e0f0ff] border-2 border-[#0077b6] text-[#0077b6] rounded-xl py-3 px-4 text-[14px] font-bold shadow-sm outline-none transition-all flex items-center justify-center gap-2">
              <RefreshCw size={14} className="group-hover:rotate-180 transition-transform" /> Refresh
            </button>
          </div>

          <div className="text-[11px] italic text-[#64748b] text-center leading-tight mt-4 max-w-[95%] mx-auto">
            * This quote is an estimate. Final costs are subject to change upon package verification at our warehouse.
          </div>

          <a href="https://www.instagram.com/shippers.tt_" target="_blank" rel="noreferrer" className="mt-4 flex items-center justify-center gap-2.5 w-full bg-[#062b84] hover:bg-[#0077b6] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 text-white rounded-xl py-3.5 px-4 text-[14px] font-bold shadow-md outline-none">
            <Instagram size={18} />
            Message us on Instagram
          </a>
        </form>
      )}
    </div>
  );
}
