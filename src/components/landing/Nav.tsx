import React from 'react';
import LogoTransparent from '@/assets/images/logo-transparent.png';
import Image from '@/components/ui/image';
import { useRouter } from 'next/router';
import AnchorLink from '@/components/ui/links/anchor-link';

interface NavProps {
  handleFeatureClick: any;
}

export const Nav: React.FC<NavProps> = ({ handleFeatureClick }) => {
  const router = useRouter();
  function redirectToMarketplace(e: React.MouseEvent<HTMLElement>){
    e.preventDefault();
    router.push("/marketplace")
  }
  return (
    <div className="mt-5 inline-flex w-full items-center justify-between gap-[193px] px-[3rem]">
      <AnchorLink href={'#'} className="h-10 xl:h-12 3xl:h-14">
        <Image
          alt="image"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: 'auto', height: '90%' }} // optional
          src={LogoTransparent}
        />
      </AnchorLink>
      <div className="mr-20 flex items-center justify-center gap-7 text-sm font-normal leading-[21px] tracking-tight text-white xl:text-base 3xl:text-lg">
      <AnchorLink href={'#codeSecured'}>
          <div className="cursor-pointer">why us?</div>
        </AnchorLink>
        <AnchorLink href={'#riskManagment'}>
          <div className="cursor-pointer">risk management</div>
        </AnchorLink>
        <AnchorLink href={'https://github.com/insureos/reinsurance-contracts/tree/master/docs'}>
          <div className="cursor-pointer">docs</div>
        </AnchorLink>
        <AnchorLink href={'#claimSettled'}>
          <div className="cursor-pointer">claims</div>
        </AnchorLink>
      </div>
      <button
        onClick={redirectToMarketplace}
        className="flex items-center justify-center gap-4 text-sm font-medium leading-[21px] tracking-tight text-indigo-300 xl:text-base 3xl:text-lg"
      >
        Open App
      </button>
    </div>
  );
};

export default Nav;
