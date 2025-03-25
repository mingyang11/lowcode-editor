import { Segmented } from 'antd';
import Material from '../Material';
import { Source } from '../Source';
import Outline from '../Outline';
import { useState } from 'react';

function MaterialWrapper() {
  const [checkValue, setCheckValue] = useState<string>();
  return (
    <div className="h-full flex flex-col">
      <Segmented
        options={['物料', '大纲', '源码']}
        onChange={setCheckValue}
        block
      />
      <div className="flex-1 mt-2 bg-white p-1 ">
        {checkValue === '物料' && <Material />}
        {checkValue === '大纲' && <Outline />}
        {checkValue === '源码' && <Source />}
      </div>
    </div>
  );
}

export default MaterialWrapper;
