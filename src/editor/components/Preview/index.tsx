import React from 'react';
import { message } from 'antd';
import { IComponent, useComponentsStore } from '../../stores/components';
import { useComponentConfigStore } from '../../stores/componentConfig';

export default function Preview() {
  const { componentConfig } = useComponentConfigStore();
  const { components } = useComponentsStore();

  function handleEvent(component: IComponent) {
    const props: Record<string, any> = {};
    componentConfig[component.name].events?.forEach((event) => {
      const eventConfig = component.props?.[event.name];

      if (eventConfig) {
        props[event.name] = () => {
          eventConfig?.actions?.forEach((element: any) => {
            const { type } = element;
            if (type === 'goToLink' && element.url) {
              window.location.href = element.url;
            } else if (type === 'showMessage' && element.config) {
              if (element.config.type === 'success') {
                message.success(element.config.text);
              } else if (element.config.type === 'error') {
                message.error(element.config.text);
              }
            }
          });
        };
      }
    });
    return props;
  }

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
          ...handleEvent(component),
        },
        renderComponents(component.children || [])
      );
    });
  }
  return <div>{renderComponents(components)}</div>;
}
