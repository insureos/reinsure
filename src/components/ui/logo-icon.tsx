import Image from '@/components/ui/image';
import { useIsMounted } from '@/lib/hooks/use-is-mounted';
import newLogo from '@/assets/images/logo_website_dark.png';

const Logo: React.FC<React.SVGAttributes<{}>> = (props) => {
  const isMounted = useIsMounted();

  return (
    <div className="flex cursor-pointer outline-none" {...props}>
      <span className="relative flex overflow-hidden">
        {isMounted && <Image src={newLogo} alt="ReAssure" priority />}
      </span>
    </div>
  );
};

export default Logo;
