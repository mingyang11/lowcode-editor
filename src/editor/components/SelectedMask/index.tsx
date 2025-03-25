import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { Dropdown, Popconfirm, Space } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { ItemType } from 'antd/es/menu/interface';
import { useComponentsStore, getComponentById } from '../../stores/components';

interface IHoverMaskProps {
  portalWrapperClassName: string;
  componentId: number;
  containerClassName: string;
}

export default function SelectedMask(props: IHoverMaskProps) {
  const { componentId, containerClassName, portalWrapperClassName } = props;
  const {
    components,
    curComponentId,
    curComponent: curClickComponent,
    deleteComponent,
    setCurComponentId,
  } = useComponentsStore();
  const [position, setPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
    height: 0,
    labelTop: 0,
    labelLeft: 0,
  });

  useEffect(() => {
    updatePosition();
  }, [componentId, components]);

  // 页面宽度改变时更新选中组件的尺寸
  useEffect(() => {
    const resizeHandler = () => {
      updatePosition();
    };

    window.addEventListener('resize', resizeHandler);
    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  });

  function updatePosition() {
    if (!componentId) return;
    // 获取EditArea的dom
    const container = document.querySelector(`.${containerClassName}`);
    if (!container) return;

    // 获取目标组件的dom
    const node = document.querySelector(`[data-component-id="${componentId}"]`);
    if (!node) return;

    const { top, left, width, height } = node.getBoundingClientRect();
    const { top: containerTop, left: containerLeft } =
      container.getBoundingClientRect();

    let labelTop = top - containerTop + container.scrollTop;
    const labelLeft = left - containerLeft + width;
    if (labelTop <= 0) {
      labelTop -= -20;
    }

    setPosition({
      top: top - containerTop + container.scrollTop,
      left: left - containerLeft + container.scrollTop,
      width,
      height,
      labelTop,
      labelLeft,
    });
  }

  const handleDelete = () => {
    deleteComponent(curComponentId!);
    setCurComponentId(null);
  };

  const el = useMemo(() => {
    return document.querySelector(`.${portalWrapperClassName}`)!;
  }, [portalWrapperClassName]);

  const curComponent = useMemo(() => {
    return getComponentById(componentId, components);
  }, [componentId, components]);

  const parentComponents = useMemo(() => {
    const parentComponents = [];
    let component = curClickComponent;
    while (component?.parentId) {
      component = getComponentById(component.parentId, components);
      parentComponents.push(component);
    }

    return parentComponents;
  }, [curClickComponent, components]);

  return createPortal(
    <>
      <div
        style={{
          position: 'absolute',
          left: position.left,
          top: position.top,
          backgroundColor: 'rgba(0, 0, 255, 0.1)',
          border: '1px dashed blue',
          pointerEvents: 'none',
          width: position.width,
          height: position.height,
          zIndex: 12,
          borderRadius: 4,
          boxSizing: 'border-box',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: position.labelLeft,
          top: position.labelTop,
          fontSize: '14px',
          zIndex: 13,
          display: !position.width || position.width < 10 ? 'none' : 'inline',
          transform: 'translate(-100%, -100%)',
        }}
      >
        <Space>
          <Dropdown
            menu={{
              items: parentComponents.map((com) => ({
                key: com?.id,
                label: com?.desc,
              })) as ItemType[],
              onClick: ({ key }) => {
                setCurComponentId(+key);
              },
            }}
            // disabled={parentComponents.length === 0}
          >
            <div
              style={{
                padding: '0 8px',
                backgroundColor: 'blue',
                borderRadius: 4,
                color: '#fff',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              {curComponent?.desc}
            </div>
          </Dropdown>

          {curComponentId !== 1 && (
            <div style={{ padding: '0 8px', backgroundColor: 'blue' }}>
              <Popconfirm
                title="确认删除？"
                okText={'确认'}
                cancelText={'取消'}
                onConfirm={handleDelete}
              >
                <DeleteOutlined style={{ color: '#fff' }} />
              </Popconfirm>
            </div>
          )}
        </Space>
      </div>
    </>,
    el
  );
}
