import type { NextPageWithLayout } from '@/types';
import { NextSeo } from 'next-seo';
import RootLayout from '@/layouts/_root-layout';
import Search from '@/components/insurance-risk/search';

const InsuranceRiskPage: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo title="Insurance Risk" description="reAssure.fi" />
      <Search />
    </>
  );
};

InsuranceRiskPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

export default InsuranceRiskPage;
