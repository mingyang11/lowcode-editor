import { useMemo } from 'react';
import MeterialItem from '../MeterialItem';
import { useComponentConfigStore } from '../../stores/componentConfig';

export default function Index() {
  const { componentConfig } = useComponentConfigStore();

  const components = useMemo(() => {
    return Object.values(componentConfig).filter(
      (item) => item.name !== 'Page'
    );
  }, [componentConfig]);

  return (
    <div>
      {components.map((item) => {
        return (
          <MeterialItem
            key={item.name}
            name={item.name}
            desc={item.desc}
          ></MeterialItem>
        );
      })}
    </div>
  );
}
