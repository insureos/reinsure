import { useEffect } from 'react';
import type { NextPageWithLayout } from '@/types';
import RootLayout from '@/layouts/_root-layout';
import Landing from '@/components/landing/Landing';

const HomePage: NextPageWithLayout = () => {
  return <Landing />;
};

export default HomePage;
