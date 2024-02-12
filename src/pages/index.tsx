import { useEffect } from 'react';
import type { NextPageWithLayout } from '@/types';
import RootLayout from '@/layouts/_root-layout';
import { useRouter } from 'next/router';

const HomePage: NextPageWithLayout = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/marketplace');
  }, []);

  return <div></div>;
};

HomePage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

export default HomePage;
