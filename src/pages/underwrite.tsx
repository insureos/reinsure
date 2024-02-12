import type { NextPageWithLayout } from '@/types';
import { NextSeo } from 'next-seo';
import RootLayout from '@/layouts/_root-layout';
import CreateNFT from '@/components/create-nft/create-nft';

const CreateNFTPage: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo title="Underwrite" description="reAssure.fi" />
      <CreateNFT />
    </>
  );
};

CreateNFTPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

export default CreateNFTPage;
