import { Collapse, CollapseProps, Button } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useComponentsStore, getComponentById } from '../../stores/components';
import {
  IComponentEvents,
  useComponentConfigStore,
} from '../../stores/componentConfig';
import { ActionModal, ActionConfig } from './actions/ActionModal';
import { useState } from 'react';

export function ComponentEvent() {
  const { curComponent, components, updateComponentProps } =
    useComponentsStore();
  const { componentConfig } = useComponentConfigStore();
  const [actionModalOpen, setActionModalOpen] = useState<boolean>(false);
  const [curEvent, setCurEvent] = useState<IComponentEvents>();
  const [curConfig, setCurConfig] = useState<ActionConfig>();
  const [curConfigIndex, setCurConfigIndex] = useState<number>();

  if (!curComponent) return null;

  function deleteAction(event: IComponentEvents, index: number) {
    if (!curComponent) return null;
    const actions = curComponent.props[event.name].actions || [];
    actions.splice(index, 1);

    updateComponentProps(curComponent.id, {
      [event.name]: {
        actions: actions,
      },
    });
  }

  function editAction(item: ActionConfig, index: number) {
    if (!curComponent) return null;
    setCurConfig(item);
    setActionModalOpen(true);
    setCurConfigIndex(index);
  }

  const items: CollapseProps['items'] = (
    componentConfig[curComponent.name].events || []
  ).map((event) => {
    return {
      key: event.name,
      label: (
        <div className="flex justify-between">
          {event.label}
          <Button
            onClick={(e) => {
              e.stopPropagation();
              setCurEvent(event);
              setActionModalOpen(true);
            }}
          >
            添加事件
          </Button>
        </div>
      ),
      children: (
        <div>
          {(curComponent.props[event.name]?.actions || []).map(
            (item: ActionConfig, index: number) => {
              return (
                <div>
                  {item.type === 'goToLink' ? (
                    <div className="border border-[#aaa] m-[10px] p-[10px] flex-1">
                      <div className="text-[blue] flex justify-between">
                        <span className="flex-1">跳转链接</span>
                        <div className="flex gap-2">
                          <a
                            className="cursor-pointer"
                            onClick={() => editAction(item, index)}
                          >
                            编辑
                          </a>
                          <a
                            className="cursor-pointer"
                            onClick={() => deleteAction(event, index)}
                          >
                            删除
                          </a>
                        </div>
                      </div>
                      <div>{item.url}</div>
                    </div>
                  ) : null}
                  {item.type === 'showMessage' ? (
                    <div className="border border-[#aaa] m-[10px] p-[10px]">
                      <div className="text-[blue] flex justify-between">
                        <span className="flex-1">消息弹窗</span>
                        <div className="flex gap-2">
                          <a
                            className="cursor-pointer"
                            onClick={() => editAction(item, index)}
                          >
                            编辑
                          </a>
                          <a
                            className="cursor-pointer"
                            onClick={() => deleteAction(event, index)}
                          >
                            删除
                          </a>
                        </div>
                      </div>
                      <div>{item.config.type}</div>
                      <div>{item.config.text}</div>
                    </div>
                  ) : null}
                  {item.type === 'customJS' ? (
                    <div className="border border-[#aaa] m-[10px] p-[10px]">
                      <div className="text-[blue] flex justify-between">
                        <span className="flex-1">自定义JS</span>
                        <div className="flex gap-2">
                          <a
                            className="cursor-pointer"
                            onClick={() => editAction(item, index)}
                          >
                            编辑
                          </a>
                          <a
                            className="cursor-pointer"
                            onClick={() => deleteAction(event, index)}
                          >
                            删除
                          </a>
                        </div>
                      </div>
                      <div>{item.type}</div>
                      <div>{item.code}</div>
                    </div>
                  ) : null}
                  {item.type === 'componentMethod' ? (
                    <div
                      key="componentMethod"
                      className="border border-[#aaa] m-[10px] p-[10px] relative"
                    >
                      <div className="text-[blue]">组件方法</div>
                      <div>
                        {
                          getComponentById(item.config.componentId, components)
                            ?.desc
                        }
                      </div>
                      <div>{item.config.componentId}</div>
                      <div>{item.config.method}</div>
                      <div
                        style={{
                          position: 'absolute',
                          top: 10,
                          right: 30,
                          cursor: 'pointer',
                        }}
                        onClick={() => editAction(item, index)}
                      >
                        <EditOutlined />
                      </div>
                      <div
                        style={{
                          position: 'absolute',
                          top: 10,
                          right: 10,
                          cursor: 'pointer',
                        }}
                        onClick={() => deleteAction(event, index)}
                      >
                        <DeleteOutlined />
                      </div>
                    </div>
                  ) : null}
                </div>
              );
            }
          )}
        </div>
      ),
    };
  });

  const handleModalOk = (config?: ActionConfig) => {
    if (!config || !curEvent || !curComponent) return null;

    if (curConfig) {
      updateComponentProps(curComponent.id, {
        [curEvent.name]: {
          actions: curComponent.props[curEvent.name]?.actions.map(
            (item: ActionConfig, index: number) => {
              return index === curConfigIndex ? config : item;
            }
          ),
        },
      });
    } else {
      updateComponentProps(curComponent.id, {
        [curEvent.name]: {
          actions: [
            ...(curComponent.props[curEvent.name]?.actions || []),
            config,
          ],
        },
      });
    }

    setCurConfig(undefined);
    setActionModalOpen(false);
  };

  return (
    <div className="px-[10px]">
      <Collapse
        className="mb-[10px]"
        items={items}
        defaultActiveKey={componentConfig[curComponent.name]?.events?.map(
          (item) => item.name
        )}
      />
      <ActionModal
        visible={actionModalOpen}
        action={curConfig}
        handleOk={(config: ActionConfig) => {
          handleModalOk(config);
        }}
        handleCancel={() => {
          setActionModalOpen(false);
        }}
      />
    </div>
  );
}
