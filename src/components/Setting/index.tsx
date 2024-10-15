import { Segmented } from 'antd';
import { useComponetsStore } from '../../editor/stores/components';
import { useMemo, useState } from 'react';
import { ComponentAttr } from './ComponentAttr';
import { ComponentStyle } from './ComponentStyle';
import { ComponentEvent } from './ComponentEvent';

const Index = () => {
  const [key, setKey] = useState<'属性' | '样式' | '事件'>('属性');
  const { curComponentId } = useComponetsStore();

  const renderContent = useMemo(() => {
    return {
      属性: <ComponentAttr />,
      样式: <ComponentStyle />,
      事件: <ComponentEvent />,
    };
  }, [key]);

  /** 当前没有选中的组件时返回null */
  if (!curComponentId) return null;
  return (
    <div>
      <Segmented
        value={key}
        onChange={setKey}
        block
        options={['属性', '样式', '事件']}
      />
      <div className="pt-[20px]">{renderContent[key]}</div>
    </div>
  );
};

export default Index;
