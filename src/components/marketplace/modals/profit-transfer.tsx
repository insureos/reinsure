import Button from '@/components/ui/button/button';
import Input from '@/components/ui/forms/input';
import { useModal } from '@/components/modal-views/context';
import { Close } from '@/components/icons/close';
import Radio from '@/components/ui/forms/radio';

export default function ProfitTransfer() {
  const { closeModal } = useModal();

  return (
    <div className="w-full xs:w-[580px]">
      <div className="relative flex flex-grow flex-col overflow-hidden rounded-lg p-8 shadow-card transition-all duration-200 hover:shadow-large bg-light-dark">
        <div className="mb-8 flex items-center justify-between border-b border-dashed pb-6 text-lg font-medium capitalize -tracking-wide text-left border-gray-700 text-white lg:text-xl">
          Profit Target
          <Button
            title="Close"
            color="white"
            shape="circle"
            variant="transparent"
            size="small"
            onClick={() => closeModal()}
          >
            <Close className="h-auto w-2.5" />
          </Button>
        </div>

        <div className="relative">
          <Input
            label="Profit Target 1~500%"
            useUppercaseLabel={false}
            type="text"
            placeholder="100"
            labelClassName="relative [&>span]:text-brand [&>span:first-child]:mb-3"
            inputClassName="!bg-[#0C0F19] text-white !mt-0 pe-10"
            suffix="%"
            suffixClassName="text-sm font-medium absolute top-auto bottom-3 end-5 text-gray-100"
          />
          <div className="mt-8 space-y-4">
            <Radio
              name="profit_target"
              label="Once the target is reached, notify and continue with DCA"
              labelClassName="text-gray-100"
              inputClassName="!text-blue-700"
              defaultChecked={true}
            />
            <Radio
              name="profit_target"
              label="Once the target is reached, notify and sell all positions."
              labelClassName="text-gray-100"
              inputClassName="!text-blue-700"
            />
          </div>
          <Button
            type="submit"
            shape="rounded"
            className="mt-8 w-full !font-bold uppercase bg-blue-800"
            onClick={() => closeModal()}
          >
            Create
          </Button>
        </div>
      </div>
    </div>
  );
}
