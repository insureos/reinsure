import Image from '@/components/ui/image';
import { LongArrowRight } from '@/components/icons/long-arrow-right';
import { LongArrowUp } from '@/components/icons/long-arrow-up';
import { VerifiedIcon } from '@/components/icons/verified-icon';
import { QuestionIcon } from '@/components/icons/question-icon';
import { StaticImageData } from 'next/image';
import { ExchangeIcon } from '@/components/icons/exchange';


type CardProps = {
  name: string;
  avatar: StaticImageData | string;
  date: string;
  time: string;
  transactionType: string;
  transactionFrom: string;
  transactionFromAvatar: StaticImageData | string;
  transactionMethodLogo: StaticImageData | string;
  transactionMethod: string;
  transactionAmount: number;
  exchangeRate: string;
};

export default function TransactionHistoryCard({ item }: { item: CardProps }) {
  const {
    name,
    avatar,
    date,
    time,
    exchangeRate,
    transactionMethod,
    transactionMethodLogo,
    transactionFromAvatar,
    transactionFrom,
    transactionAmount,
    transactionType,
  } = item ?? {};
  const bgColor = transactionType === 'sell' ? '#D2D786' : '#F2C672';
  return (
    <div className="rounded-lg bg-light-dark p-4 text-sm shadow-card sm:p-5 md:p-6">
      <div className="flex items-center justify-between border-b border-dashed border-gray-700 pb-3.5 sm:pb-5">
        <div className="flex items-center font-medium ">
          <Image
            src={avatar}
            alt="wallet"
            width={24}
            height={24}
            placeholder="blur"
            className="rounded-full"
          />
          <div className="ml-2 truncate -tracking-wider text-white">{name}</div>
        </div>
        <div className="truncate pl-2 text-xs -tracking-wide text-gray-400 xs:text-sm ">
          {date}
        </div>
      </div>
      <div className="grid grid-cols-9 gap-x-3 pt-4 md:gap-x-5 md:pt-6">
        <div className="col-span-4 flex flex-col gap-2.5 sm:flex-row sm:gap-x-4 md:flex-col 2xl:flex-row">
          <div className="flex items-center lg:w-1/2">
            <div
              className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white md:h-9 md:w-9 xl:h-10 xl:w-10"
              style={{ backgroundColor: bgColor }}
            >
              <LongArrowUp
                className={`h-5 w-5 xl:h-6 xl:w-6 ${
                  transactionType === 'sell' ? 'rotate-180' : 'rotate-0'
                }`}
              />
              <div className="absolute -right-1.5 top-0 ">
                {/* <VerifiedIcon className="h-4 w-4" /> */}
              </div>
            </div>
            <div className="ml-2.5 flex flex-col truncate xl:ml-4">
              <strong className="mb-0.5 font-medium -tracking-wider text-white">
                {transactionType === 'sell' ? 'Sell' : 'Buy'}
              </strong>
              <span className="text-xs text-gray-400">{time}</span>
            </div>
          </div>
          <div className="flex items-center lg:w-1/2">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-600/5 text-gray-400 md:h-9 md:w-9 xl:h-10 xl:w-10">
              {transactionFromAvatar ? (
                <Image
                  src={transactionFromAvatar}
                  alt={transactionFrom}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              ) : (
                <QuestionIcon className="h-5 w-5 lg:h-6 lg:w-6" />
              )}
            </div>
            <div className="ml-2.5 flex flex-col truncate xl:ml-4">
              <span className="mb-0.5 text-xs text-gray-400">From</span>
              <strong className="truncate font-medium -tracking-wider text-white">
                {transactionFrom}
              </strong>
            </div>
          </div>
        </div>
        <div className="col-span-1 flex items-center text-gray-400 sm:pl-3 md:pl-0 lg:pl-3">
          <LongArrowRight
            className={`h-5 w-5 md:h-6 md:w-6 lg:h-5 lg:w-5 xl:h-7 xl:w-7 ${
              transactionType === 'sell' ? 'rotate-180' : 'rotate-0'
            }`}
          />
        </div>
        <div className="col-span-4  flex flex-col gap-2.5 sm:flex-row sm:gap-x-4 md:flex-col 2xl:flex-row">
          <div className="flex items-center lg:w-1/2">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-600/5 text-gray-400 md:h-9 md:w-9 xl:h-10 xl:w-10">
              {transactionMethodLogo ? (
                <Image
                  src={transactionMethodLogo}
                  alt={transactionMethod}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              ) : (
                <QuestionIcon className="h-5 w-5 xl:h-6 xl:w-6" />
              )}
            </div>
            <div className="ml-2.5 flex flex-col truncate xl:ml-4">
              <span className="mb-0.5 text-xs text-gray-400">
                {transactionType == 'sell' ? '+' : '-'}
                {transactionAmount}
              </span>
              <strong className="font-medium -tracking-wider text-white">
                {transactionMethod}
              </strong>
            </div>
          </div>
          <div className="flex items-center lg:w-1/2">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-600/5 text-gray-400 md:h-9 md:w-9 xl:h-10 xl:w-10">
              <ExchangeIcon className="h-4 w-4" />
            </div>
            <div className="ml-2.5 flex flex-col truncate xl:ml-4">
              <span className="mb-0.5 text-xs text-gray-400">
                Exchange Rate
              </span>
              <strong className="text-2xs font-medium text-white xl:text-xs 3xl:text-sm">
                {exchangeRate}
              </strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
