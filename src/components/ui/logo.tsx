import Image from '@/components/ui/image';
import AnchorLink from '@/components/ui/links/anchor-link';
import { useIsMounted } from '@/lib/hooks/use-is-mounted';
import darkLogo from '@/assets/images/logo_website_dark.png';
import routes from '@/config/routes';

export default function Logo() {
  const isMounted = useIsMounted();
  return (
    <AnchorLink
      href={'/'}
      className="flex w-36 outline-none sm:w-40 4xl:w-48"
    >
      <span className="relative flex overflow-hidden">
        {isMounted && <Image src={darkLogo} alt="Criptic" priority />}
      </span>
    </AnchorLink>
  );
}
