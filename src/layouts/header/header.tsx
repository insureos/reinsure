import React,{useEffect,useState} from 'react'
import { useRouter } from 'next/router';
import cn from 'classnames';
import LogoIcon from '@/components/ui/logo-icon';
import { useWindowScroll } from '@/lib/hooks/use-window-scroll';
import { FlashIcon } from '@/components/icons/flash';
import Hamburger from '@/components/ui/hamburger';
import ActiveLink from '@/components/ui/links/active-link';
import { useIsMounted } from '@/lib/hooks/use-is-mounted';
import { useDrawer } from '@/components/drawer-views/context';
import routes from '@/config/routes';

import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { setSigner, setConnection } from '@/lib/helpers/wallet';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';

function HeaderRightArea() {
  const wallet = useWallet();
  const { connection } = useConnection();

   useEffect(() => {
     if (wallet.publicKey)
       setSigner(
         wallet.publicKey,
         wallet.signTransaction,
         wallet.signAllTransactions
       );
     if (connection) setConnection(connection);
   }, [wallet.publicKey, connection]);

  return (
    <div className="flex flex-col items-end gap-6 xl:gap-7 2xl:gap-8 3xl:gap-10">
      <div className="relative mt-5 flex shrink-0 items-center justify-end gap-3 gap-4 2xl:gap-8">
        <WalletMultiButton className="gradient-border-box border-0.5 h-10 rounded-full 2xl:h-12" />
      </div>
    </div>
  );
}

export default function Header({ className }: { className?: string }) {
  const router = useRouter();
  const isMounted = useIsMounted();
  const { openDrawer } = useDrawer();
  const windowScroll = useWindowScroll();
  return (
    <nav
      className={cn(
        'sticky right-0 top-0 z-30 h-16 w-full transition-all duration-300 sm:h-20 3xl:h-24',
        isMounted && windowScroll.y
          ? 'bg-gradient-to-b from-dark to-dark/80 shadow-card backdrop-blur'
          : '',
        className
      )}
    >
      <div className="flex h-full items-center justify-between px-4 sm:px-6 lg:px-8 3xl:px-10">
        <div className="flex items-center">
          <div
            onClick={() => router.push(routes.home)}
            className="flex items-center xl:hidden"
          >
            <LogoIcon />
          </div>
          <div className="mx-2 block sm:mx-4 xl:hidden">
            <Hamburger
              isOpen={false}
              variant="transparent"
              onClick={() => openDrawer('DASHBOARD_SIDEBAR')}
              className="text-white"
            />
          </div>
        </div>
        <HeaderRightArea />
      </div>
    </nav>
  );
}
