import { useMaterailDrop } from '../../hooks/useMaterialDrop';
import { CommonComponentProps } from '../../interface';

const Page = ({ children, id, styles }: CommonComponentProps) => {
  const { canDrop, drop } = useMaterailDrop(['Button', 'Container'], id);
  return (
    <div
      ref={drop}
      style={{ ...styles, border: canDrop ? '2px solid blue' : 'none' }}
      className="p-[20px] h-[100%] box-border"
    >
      {children}
    </div>
  );
};

export default Page;
