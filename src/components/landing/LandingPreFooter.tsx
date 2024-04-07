import React from 'react';
import Logo from '@/assets/images/logo.png';
import Image from '@/components/ui/image';
import AnchorLink from '@/components/ui/links/anchor-link';
import { ArrowRightIcon } from '@heroicons/react/24/solid';

interface LandingPreFooterProps {}

export const LandingPreFooter: React.FC<LandingPreFooterProps> = ({}) => {
  return (
    <div className="flex w-screen flex-col items-center justify-center gap-6 bg-[#060606] py-20" id="claimSettled">
      <div className="relative h-20 w-20 overflow-hidden rounded-full xl:h-24 xl:w-24 3xl:h-28 3xl:w-28">
        <Image className="object-cover" src={Logo} alt="logo" fill />
      </div>
      <div className="text-center text-4xl font-black tracking-tight text-white 2xl:text-5xl">
        get started with insureOS today.
      </div>
      <div className="text-center text-lg text-gray-400 xl:text-xl 3xl:text-2xl">
      With InsureOS your claims get settled in under a month and completely on-chain with <br/>
      dispute resolution mechanisms and fully solvent LPs.
      </div>
      <div className="mt-6 w-96">
      <AnchorLink
        href={"https://github.com/insureos/reinsurance-contracts/blob/master/docs/raising-claims-and-claim-voting.md"}
        className="flex cursor-pointer items-center justify-start gap-3 rounded-lg bg-[#0a0a0a] px-[18px] py-3 text-xs xl:text-sm 3xl:text-base"
      >
          <div className="flex items-start justify-start w-96">
            <div className="text-xl leading-snug tracking-tight text-indigo-300 mt-1 ml-14">
            Read Claim Payout Docs
            </div>
            <ArrowRightIcon className="text-indigo-300 2xl:h-5 ml-3 mt-2" />
          </div>
      </AnchorLink>
      </div>
    </div>
  );
};

export default LandingPreFooter;
