import React from 'react';
import Image from 'next/image';
import img1 from '@/assets/images/undraw_programmer_re_owql.svg';
import img2 from '@/assets/images/undraw_security_re_a2rk.svg';
import img3 from '@/assets/images/undraw_contract_re_ves9.svg';

import { useRouter } from 'next/router';

interface ReinsureProps {}

const Reinsure: React.FC<ReinsureProps> = ({}) => {
  const router = useRouter();
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="mb-20 text-2xl xl:text-3xl 3xl:text-4xl">
        Get Codebase Insurance
      </div>
      <div className="flex items-center justify-center gap-12">
        <div
          onClick={() => router.push('/reinsure/web3protocol')}
          className="flex h-[25rem] w-[20rem] cursor-pointer flex-col items-center justify-between rounded-xl bg-gray-900 px-4 py-10 shadow-xl hover:scale-[1.01]"
        >
          <Image src={img1} alt="image" className="h-[70%]" />
          <div className="text-center text-base font-bold xl:text-lg 3xl:text-xl">
            Web3 Protocol
          </div>
        </div>
        <div className="flex h-[25rem] w-[20rem] cursor-pointer flex-col items-center justify-between rounded-xl bg-gray-900 px-4 py-10 shadow-xl hover:scale-[1.01]">
          <Image src={img2} alt="image" className="h-[70%]" />
          <div className="text-center text-base font-bold xl:text-lg 3xl:text-xl">
            Software Security Auditor (Coming soon)
          </div>
        </div>
        <div className="flex h-[25rem] w-[20rem] cursor-pointer flex-col items-center justify-between rounded-xl bg-gray-900 px-4 py-10 shadow-xl hover:scale-[1.01]">
          <Image src={img3} alt="image" className="h-[70%]" />
          <div className="text-center text-base font-bold xl:text-lg 3xl:text-xl">
            Software Insurance Company (Coming soon)
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reinsure;
