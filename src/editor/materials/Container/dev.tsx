import { useDrag } from 'react-dnd';
import { useRef, useEffect } from 'react';
import { useMeterialDrop } from '../../hooks/useMaterialDrop';
import { CommonComponentProps } from '../../interface';

export default function Index({
  children,
  id,
  styles,
  name,
}: CommonComponentProps) {
  const [canDrop, drop] = useMeterialDrop(['Container', 'Button', 'Modal'], id);
  const divRef = useRef<HTMLDivElement>(null);

  const [_, drag] = useDrag({
    type: name,
    item: {
      type: name,
      dragType: 'move',
      id: id,
    },
  });

  useEffect(() => {
    drop(divRef);
    drag(divRef);
  }, []);

  return (
    <div
      ref={divRef}
      data-component-id={id}
      className="border-[1px] border-[rgba(0,0,0,0.2)] min-h-[100px] p-[8px]"
      style={{ ...styles, border: canDrop ? '1px solid blue' : '' }}
    >
      {children}
    </div>
  );
}
