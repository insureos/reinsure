import type { NextPageWithLayout } from '@/types';
import { NextSeo } from 'next-seo';
import RootLayout from '@/layouts/_root-layout';
import Search from '@/components/insurance-risk/search';
import NftDetails from '@/components/nft/nft-details';
import { nftData } from '@/data/static/single-nft';

const InsuranceRiskDetailsPage: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo title="Insurance Risk" description="reAssure.fi" />
      <NftDetails product={nftData} />
    </>
  );
};

InsuranceRiskDetailsPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

export default InsuranceRiskDetailsPage;
