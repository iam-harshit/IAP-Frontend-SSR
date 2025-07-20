import { CustomIcons } from '@/Components/common/CustomIcons';

export const QuickBox = ({ Options, side = 'left' }) => {
  return (
    <div
      className={` z-[99999] absolute top-[120%] ${
        side == 'left' ? 'left-0' : 'right-0'
      } rounded-lg backdrop-blur-3xl bg-gray-100 bg-opacity-100 max-w-fit font-normal shadow-md text-black overflow-hidden`}
    >
      {Options?.map((option, index) => {
        return (
          <div key={index}>
            {index !== 0 && <div className="h-[1px] bg-gray-200" />}
            <div
              className={`${index == 0 ? 'pt-[11px] pb-1' : ''} ${
                index == Options?.length - 1 ? 'pb-[11px] pt-1' : ' py-2'
              } hover:bg-neutral-200 flex justify-start items-center`}
              onClick={option.action}
            >
              <p className="cursor-pointer text-black flex whitespace-nowrap items-center gap-2 my-1 px-4 ">
                <CustomIcons Icon={option.icon} />
                {option.heading}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
