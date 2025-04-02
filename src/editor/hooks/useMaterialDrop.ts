import { getComponentById } from './../stores/components';
import { useComponentConfigStore } from '../stores/componentConfig';
import { useComponentsStore } from '../stores/components';
import { useDrop, ConnectDropTarget } from 'react-dnd';

export interface ItemType {
  type: string;
  id: number;
  dragType?: 'move' | 'add';
}

export const useMeterialDrop = (
  accept: string[],
  id: number
): [boolean, ConnectDropTarget] => {
  const { components, addComponent, deleteComponent } = useComponentsStore();
  const { componentConfig } = useComponentConfigStore();

  const [{ canDrop }, drop] = useDrop(() => {
    return {
      accept: accept,
      drop: (item: ItemType, monitor) => {
        const didDrop = monitor.didDrop();
        if (didDrop) {
          return;
        }

        if (item.dragType === 'move') {
          const component = getComponentById(item.id, components)!;

          deleteComponent(item.id);

          addComponent(component, id);
        } else {
          const config = componentConfig[item.type];

          addComponent(
            {
              id: new Date().getTime(),
              name: item.type,
              desc: config.desc,
              props: config.defaultProps,
            },
            id
          );
        }
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
