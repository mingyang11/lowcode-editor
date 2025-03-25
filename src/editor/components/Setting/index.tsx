import { Segmented } from 'antd';
import { useComponentsStore } from '../../stores/components';
import { useState } from 'react';
import { ComponentAttr } from './ComponentAttr';
import { ComponentStyle } from './ComponentStyle';
import { ComponentEvent } from './ComponentEvent';

export default function Index() {
  const [checkValue, setCheckValue] = useState<string>('属性');
  const { curComponentId } = useComponentsStore();

  if (!curComponentId || curComponentId === 1) return null;
  return (
    <div className="h-full flex flex-col">
      <Segmented
        block
        options={['属性', '样式', '事件']}
        onChange={setCheckValue}
      />
      <div className="flex-1 mt-2 bg-white p-1">
        {checkValue === '属性' && <ComponentAttr />}
        {checkValue === '样式' && <ComponentStyle />}
        {checkValue === '事件' && <ComponentEvent />}
      </div>
    </div>
  );
}
