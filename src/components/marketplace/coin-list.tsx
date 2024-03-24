'use client';

// static data
import { coinCardData } from '@/data/static/trading-data';

import dynamic from 'next/dynamic';
import Input from '@/components/ui/forms/input';
import SimpleBar from '@/components/ui/simplebar';
import { useScrollableSlider } from '@/lib/hooks/use-scrollable-slider';
import { Tab, TabItem, TabPanel, TabPanels } from '@/components/ui/tab';
import CoinCard from './coin-card';
import Loader from '@/components/ui/loader';

export default function CoinList() {
  return (
    <div className="h-full rounded-lg bg-light-dark p-4 pb-6 shadow-card sm:px-6 2xl:px-8 2xl:pb-9">
      <Input
        placeholder="Search..."
        autoComplete="off"
        inputClassName="mb-5 border-[#E2E8F0] !bg-light-dark appearance-none placeholder:!text-[#4B5563] !text-white"
      />
      <SimpleBar
        style={{ maxHeight: 550 }}
        className="@container -mx-0.5 px-0.5"
      >
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 xl:grid-cols-4">
          {coinCardData.map((item) => (
            <CoinCard key={`coin-card-details-${item.id}`} details={item} />
          ))}
        </div>
      </SimpleBar>
    </div>
  );
}
