import cn from 'classnames';

// import icons
import { Star } from '@/components/icons/star';
import { StarFill } from '@/components/icons/star-fill';
import { TrendArrowDownIcon } from '@/components/icons/trend-arrow-down-icon';
import { TrendArrowUpIcon } from '@/components/icons/trend-arrow-up-icon';
import { useState } from 'react';

interface CoinCardDetailsProps {
  details: {
    id: number;
    title: string;
    price: string;
    stared: boolean;
    hourPrice: {
      id: string;
      title: string;
      price: string;
    }[];
    priceUp: boolean;
    upPrice: string;
    downPrice: string;
  };
}

export default function CoinCard({ details }: CoinCardDetailsProps) {
  const [bookmark, setBookmark] = useState(false);
  return (
    <div className="rounded-lg border border-gray-700 bg-light-dark shadow-card">
      <div className="p-3 pb-4">
        <div className="mb-4 flex items-start justify-between">
          <div className="text-sm font-medium uppercase">
            <h2 className="mb-1 text-white">
              {details.title}
            </h2>
            <p className="text-gray-400">{details.price}</p>
          </div>
          <button onClick={() => setBookmark(!bookmark)}>
            {bookmark ? (
              <StarFill className="h-4 w-4 text-[#FB923C]" />
            ) : (
              <Star className="h-4 w-4 text-gray-400" />
            )}
          </button>
        </div>
        <div className="flex flex-wrap gap-4">
          {details.hourPrice.map((item) => (
            <div
              key={`price-high-low-${item.id}`}
              className="text-xs font-normal uppercase"
            >
              <p className="text-gray-400">{item.title}</p>
              <p className="text-white">{item.price}</p>
            </div>
          ))}
        </div>
      </div>
      <p
        className={cn(
          'flex items-center justify-center gap-2 border-t p-3 text-sm font-normal border-light-dark',
          details.priceUp ? 'text-green-500' : 'text-red-500',
        )}
      >
        -3.48%{' '}
        {details.priceUp ? (
          <TrendArrowUpIcon className="h-auto w-4" />
        ) : (
          <TrendArrowDownIcon className="h-auto w-4" />
        )}
      </p>
    </div>
  );
}
