import React from 'react';
import { IComponent, useComponentsStore } from '../../stores/components';
import { useComponentConfigStore } from '../../stores/componentConfig';

export default function Preview() {
  const { componentConfig } = useComponentConfigStore();
  const { components } = useComponentsStore();

  function renderComponents(components: IComponent[]): React.ReactNode {
    return components.map((component: IComponent) => {
      const config = componentConfig[component.name];
      if (!config.prod) return null;
      return React.createElement(
        config.prod,
        {
          key: component.id,
          id: component.id,
          name: component.name,
          styles: component.styles,
          ...config.defaultProps,
          ...component.props,
        },
        renderComponents(component.children || [])
      );
    });
  }
  return <div>{renderComponents(components)}</div>;
}
