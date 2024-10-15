import React, { MouseEventHandler, useState } from 'react';
import { useComponetsStore, Component } from '../../editor/stores/components';
import { useComponentConfigStore } from '../../editor/stores/component-config';
import { HoverMask } from '../../editor/components/HoverMask';
import { SelectedMask } from '../../editor/components/SelectedMask';

const Index = () => {
  const { components, curComponentId, setCurComponentId } = useComponetsStore();
  const { componentConfig } = useComponentConfigStore();

  const [hoverComponentId, setHoverComponentId] = useState<number>();

  function renderComponents(components: Component[]): React.ReactNode {
    return components.map((component: Component) => {
      const config = componentConfig?.[component.name];

      if (!config?.dev) {
        return null;
      }

      return React.createElement(
        config.dev,
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

  /** 鼠标浮动 */
  const handleMouseOver: MouseEventHandler = (e) => {
    const path = e.nativeEvent.composedPath();
    for (let i = 0; i < path.length; i++) {
      const ele = path[i] as HTMLElement;
      const componentId = ele?.dataset?.componentId;
      if (componentId) {
        // 将componentId转位数字
        setHoverComponentId(+componentId);
        return;
      }
    }
  };

  /** 点击画布区域 */
  const handleClick: MouseEventHandler = (e) => {
    const path = e.nativeEvent.composedPath();
    for (let i = 0; i < path.length; i++) {
      const ele = path[i] as HTMLElement;
      const componentId = ele?.dataset?.componentId;
      if (componentId) {
        // 将componentId转位数字
        setCurComponentId(+componentId);
        return;
      }
    }
  };
  return (
    <div
      onMouseOver={handleMouseOver}
      onMouseLeave={() => setHoverComponentId(undefined)}
      onClick={handleClick}
      style={{ height: '100%' }}
      className="edit-area"
    >
      {renderComponents(components)}
      {hoverComponentId && hoverComponentId !== curComponentId && (
        <HoverMask
          portalWrapperClassName="portal-wrapper"
          containerClassName="edit-area"
          componentId={hoverComponentId}
        />
      )}
      {curComponentId && (
        <SelectedMask
          portalWrapperClassName="portal-wrapper"
          containerClassName="edit-area"
          componentId={curComponentId}
        />
      )}
      <div className="portal-wrapper"></div>
    </div>
  );
};

export default Index;
