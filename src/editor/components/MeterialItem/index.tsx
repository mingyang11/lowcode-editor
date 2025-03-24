import { useDrag } from 'react-dnd';

interface IMeterialItemProps {
  name: string;
}

export default function MeterialItem(props: IMeterialItemProps) {
  const { name } = props;
  const [, drag] = useDrag({
    type: name,
    item: {
      type: name,
    },
  });

  return (
    <div
      ref={drag}
      className="border-dashed
            border-[1px]
            border-[rgba(0,0,0,0.4)]
            py-[4px] px-[6px] 
            m-[8px]
            cursor-move
            inline-block
            bg-white
            hover:bg-[#ccc]"
    >
      {name}
    </div>
  );
}
