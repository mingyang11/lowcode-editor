import { Modal, Segmented } from 'antd';
import { useEffect, useState } from 'react';
import { GoToLink, IGoToLinkConfig } from './GoToLink';
import { ShowMessage, IShowMessageConfig } from './ShowMessage';
import { ICustomJSConfig, CustomJS } from './CustomJS';

export type ActionConfig =
  | ICustomJSConfig
  | IShowMessageConfig
  | IGoToLinkConfig;

interface ActionModalProps {
  visible: boolean;
  action?: ActionConfig;
  handleOk: (config: ActionConfig) => void;
  handleCancel: () => void;
}

const map = {
  goToLink: '访问链接',
  showMessage: '消息提示',
  customJS: '自定义 JS',
};

export function ActionModal(props: ActionModalProps) {
  const { visible, action, handleOk, handleCancel } = props;

  const [key, setKey] = useState<string>('访问链接');
  const [curConfig, setCurConig] = useState<ActionConfig>();

  useEffect(() => {
    if (action?.type) {
      setKey(map[action.type]);
    }
    console.log(action, 'actione');
  }, [action]);
  return (
    <Modal
      title="事件动作配置"
      width={800}
      open={visible}
      okText="添加"
      cancelText="取消"
      onOk={() => handleOk(curConfig as ActionConfig)}
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
            key="访问链接"
            defaultValue={action?.type === 'goToLink' ? action.url : ''}
            onChange={(config) => {
              setCurConig(config);
            }}
          />
        )}
        {key === '消息提示' && (
          <ShowMessage
            key="消息提示"
            onChange={(config) => {
              setCurConig(config);
            }}
            value={action?.type === 'showMessage' ? action.config : undefined}
          />
        )}
        {key === '自定义 JS' && (
          <CustomJS
            key="自定义 JS"
            onChange={(config) => {
              setCurConig(config);
            }}
            defaultValue={action?.type === 'customJS' ? action.code : ''}
          />
        )}
      </div>
    </Modal>
  );
}
