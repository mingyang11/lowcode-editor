import { Collapse, CollapseProps, Button } from 'antd';
import { useComponentsStore } from '../../stores/components';
import {
  IComponentEvents,
  useComponentConfigStore,
} from '../../stores/componentConfig';
import { ActionModal } from './actions/ActionModal';
import { IGoToLinkConfig } from './actions/GoToLink';
import { IShowMessageConfig } from './actions/ShowMessage';
import { useState } from 'react';

export function ComponentEvent() {
  const { curComponent, updateComponentProps } = useComponentsStore();
  const { componentConfig } = useComponentConfigStore();
  const [actionModalOpen, setActionModalOpen] = useState<boolean>(false);
  const [curEvent, setCurEvent] = useState<IComponentEvents>();

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
            (item: IShowMessageConfig | IGoToLinkConfig, index: number) => {
              return (
                <div>
                  {item.type === 'goToLink' ? (
                    <div className="border border-[#aaa] m-[10px] p-[10px] flex-1">
                      <div className="text-[blue] flex justify-between">
                        <span className="flex-1">跳转链接</span>
                        <a onClick={() => deleteAction(event, index)}>删除</a>
                      </div>
                      <div>{item.url}</div>
                    </div>
                  ) : null}
                  {item.type === 'showMessage' ? (
                    <div className="border border-[#aaa] m-[10px] p-[10px]">
                      <div className="text-[blue] flex justify-between">
                        <span className="flex-1">消息弹窗</span>
                        <a onClick={() => deleteAction(event, index)}>删除</a>
                      </div>
                      <div>{item.config.type}</div>
                      <div>{item.config.text}</div>
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

  const handleModalOk = (config: IShowMessageConfig | IGoToLinkConfig) => {
    if (!config || !curEvent || !curComponent) return null;

    updateComponentProps(curComponent.id, {
      [curEvent.name]: {
        actions: [
          ...(curComponent.props[curEvent.name]?.actions || []),
          config,
        ],
      },
    });

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
        eventConfig={curEvent!}
        handleOk={(config: IShowMessageConfig | IGoToLinkConfig) => {
          handleModalOk(config);
        }}
        handleCancel={() => {
          setActionModalOpen(false);
        }}
      />
    </div>
  );
}
