import { Input } from 'antd';
import { useComponentsStore } from '../../../stores/components';
import { useState } from 'react';

export interface IGoToLinkConfig {
  type: 'goToLink';
  url: string;
}

export interface IGoToLinkProps {
  defaultValue?: string;
  onChange?: (config: IGoToLinkConfig) => void;
}

export function GoToLink(props: IGoToLinkProps) {
  const { defaultValue, onChange } = props;

  const { curComponentId } = useComponentsStore();
  const [value, setValue] = useState(defaultValue);

  function urlChange(value: string) {
    if (!curComponentId) return;
    setValue(value);
    onChange?.({ type: 'goToLink', url: value });
  }

  return (
    <div className="mt-[10px]">
      <div className="flex items-center">
        <div>链接：</div>
        <div className="flex-1">
          <Input
            onChange={(e) => {
              urlChange(e.target.value);
            }}
            value={value}
          />
        </div>
      </div>
    </div>
  );
}
