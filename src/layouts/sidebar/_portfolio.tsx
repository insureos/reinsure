import cn from 'classnames';
import Scrollbar from '@/components/ui/scrollbar';
import TopupButton from '@/components/ui/topup-button';
import { motion } from 'framer-motion';
//images
import AuthorImage from '@/assets/images/author.jpg';
import ComparisonChart from '@/components/ui/chats/comparison-chart';
import { LivePriceFeed } from '@/components/ui/live-price-feed';
import BitcoinImage from '@/assets/images/coin/bitcoin.svg';
import { Bitcoin } from '@/components/icons/bitcoin';
import { RadioGroup } from '@headlessui/react';
import { useContext, useState } from 'react';
import ListCard from '@/components/ui/list-card';
import PooltoGether from '@/assets/images/portfolio/poolto-gether.svg';

const priceFeed = {
  id: '0',
  name: 'Bitcoin',
  symbol: 'BTC',
  balance: '0.2231345',
  usdBalance: '11,032.24',
  logo: BitcoinImage,
  change: '+12.5%',
  isChangePositive: true,
  isBorder: false,
  color: '#FDEDD4',
  icon: <Bitcoin />,
  prices: [
    { name: 1, value: 15187.44 },
    { name: 2, value: 21356.99 },
    { name: 3, value: 34698.98 },
    { name: 4, value: 37587.55 },
    { name: 5, value: 17577.4 },
    { name: 6, value: 26577.4 },
    { name: 7, value: 23577.4 },
    { name: 8, value: 18577.4 },
    { name: 9, value: 28577.4 },
  ],
};

const bestPerformer = {
  id: 1,
  name: 'POOLTOGETHER',
  coinType: 'Ethereum',
  logo: PooltoGether,
  balance: '$2,215.43',
};

const bestUnderwriter = {
  id: 1,
  name: 'BTC',
  logo: BitcoinImage,
  balance: '$2,518.78',
};

interface RadioOptionProps {
  value: string;
}

function RadioGroupOption({ value }: RadioOptionProps) {
  return (
    <RadioGroup.Option value={value}>
      {({ checked }) => (
        <span
          className={`relative flex h-8 cursor-pointer items-center justify-center whitespace-pre rounded-lg px-3 text-2xs xl:text-xs 3xl:text-sm ${
            checked ? 'text-white' : 'text-gray-400'
          }`}
        >
          {checked && (
            <motion.span
              className="absolute bottom-0 left-0 right-0 h-full w-full rounded-lg bg-brand shadow-large"
              layoutId="statusIndicator"
            />
          )}
          <span className="relative">{value}</span>
        </span>
      )}
    </RadioGroup.Option>
  );
}

export default function Sidebar({ className }: { className?: string }) {
  const [status, setStatus] = useState('Month');

  const handleOnChange = (value: string) => {
    setStatus(value);
  };
  return (
    <aside
      className={cn(
        'left-0 top-0 z-20 h-full w-full max-w-full overflow-hidden border-dashed border-gray-700 lg:fixed lg:w-80 lg:border-l xl:pt-20 3xl:w-[350px]',
        className
      )}
    >
      <div className="relative z-20 h-full overflow-auto pb-5">
        <div className="mx-0 mx-5 mt-2 flex flex-col justify-between overflow-hidden rounded-lg bg-transparent p-4">
          <div className="w-full sm:w-[48%] lg:w-full">
            <h3 className="mb-2 text-center text-sm uppercase tracking-wider text-gray-400 3xl:mb-3">
              My Balance
            </h3>
            <div className="mb-7 text-center font-medium tracking-tighter text-white xl:text-2xl 3xl:mb-8 3xl:text-[32px]">
              232,001 $
            </div>
            <TopupButton className="mb-8" />
            <span className="-mx-6 block border-t border-dashed border-t-gray-700 3xl:-mx-8" />
          </div>
        </div>
        <div className="mt-0 w-full px-3">
          <RadioGroup
            value={status}
            onChange={handleOnChange}
            className="mb-4 flex items-center gap-3"
          >
            <RadioGroupOption value="1 hr" />
            <RadioGroupOption value="1 Day" />
            <RadioGroupOption value="1 Month" />
            <RadioGroupOption value="6 Months" />
          </RadioGroup>
          <LivePriceFeed {...priceFeed} />
          <div className="my-4 block">
            <h3 className="text-heading-style mb-3 uppercase text-white">
              Best Performer
            </h3>
            <ListCard item={bestPerformer} variant="large" />
          </div>
          <div className="block">
            <h3 className="text-heading-style mb-3 uppercase text-white">
              Best Underwriter
            </h3>
            <ListCard item={bestUnderwriter} variant="medium" />
          </div>
        </div>
      </div>
    </aside>
  );
}
