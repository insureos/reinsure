import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import { NextSeo } from 'next-seo';
import type { NextPageWithLayout } from '@/types';
import SidebarTwo from '@/layouts/sidebar/_portfolio';
// static data
import RootLayout from '@/layouts/_root-layout';
import Portfolio from '@/components/profile/portfolio';

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};

const PortfolioPage: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = () => {
  return (
    <>
      <NextSeo title="Portfolio" description="InsureOS" />
      <div className="mx-auto flex w-full shrink-0 flex-col md:px-4 xl:px-6 3xl:max-w-[1700px] 3xl:px-12">
        <Portfolio />
        <SidebarTwo className="left-auto right-0  xl:block" />
      </div>
    </>
  );
};

PortfolioPage.getLayout = function getLayout(page) {
  return (
    <RootLayout contentClassName="lg:pr-80 3xl:pt-0.5 3xl:pr-[350px]">
      {page}
    </RootLayout>
  );
};

export default PortfolioPage;
