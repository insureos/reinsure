import type { NextPageWithLayout } from '@/types';
import { NextSeo } from 'next-seo';
import RootLayout from '@/layouts/_root-layout';
import Web3Protocol from '@/components/reinsure/Web3Protocol';

const Web3ProtocolPage: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo title="Reinsure" description="reAssure.fi" />
      <Web3Protocol />
    </>
  );
};

Web3ProtocolPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

export default Web3ProtocolPage;
