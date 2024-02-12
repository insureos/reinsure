import cn from 'classnames';
import Button from '@/components/ui/button';
import CoinInput from '@/components/ui/coin-input';
import TransactionInfo from '@/components/ui/transaction-info';
import { SwapIcon } from '@/components/icons/swap-icon';
import Trade from '@/components/ui/trade';
import { useState, SVGProps } from 'react';
import NextLink from 'next/link';

const DeepbookLogo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={198}
    height={41}
    viewBox="0 0 198 41"
    fill="none"
    {...props}
  >
    <path
      fill="url(#a)"
      fillRule="evenodd"
      d="M34.602 10.5 17.3.5 0 10.5v20l3.767 2.177V12.68l13.53-7.82 13.532 7.82v15.642l-13.531 7.82-7.034-4.065V16.439l7.028-4.062 7.028 4.062v8.122l-7.028 4.062-.86-.497v-8.117l4.297-2.483-3.44-1.988-4.296 2.481v12.476l4.302 2.486 10.798-6.24V14.26L17.295 8.02 6.497 14.26v19.995L17.3 40.5l17.3-10v-20Z"
      clipRule="evenodd"
    />
    <path
      fill="#fff"
      d="M51.011 12.039h-6.797V29.73h7.604s8.105-.264 8.105-8.86c0-8.568-8.912-8.832-8.912-8.832Zm-3.379 3.432h3.38s5.433.294 5.433 5.4c0 5.134-5.434 5.427-5.434 5.427h-3.379V15.471ZM64.072 19.168v3.433h13.823v-3.433H64.072Zm0 7.13v3.433h13.823v-3.433H64.072Zm0-14.26v3.433h13.823V12.04H64.072ZM83.528 19.168v3.433h13.823v-3.433H83.528Zm0 7.13v3.433h13.823v-3.433H83.528Zm0-14.26v3.433h13.823V12.04H83.528ZM102.984 19.168v10.563h3.419V22.6h5.822s5.053-.117 5.053-5.281-5.053-5.281-5.053-5.281h-9.241v3.432h8.74s2.106-.029 2.106 1.849-2.106 1.848-2.106 1.848h-8.74ZM121.432 12.039V29.73h8.753s5.365-.03 5.365-5.428c0-2.083-1.28-3.198-2.164-3.873.707-.616 1.751-1.584 1.751-3.257 0-5.134-5.246-5.134-5.246-5.134h-8.459Zm0 3.432h8.606s1.621.03 1.621 1.702c0 1.673-1.621 1.702-1.621 1.702h-8.606V15.47Zm0 6.807h8.665s1.975.088 1.975 2.025c0 1.907-1.975 1.995-1.975 1.995h-8.665v-4.02ZM147.96 15.471h1.782s4.804.294 4.804 5.4c0 5.134-4.804 5.427-4.804 5.427h-1.782s-4.804-.293-4.804-5.428c0-5.105 4.804-5.399 4.804-5.399Zm-.147-3.432s-8.105.264-8.105 8.831c0 8.597 8.105 8.86 8.105 8.86h2.076s8.105-.263 8.105-8.86c0-8.567-8.105-8.831-8.105-8.831h-2.076ZM170.294 15.471h1.742s4.804.294 4.804 5.4c0 5.134-4.804 5.427-4.804 5.427h-1.742s-4.804-.293-4.804-5.428c0-5.105 4.804-5.399 4.804-5.399Zm-.147-3.432s-8.106.264-8.106 8.831c0 8.597 8.106 8.86 8.106 8.86h2.036s8.105-.263 8.105-8.86c0-8.567-8.105-8.831-8.105-8.831h-2.036ZM188.687 29.73v-6.747l5.246 6.748H198l-6.897-8.86L198 12.038h-4.067l-5.246 6.386v-6.386h-3.419V29.73h3.419Z"
    />
    <defs>
      <linearGradient
        id="a"
        x1={28.025}
        x2={17.156}
        y1={14.439}
        y2={40.541}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#B4FFED" />
        <stop offset={1} stopColor="#54B8F9" />
      </linearGradient>
    </defs>
  </svg>
);

export default function SwapCard() {
  let [toggleCoin, setToggleCoin] = useState(false);
  return (
    <div className="h-fit items-center rounded-lg bg-light-dark p-5 pt-4 shadow-card xs:p-6 xs:pt-5">
      <div className="mb-5 border-b border-dashed border-gray-800 pb-5 xs:mb-7 xs:pb-6">
        <div
          className={cn(
            'relative flex gap-3',
            toggleCoin ? 'flex-col-reverse' : 'flex-col'
          )}
        >
          <CoinInput
            label={'From'}
            isBase={true}
            exchangeRate={0.0}
            defaultCoinIndex={0}
            getCoinValue={(data) => console.log('From coin value:', data)}
          />
          <div className="absolute top-1/2 left-1/2 z-[1] -mt-4 -ml-4 rounded-full bg-gray-600 shadow-large">
            <Button
              size="mini"
              color="gray"
              shape="circle"
              variant="transparent"
              onClick={() => setToggleCoin(!toggleCoin)}
            >
              <SwapIcon className="h-auto w-3" />
            </Button>
          </div>
          <CoinInput
            label={'To'}
            exchangeRate={0.0}
            defaultCoinIndex={1}
            getCoinValue={(data) => console.log('To coin value:', data)}
          />
        </div>
      </div>
      <div className="flex flex-col gap-4 xs:gap-[18px]">
        <TransactionInfo label={'Min. Received'} />
        <TransactionInfo label={'Rate'} />
        <TransactionInfo label={'Offered by'} />
        <TransactionInfo label={'Price Slippage'} value={'1%'} />
        <TransactionInfo label={'Network Fee'} />
        <TransactionInfo label={'Deepbook Fee'} />
      </div>
      <NextLink href="/portfolio">
        <Button
          size="large"
          shape="rounded"
          fullWidth={true}
          className="my-6 uppercase xs:mt-8 xs:tracking-widest"
        >
          BUY
        </Button>
      </NextLink>
      <div className="flex items-center justify-center gap-4">
        <p className="mt-4 text-xs">Powered by</p>
        <DeepbookLogo width={100} className="relative top-2" />
      </div>
    </div>
  );
}
