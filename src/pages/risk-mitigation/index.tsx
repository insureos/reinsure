import type { NextPageWithLayout } from '@/types';
import { NextSeo } from 'next-seo';
import RootLayout from '@/layouts/_root-layout';
import RiskMitigation from '@/components/risk-mitigation/risk-mitigation';

const RiskMitigationPage: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo title="Risk Mitigation" description="InsureOS" />
      <RiskMitigation />
    </>
  );
};

RiskMitigationPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

export default RiskMitigationPage;
