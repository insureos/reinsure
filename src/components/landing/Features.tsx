import React, {useState} from 'react';
import {
  CurrencyDollarIcon,
  LightBulbIcon,
  GlobeAsiaAustraliaIcon,
  PlusCircleIcon,
  FaceSmileIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline';
import Image from '@/components/ui/image';
import dappLogo from '@/assets/images/dapp.png';
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
      className={`flex w-[21rem] flex-col items-start justify-center gap-4 rounded-2xl bg-gray-900 p-6 shadow-xl transition-transform duration-200 ease-in-out ${isHovered ? 'transform -translate-y-2' : ''} xl:w-[23rem] xl:p-7 3xl:w-[25rem] 3xl:p-8`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex h-10 w-10 items-center justify-start pr-2">
        {element}
      </div>
      <div className="text-base text-white xl:text-lg 3xl:text-xl">{title}</div>
      <div className="whitespace-pre text-base text-gray-400 xl:text-lg 3xl:text-xl">
        {body}
      </div>
      {/* Conditional rendering based on hover state */}
      {isHovered && (
        <div className="mt-2 px-4 py-2 text-center text-sm text-white bg-indigo-600 rounded-lg">
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
        className="pt-16 text-center text-4xl font-black tracking-tight text-white 2xl:text-5xl mb-8"
      >
        Our areas of interest: 
      </div>
      <div className="mb-2 flex w-full flex-wrap items-center justify-center gap-5 xl:gap-6 3xl:gap-8">
        <FeatureCard
          element={<Image
            className="h-10 w-10 text-indigo-300"
            alt="image"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: 'auto', height: '100%' }} // optional
            src={dappLogo}
          />}
          title={'Consumer Dapps'}
          body={''}
        />
        <FeatureCard
          element={<LightBulbIcon className="h-10 w-10 text-indigo-300" />}
          title={'Fintech Apps'}
          body={
            ''
          }
        />
        <FeatureCard
          element={
            <GlobeAsiaAustraliaIcon className="h-10 w-10 text-indigo-300" />
          }
          title={'Web3 Wallets'}
          body={
            ''
          }
        />
      </div>
      <div className="flex w-full flex-wrap items-center justify-center gap-5 xl:gap-6 3xl:gap-8">
        <FeatureCard
          element={<PlusCircleIcon className="h-10 w-10 text-indigo-300" />}
          title={'L1s'}
          body={
            ''
          }
        />
        <FeatureCard
          element={<FaceSmileIcon className="h-10 w-10 text-indigo-300" />}
          title={'Software Vendors'}
          body={
            ''
          }
        />
        <FeatureCard
          element={<DocumentTextIcon className="h-10 w-10 text-indigo-300" />}
          title={'Multi-chain Bridges'}
          body={
            ''
          }
        />
      </div>
    </div>
  );
};

export default Features;
