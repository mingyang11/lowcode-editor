import { Input, Select } from 'antd';
import { IComponentEvents } from '../../../stores/componentConfig';
import { useComponentsStore } from '../../../stores/components';
import { useState } from 'react';

export interface IShowMessageConfig {
  type: 'showMessage';
  config: {
    type: 'success' | 'error';
    text: string;
  };
}

export interface IShowMessageProps {
  value?: IShowMessageConfig['config'];
  onChange?: (config: IShowMessageConfig) => void;
}

export function ShowMessage(props: IShowMessageProps) {
  const { value, onChange } = props;

  const { curComponentId } = useComponentsStore();
  const [type, setType] = useState<'success' | 'error'>(
    value?.type || 'success'
  );
  const [text, setText] = useState<string>(value?.text || '');

  function messageTypeChange(value: 'success' | 'error') {
    if (!curComponentId) return;

    setType(value);
    onChange?.({
      type: 'showMessage',
      config: {
        type: value,
        text,
      },
    });
  }

  function messageTextChange(value: string) {
    if (!curComponentId) return;

    setText(value);
    onChange?.({
      type: 'showMessage',
      config: {
        type: type,
        text: value,
      },
    });
  }

  return (
    <div className="mt-[10px]">
      <div className="flex items-center">
        <div>类型：</div>
        <Select
          className="flex-1"
          options={[
            { label: '成功', value: 'success' },
            { label: '失败', value: 'error' },
          ]}
          onChange={(value) => {
            messageTypeChange(value);
          }}
          value={type}
        />
      </div>
      <div className="flex items-center mt-[10px]">
        <div>文本：</div>
        <div className="flex-1">
          <Input
            onChange={(e) => {
              messageTextChange(e.target.value);
            }}
            value={text}
          />
        </div>
      </div>
    </div>
  );
}
