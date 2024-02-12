import routes from '@/config/routes';
import { HomeIcon } from '@/components/icons/home';
import { FarmIcon } from '@/components/icons/farm';
import { PoolIcon } from '@/components/icons/pool';
import { ProfileIcon } from '@/components/icons/profile';
import { DiskIcon } from '@/components/icons/disk';
import { ExchangeIcon } from '@/components/icons/exchange';
import { VoteIcon } from '@/components/icons/vote-icon';
import { PlusCircle } from '@/components/icons/plus-circle';
import { CompassIcon } from '@/components/icons/compass';

export const menuItems = [
  {
    name: 'Invest',
    icon: <HomeIcon />,
    href: routes.invest,
  },
  {
    name: 'Marketplace',
    icon: <FarmIcon />,
    href: routes.marketplace,
  },
  {
    name: 'Insurance Risk',
    icon: <ExchangeIcon />,
    href: routes.insuranceRisk,
  },
  {
    name: 'Risk Mitigation',
    icon: <VoteIcon />,
    href: routes.riskMitigation,
  },
  {
    name: 'Claim Payouts',
    icon: <CompassIcon />,
    href: routes.claimPayouts,
  },
  {
    name: 'Portfolio',
    icon: <ProfileIcon />,
    href: routes.portfolio,
  },
];
