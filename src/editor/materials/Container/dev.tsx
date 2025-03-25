import { useMeterialDrop } from '../../hooks/useMaterialDrop';
import { CommonComponentProps } from '../../interface';

export default function Index({ children, id, styles }: CommonComponentProps) {
  const [canDrop, drop] = useMeterialDrop(['Container', 'Button'], id);

  return (
    <div
      ref={drop as React.Ref<HTMLDivElement>}
      data-component-id={id}
      className="border-[1px] border-[rgba(0,0,0,0.2)] min-h-[100px] p-[8px]"
      style={{ ...styles, border: canDrop ? '1px solid blue' : '' }}
    >
      {children}
    </div>
  );
}
