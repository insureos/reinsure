import type { NextPageWithLayout } from '@/types';
import { NextSeo } from 'next-seo';
import RootLayout from '@/layouts/_root-layout';
import Reinsure from '@/components/reinsure/Reinsure';

const ReinsurePage: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo title="Reinsure" description="InsureOS" />
      <Reinsure />
    </>
  );
};

ReinsurePage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

export default ReinsurePage;
