import React, { useMemo } from 'react';
import MeterialItem from '../MeterialItem';
import { useComponentConfigStore } from '../../stores/componentConfig';

export default function Index() {
  const { componentConfig } = useComponentConfigStore();

  const components = useMemo(() => {
    return Object.values(componentConfig);
  }, [componentConfig]);

  return (
    <div>
      {components.map((item) => {
        return <MeterialItem key={item.name} name={item.name}></MeterialItem>;
      })}
    </div>
  );
}
