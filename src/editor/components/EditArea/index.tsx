import React from 'react';
import { IComponent, useComponentsStore } from '../../stores/components';
import { useComponentConfigStore } from '../../stores/componentConfig';

export default function Index() {
  const { components } = useComponentsStore();
  const { componentConfig } = useComponentConfigStore();

  function renderComponents(components: IComponent[]): React.ReactNode {
    return components.map((component: IComponent) => {
      const config = componentConfig?.[component.name];

      // 容错处理
      if (!config?.component) {
        return null;
      }

      return React.createElement(
        config.component,
        {
          key: component.id,
          name: component.name,
          id: component.id,
          ...config.defaultProps,
          ...component.props,
        },
        renderComponents(component.children || [])
      );
    });
  }

  return <div className="h-[100%]">{renderComponents(components)}</div>;
}
