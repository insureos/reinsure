import React, { useRef } from 'react';
import Head from 'next/head';

import Nav from '@/components/landing/Nav';
import JoinCommunityBtn from '@/components/landing/JoinCommunityBtn';
import HeaderLanding from '@/components/landing/HeaderLanding';
import HeaderScreen from '@/components/landing/HeaderScreen';
import TrustedPartners from '@/components/landing/TrustedPartners';
import Features from '@/components/landing/Features';
import CodeSecured from '@/components/landing/CodeSecured';
import RiskManagement from '@/components/landing/RiskManagement';
import LandingPreFooter from '@/components/landing/LandingPreFooter';
import LandingFooter from '@/components/landing/LandingFooter';

interface LandingProps {}

export const Landing: React.FC<LandingProps> = ({}) => {
  const ref = useRef<null | HTMLDivElement>(null);

  const handleFeatureClick = () => {
    ref?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Head>
        <title>InsureOS - Insure your code.</title>
      </Head>
      <div className="landing-font flex min-h-screen w-screen flex-col items-center overflow-y-auto overflow-x-hidden bg-[#060606]">
        <Nav handleFeatureClick={handleFeatureClick} />
        <div className="mt-20">
          <JoinCommunityBtn />
        </div>
        <HeaderLanding />
        <HeaderScreen />
        <TrustedPartners />
        <Features scrollRef={ref} />
        <CodeSecured />
        <RiskManagement />
        <LandingPreFooter />
        <LandingFooter />
      </div>
    </>
  );
};

export default Landing;
