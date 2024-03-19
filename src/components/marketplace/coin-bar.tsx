// static data
import { SelectedCoinPriceData } from '@/data/static/trading-data';

import cn from 'classnames';
import Link from 'next/link';
// import SimpleBar from '@/components/ui/simplebar';
import CoinChange from '@/components/marketplace/coin-change';

// import icons
import { MediaPlayIcon } from '@/components/icons/media-play-icon';
import { GuideIcon } from '@/components/icons/guide-icon';

export default function CoinBar() {
  return (
    <>
      <div className="@container @6xl:py-6 relative z-10 flex flex-nowrap items-center justify-between gap-8 border-t border-dashed border-gray-700 py-4">
        <div className="@[90rem]:gap-10 flex shrink-0 items-center justify-between gap-8">
          <CoinChange />
          <div className="block shrink-0">
            <p className="mb-1 text-xs font-medium text-red-500 xl:text-sm 3xl:text-base ">
              $20,679.17
            </p>
            <p className="text-2xs text-2xs mb-1 font-medium text-gray-500 xl:text-xs 3xl:text-sm">
              $20,679.17
            </p>
          </div>
          {SelectedCoinPriceData.map((item) => (
            <CoinPriceDetails
              key={item.text}
              text={item.text}
              price={item.price}
              priceDown={item.increase}
            />
          ))}
        </div>
      </div>
    </>
  );
}

function CoinPriceDetails({
  text,
  price,
  priceDown,
}: {
  text: string;
  price: string;
  priceDown: boolean;
}) {
  return (
    <div className="text-2xs block shrink-0 font-medium xl:text-xs 3xl:text-sm">
      <p className="mb-1 text-gray-500">{text}</p>
      <p className={cn(priceDown ? 'text-red-500' : 'text-gray-300')}>
        {price}
      </p>
    </div>
  );
}
