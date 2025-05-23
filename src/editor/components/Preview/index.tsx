import React, { useRef } from 'react';
import { message } from 'antd';
import { IComponent, useComponentsStore } from '../../stores/components';
import { useComponentConfigStore } from '../../stores/componentConfig';

export default function Preview() {
  const componentRefs = useRef<Record<string, any>>({});

  const { componentConfig } = useComponentConfigStore();
  const { components } = useComponentsStore();

  function handleEvent(component: IComponent) {
    const props: Record<string, any> = {};
    componentConfig[component.name].events?.forEach((event) => {
      const eventConfig = component.props?.[event.name];

      if (eventConfig) {
        props[event.name] = () => {
          eventConfig?.actions?.forEach((element: any) => {
            const { type, config } = element;
            if (type === 'goToLink' && element.url) {
              window.location.href = element.url;
            } else if (type === 'showMessage' && element.config) {
              if (element.config.type === 'success') {
                message.success(element.config.text);
              } else if (element.config.type === 'error') {
                message.error(element.config.text);
              }
            } else if (type === 'customJS') {
              const func = new Function('context', element.code);
              func({
                name: component.name,
                props: component.props,
                showMessage(content: string) {
                  message.success(content);
                },
              });
            } else if (type === 'componentMethod') {
              const component = componentRefs.current[config?.componentId];

              if (component) {
                component[config?.method]?.();
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
          ref: (ref: Record<string, any>) => {
            componentRefs.current[component.id] = ref;
          },
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
