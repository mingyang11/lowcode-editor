import { PropsWithChildren } from 'react';
import { useMeterialDrop } from '../../hooks/useMaterialDrop';

interface IPageProps {
  id: number;
}

export default function Index({ children, id }: PropsWithChildren<IPageProps>) {
  const [canDrop, drop] = useMeterialDrop(['Container', 'Button'], id);

  return (
    <div
      ref={drop as React.Ref<HTMLDivElement>}
      className="border-[1px] border-[rgba(0,0,0,0.2)] min-h-[100px] p-[8px]"
      style={{ border: canDrop ? '1px solid blue' : '' }}
    >
      {children}
    </div>
  );
}
