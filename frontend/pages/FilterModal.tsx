import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '../components/UIComponents';

const CheckboxItem: React.FC<{ label: string; checked: boolean; onChange: () => void }> = ({ label, checked, onChange }) => (
  <div className="flex items-center space-x-3 py-2 cursor-pointer" onClick={onChange}>
    <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-colors ${checked ? 'bg-primary border-primary' : 'border-gray-300'}`}>
       {checked && <svg width="14" height="10" viewBox="0 0 14 10" fill="none"><path d="M12.3333 1L5 8.33333L1.66667 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
    </div>
    <span className={`text-base font-medium ${checked ? 'text-primary' : 'text-dark'}`}>{label}</span>
  </div>
);

const FilterModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [categories, setCategories] = useState({ eggs: true, noodles: false, chips: false, fastfood: false });
  const [brands, setBrands] = useState({ individual: false, cocola: true, ifad: false, kazi: false });

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-start justify-center pt-20">
       <div className="bg-[#F2F3F2] w-full max-w-md h-full md:h-auto md:rounded-3xl md:w-[90%] overflow-hidden flex flex-col rounded-t-3xl">
          <div className="bg-white p-5 flex items-center justify-between sticky top-0 border-b border-gray-100">
             <button onClick={onClose}><X size={24} /></button>
             <h2 className="text-xl font-bold">Filters</h2>
             <div className="w-6"></div>
          </div>
          
          <div className="p-5 overflow-y-auto flex-1 bg-[#F2F3F2]">
             <div className="mb-8">
               <h3 className="text-xl font-bold text-dark mb-4">Categories</h3>
               <CheckboxItem label="Eggs" checked={categories.eggs} onChange={() => setCategories({...categories, eggs: !categories.eggs})} />
               <CheckboxItem label="Noodles & Pasta" checked={categories.noodles} onChange={() => setCategories({...categories, noodles: !categories.noodles})} />
               <CheckboxItem label="Chips & Chips" checked={categories.chips} onChange={() => setCategories({...categories, chips: !categories.chips})} />
               <CheckboxItem label="Fast Food" checked={categories.fastfood} onChange={() => setCategories({...categories, fastfood: !categories.fastfood})} />
             </div>

             <div className="mb-4">
               <h3 className="text-xl font-bold text-dark mb-4">Brand</h3>
               <CheckboxItem label="Individual Collection" checked={brands.individual} onChange={() => setBrands({...brands, individual: !brands.individual})} />
               <CheckboxItem label="Cocola" checked={brands.cocola} onChange={() => setBrands({...brands, cocola: !brands.cocola})} />
               <CheckboxItem label="Ifad" checked={brands.ifad} onChange={() => setBrands({...brands, ifad: !brands.ifad})} />
               <CheckboxItem label="Kazi Farmas" checked={brands.kazi} onChange={() => setBrands({...brands, kazi: !brands.kazi})} />
             </div>
          </div>

          <div className="p-5 bg-[#F2F3F2]">
             <Button onClick={onClose}>Apply Filter</Button>
          </div>
       </div>
    </div>
  );
};

export default FilterModal;