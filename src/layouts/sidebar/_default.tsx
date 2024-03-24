import cn from 'classnames';
import AuthorCard from '@/components/ui/author-card';
import Logo from '@/components/ui/logo';
import { MenuItem } from '@/components/ui/collapsible-menu';
import Scrollbar from '@/components/ui/scrollbar';
import Button from '@/components/ui/button';
import { useDrawer } from '@/components/drawer-views/context';
import { Close } from '@/components/icons/close';
import { menuItems } from '@/layouts/sidebar/_menu-items';
//images
import AuthorImage from '@/assets/images/author.jpg';
import Link from 'next/link';

export default function Sidebar({ className }: { className?: string }) {
  const { closeDrawer } = useDrawer();
  return (
    <div
      className={cn(
        'left-0 top-0 z-40 h-screen w-full max-w-full flex-col justify-between border-r border-dashed border-gray-700 bg-dark xs:w-72 xl:fixed',
        className
      )}
    >
      <div className="flex h-24 items-center justify-between overflow-hidden px-6 py-4 2xl:px-8">
        <Logo />
        <div className="md:hidden">
          <Button
            title="Close"
            color="white"
            shape="circle"
            variant="transparent"
            size="small"
            onClick={closeDrawer}
          >
            <Close className="h-auto w-2.5" />
          </Button>
        </div>
      </div>

      <div className="px-6 pb-5 2xl:px-8">
        {menuItems.map((item, index) => (
          <MenuItem
            key={'default' + item.name + index}
            name={item.name}
            href={item.href}
            icon={item.icon}
          />
        ))}
      </div>

      <div className="flex flex-col justify-end px-6 pb-5">
        <Link href={'/reinsure'}>
          <div className="flex w-full cursor-pointer items-center justify-center rounded-lg border-2 border-gray-500 py-2">
            + Reinsure
          </div>
        </Link>
      </div>
    </div>
  );
}
