import type { NextPageWithLayout } from '@/types';
import { NextSeo } from 'next-seo';
import RootLayout from '@/layouts/_root-layout';
import Test from '@/components/test';

const TestPage: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo title="MarketPlace" description="InsureOS" />
      <Test />
    </>
  );
};

TestPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

export default TestPage;
