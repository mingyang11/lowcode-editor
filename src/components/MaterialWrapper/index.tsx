import { Segmented } from 'antd';
import { useState } from 'react';
import Material from '../Meterial';
import OutLine from '../OutLine';
import SourceCode from '../SourceCode';

function Index() {
  const [key, setKey] = useState<string>('物料');
  return (
    <div style={{ height: 'calc(100vh - 100px)' }}>
      <Segmented
        value={key}
        onChange={setKey}
        block
        options={['物料', '大纲', '源码']}
      />
      {key === '物料' && <Material />}
      {key === '大纲' && <OutLine />}
      {key === '源码' && <SourceCode />}
    </div>
  );
}

export default Index;
