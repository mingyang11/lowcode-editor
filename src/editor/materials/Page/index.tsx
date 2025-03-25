import { useMeterialDrop } from '../../hooks/useMaterialDrop';
import { PropsWithChildren } from 'react';

interface IPageProps {
  id: number;
}
function Page({ children, id }: PropsWithChildren<IPageProps>) {
  const [canDrop, drop] = useMeterialDrop(['Container', 'Button'], id);

  return (
    <div
      ref={drop}
      data-component-id={id}
      className="p-[16px] h-[100%] box-border"
      style={{ border: canDrop ? '1px solid blue' : '' }}
    >
      {children}
    </div>
  );
}

export default Page;
