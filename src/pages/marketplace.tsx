import type { NextPageWithLayout } from '@/types';
import { NextSeo } from 'next-seo';
import RootLayout from '@/layouts/_root-layout';
import Farms from '@/components/farms/farms';

const MarketplacePage: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo title="MarketPlace" description="reAssure.fi" />
      <Farms />
    </>
  );
};

MarketplacePage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

export default MarketplacePage;
