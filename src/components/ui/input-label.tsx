import classNames from 'classnames';
import cn from 'classnames'
interface InputLabelProps {
  title: string;
  subTitle?: string;
  important?: boolean;
  className?:string;
  titleClassName?:string;
}

function InputLabel({ title, subTitle, important,className,titleClassName }: InputLabelProps) {
  return (
    <div className={cn("relative mb-3",className)}>
      <span className={cn("block text-sm font-medium uppercase tracking-wider text-white",titleClassName)}>
        {title}
        {important && <sup className="ml-1.5 text-red-500">*</sup>}
      </span>
      {subTitle && (
        <span className="mt-1 block text-xs tracking-tighter text-gray-400 sm:text-sm">
          {subTitle}
        </span>
      )}
    </div>
  );
}

export default InputLabel;
