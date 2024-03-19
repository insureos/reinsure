import type { NextPageWithLayout } from '@/types';
import { NextSeo } from 'next-seo';
import RootLayout from '@/layouts/_root-layout';
import Marketplace from '@/components/marketplace/marketplace';

const MarketplacePage: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo title="MarketPlace" description="reAssure.fi" />
      <Marketplace />
    </>
  );
};

MarketplacePage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

export default MarketplacePage;
