import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { Dropdown, Popconfirm, Space } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { getComponentById, useComponetsStore } from '../../stores/components';

interface SelectedMaskProps {
  portalWrapperClassName: string;
  containerClassName: string;
  componentId: number;
}

function SelectedMask(props: SelectedMaskProps) {
  const { portalWrapperClassName, containerClassName, componentId } = props;

  const { components, curComponentId, deleteComponent, setCurComponentId } =
    useComponetsStore();

  const [position, setPosition] = useState({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    labelTop: 0,
    labelLeft: 0,
  });

  const updatePosition = () => {
    if (!componentId) return;

    const container = document.querySelector(`.${containerClassName}`);
    if (!container) return;

    const node = document.querySelector(`[data-component-id="${componentId}"]`);
    if (!node) return;

    const { top, left, width, height } = node.getBoundingClientRect();
    const { top: conTop, left: conLeft } = container.getBoundingClientRect();

    let labelTop = top - conTop + container.scrollTop;
    const labelLeft = left - conLeft + width;

    if (labelTop <= 0) {
      labelTop -= -20;
    }

    setPosition({
      top: top - conTop + container.scrollTop,
      left: left - conLeft + container.scrollTop,
      width,
      height,
      labelTop,
      labelLeft,
    });
  };

  const el = useMemo(() => {
    return document.querySelector(`.${portalWrapperClassName}`);
  }, []);

  // 当前选中的组件
  const curComponent = useMemo(() => {
    return getComponentById(componentId, components);
  }, [componentId, components]);

  // 当前选中组件的父组件
  const parentComponents = useMemo(() => {
    const parentComponents = [];
    let component = curComponent;
    while (component?.parentId) {
      component = getComponentById(component.parentId, components);
      parentComponents.push(component);
    }
    return parentComponents;
  }, [curComponent]);

  const handleDelete = () => {
    deleteComponent(curComponentId!);
    setCurComponentId(null);
  };

  useEffect(() => {
    setTimeout(() => {
      updatePosition();
    }, 100);
  }, [curComponentId]);

  useEffect(() => {
    setTimeout(() => {
      updatePosition();
    }, 100);
  }, [components]);

  useEffect(() => {
    const resizeHandler = () => {
      updatePosition();
    };
    window.addEventListener('resize', resizeHandler);
    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, []);

  console.log(el, 'el');

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
              items: parentComponents.map((item: any) => ({
                key: item.id,
                label: item.desc,
              })),
              onClick: ({ key }) => {
                setCurComponentId(Number(key));
              },
            }}
            disabled={parentComponents.length === 0}
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
    el as Element
  );
}

export { SelectedMask };
