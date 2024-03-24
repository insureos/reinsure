import type { NextPageWithLayout } from '@/types';
import { NextSeo } from 'next-seo';
import RootLayout from '@/layouts/_root-layout';
import CreatePool from '@/components/openpools/openpools-create';

const OpenPoolsCreatePage: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo title="Open Pools" description="reAssure.fi" />
      <CreatePool />
    </>
  );
};

OpenPoolsCreatePage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

export default OpenPoolsCreatePage;
