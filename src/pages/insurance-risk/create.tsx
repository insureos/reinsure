import type { NextPageWithLayout } from '@/types';
import { NextSeo } from 'next-seo';
import RootLayout from '@/layouts/_root-layout';
import Create from '@/components/insurance-risk/create';

const InsuranceRiskCreatePage: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo title="Insurance Risk" description="reAssure.fi" />
      <Create />
    </>
  );
};

InsuranceRiskCreatePage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

export default InsuranceRiskCreatePage;
