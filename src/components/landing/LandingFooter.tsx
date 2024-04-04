import React from 'react';

import LogoTransparent from '@/assets/images/logo-transparent.png';
import Image from '@/components/ui/image';

import AnchorLink from '@/components/ui/links/anchor-link';

//twitter icon
import { XTwitterIcon } from '@/components/icons/brand/x-twitter';

interface LandingFooterProps {}

export const LandingFooter: React.FC<LandingFooterProps> = ({}) => {
  return (
    <div className="flex w-screen justify-between border-t-2 border-primary bg-[#060606] py-16 px-12">
      <AnchorLink href={'#'} className="h-12 xl:h-13 3xl:h-14">
        <Image
          alt="image"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: 'auto', height: '100%' }} // optional
          src={LogoTransparent}
        />
      </AnchorLink>
        <div className="flex gap-10">
          <AnchorLink
            href={'https://twitter.com/insureos'}
            target="_blank"
            className="flex h-8 w-10 cursor-pointer items-center justify-center"
          >
            <XTwitterIcon />
          </AnchorLink>
        </div>
      </div>
  );
};

export default LandingFooter;
