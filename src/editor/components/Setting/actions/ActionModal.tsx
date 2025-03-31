import { Modal, Segmented } from 'antd';
import { IComponentEvents } from '../../../stores/componentConfig';
import { useState } from 'react';
import { GoToLink, IGoToLinkConfig } from './GoToLink';
import { ShowMessage, IShowMessageConfig } from './ShowMessage';

interface ActionModalProps {
  visible: boolean;
  eventConfig: IComponentEvents;
  handleOk: (config: IShowMessageConfig | IGoToLinkConfig) => void;
  handleCancel: () => void;
}
export function ActionModal(props: ActionModalProps) {
  const { visible, eventConfig, handleOk, handleCancel } = props;
  const [key, setKey] = useState<string>('访问链接');

  const [curConfig, setCurConig] = useState<
    IShowMessageConfig | IGoToLinkConfig
  >();
  return (
    <Modal
      title="事件动作配置"
      width={800}
      open={visible}
      okText="添加"
      cancelText="取消"
      onOk={() => handleOk(curConfig as IShowMessageConfig | IGoToLinkConfig)}
      onCancel={handleCancel}
    >
      <div className="h-[500px]">
        <Segmented
          value={key}
          onChange={setKey}
          block
          options={['访问链接', '消息提示', '自定义 JS']}
        />
        {key === '访问链接' && (
          <GoToLink
            onChange={(config) => {
              setCurConig(config);
            }}
          />
        )}
        {key === '消息提示' && (
          <ShowMessage
            onChange={(config) => {
              setCurConig(config);
            }}
          />
        )}
      </div>
    </Modal>
  );
}
