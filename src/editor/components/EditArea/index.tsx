import React, { MouseEventHandler, useState } from 'react';
import { IComponent, useComponentsStore } from '../../stores/components';
import { useComponentConfigStore } from '../../stores/componentConfig';
import HoverMask from '../HoverMask';
import SelectedMask from '../SelectedMask';

export default function Index() {
  const { components, curComponentId, setCurComponentId } =
    useComponentsStore();
  const { componentConfig } = useComponentConfigStore();
  const [hoverComponentId, setHoverComponentId] = useState<number>();

  function renderComponents(components: IComponent[]): React.ReactNode {
    return components.map((component: IComponent) => {
      const config = componentConfig?.[component.name];

      // 容错处理
      if (!config?.dev) {
        return null;
      }

      return React.createElement(
        config.dev,
        {
          key: component.id,
          name: component.name,
          id: component.id,
          styles: component.styles || {},
          ...config.defaultProps,
          ...component.props,
        },
        renderComponents(component.children || [])
      );
    });
  }

  /**
   *  鼠标移动到组件上
   * @param e
   */
  const handleMouseHover: MouseEventHandler = (e) => {
    const target = e.target as HTMLElement; // 类型断言
    const componentId = target.dataset?.componentId;
    if (componentId) {
      setHoverComponentId(+componentId);
    }
  };

  /**
   * 组件点击
   */
  const handleClick: MouseEventHandler = (e) => {
    const path = e.nativeEvent.composedPath();

    for (let i = 0; i < path.length; i += 1) {
      const ele = path[i] as HTMLElement;

      const componentId = ele.dataset?.componentId;
      if (componentId) {
        setCurComponentId(+componentId);
        return;
      }
    }
  };

  return (
    <div
      className="h-[100%] edit-area"
      onMouseOver={handleMouseHover}
      onMouseLeave={() => {
        // 鼠标离开时置为空，以避免离开后还存在高亮的情况
        setHoverComponentId(undefined);
      }}
      onClick={handleClick}
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
}
