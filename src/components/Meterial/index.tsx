import { useMemo } from 'react';
import { useComponentConfigStore } from '../../editor/stores/component-config';
import { MaterialItem } from '../MaterialItem/index';

const Index = () => {
  const { componentConfig } = useComponentConfigStore();

  const components = useMemo(() => {
    return Object.values(componentConfig);
  }, [componentConfig]);

  return (
    <div>
      {components
        .filter((item) => item.name !== 'Page')
        .map((item, index) => {
          return (
            <MaterialItem
              name={item.name}
              desc={item.desc}
              key={item.name + index}
            />
          );
        })}
    </div>
  );
};

export default Index;
