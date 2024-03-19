import type { NextPageWithLayout } from '@/types';
import { NextSeo } from 'next-seo';
import RootLayout from '@/layouts/_root-layout';
import OpenPools from '@/components/openpools/openpools';

const OpenPoolsPage: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo title="Open Pools" description="reAssure.fi" />
      <OpenPools />
    </>
  );
};

OpenPoolsPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

export default OpenPoolsPage;
