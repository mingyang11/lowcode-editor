import { useComponentConfigStore } from '../stores/componentConfig';
import { useComponentsStore } from '../stores/components';
import { message } from 'antd';
import { useDrop, ConnectDropTarget } from 'react-dnd';

export const useMeterialDrop = (
  accept: string[],
  id: number
): [boolean, ConnectDropTarget] => {
  const { addComponent } = useComponentsStore();
  const { componentConfig } = useComponentConfigStore();

  const [{ canDrop }, drop] = useDrop(() => {
    return {
      accept: accept,
      drop: (item: { type: string }, monitor) => {
        const didDrop = monitor.didDrop();
        if (didDrop) {
          return;
        }

        message.success(item.type);

        const { defaultProps, desc } = componentConfig[item.type];
        addComponent(
          {
            id: Number(new Date().getTime()),
            name: item.type,
            desc: desc,
            props: defaultProps,
          },
          id
        );
      },
      collect: (monitor) => {
        return {
          canDrop: monitor.canDrop(),
        };
      },
    };
  });

  return [canDrop, drop];
};
