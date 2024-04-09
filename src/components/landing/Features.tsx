import React, {useState} from 'react';
import Image from '@/components/ui/image';
import dappLogo from '@/assets/images/dapp.png';
import fintech from "@/assets/images/fintech.svg";
import L1 from "@/assets/images/L1.png";
import multi_chain from "@/assets/images/multi_chain_bridge.webp";
import software_vensor from "@/assets/images/software_vendor.svg"
import {WalletIcon} from "@/components/icons/wallet";
import cn from 'classnames';

interface FeatureCardProps {
  body: string;
  title: string;
  element: any;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ body, title, element }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    // State to manage hover effect
    <div
      className={cn(
        'flex w-[21rem] transform flex-col items-start justify-center gap-4 rounded-2xl bg-gray-900 p-6 shadow-xl transition-all xl:w-[23rem] xl:p-7 3xl:w-[25rem] 3xl:p-8',
        // {
        //   '-translate-y-2 transform': isHovered,
        // }
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex h-10 w-full items-center justify-start pr-2">
        {element}
      </div>
      <div className="text-base text-white xl:text-lg 3xl:text-xl">{title}</div>
      <div className="whitespace-pre text-base text-gray-400 xl:text-lg 3xl:text-xl">
        {body}
      </div>
      {/* Conditional rendering based on hover state */}
      {isHovered && (
        <div className="mt-2 rounded-lg bg-indigo-600 px-4 py-2 text-center text-sm text-white">
          Check use case video
        </div>
      )}
    </div>
  );
};

interface FeaturesProps {
  scrollRef: any;
}

export const Features: React.FC<FeaturesProps> = ({ scrollRef }) => {
  return (
    <div className="z-[20] flex w-screen flex-col items-center justify-center gap-5 bg-[#0E1320] py-32 pt-16">
      <div
        ref={scrollRef}
        className="mb-8 pt-16 text-center text-4xl font-black tracking-tight text-white 2xl:text-5xl"
      >
        Our areas of interest:
      </div>
      <div className="mb-2 flex w-full flex-wrap items-center justify-center gap-5 xl:gap-6 3xl:gap-8">
        <FeatureCard
          element={
            <div className="relative h-10 w-10">
              <Image alt="image" className="object-cover" fill src={dappLogo} />
            </div>
          }
          title={'Consumer Dapps'}
          body={''}
        />
        <FeatureCard
          element={
            <div className="relative h-10 w-10">
              <Image alt="image" className="object-cover" fill src={fintech} />
            </div>
          }
          title={'Fintech Apps'}
          body={''}
        />
        <FeatureCard
          element={<WalletIcon className="h-8 w-40" />}
          title={'Web3 Wallets'}
          body={''}
        />
      </div>
      <div className="flex w-full flex-wrap items-center justify-center gap-5 xl:gap-6 3xl:gap-8">
        <FeatureCard
          element={
            <div className="relative h-10 w-10">
              <Image alt="image" className="object-cover" fill src={L1} />
            </div>
          }
          title={'L1s'}
          body={''}
        />
        <FeatureCard
          element={
            <div className="relative h-8 w-40">
              <Image
                alt="image"
                className="object-cover"
                fill
                src={software_vensor}
              />
            </div>
          }
          title={'Software Vendors'}
          body={''}
        />
        <FeatureCard
          element={
            <div className="relative h-10 w-10 overflow-hidden rounded-full">
              <Image
                alt="image"
                className="object-cover"
                fill
                src={multi_chain}
              />
            </div>
          }
          title={'Multi-chain Bridges'}
          body={''}
        />
      </div>
    </div>
  );
};

export default Features;
