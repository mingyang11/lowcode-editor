import { useMeterialDrop } from '../../hooks/useMaterialDrop';
import { CommonComponentProps } from '../../interface';

function Page({ children, id, styles }: CommonComponentProps) {
  const [canDrop, drop] = useMeterialDrop(['Container', 'Button', 'Modal'], id);

  return (
    <div
      ref={drop}
      data-component-id={id}
      className="p-[16px] h-[100%] box-border"
      style={{ ...styles, border: canDrop ? '1px solid blue' : '' }}
    >
      {children}
    </div>
  );
}

export default Page;
