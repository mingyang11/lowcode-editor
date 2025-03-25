import { Tree } from 'antd';
import { BasicDataNode } from 'antd/es/tree';
import { useComponentsStore } from '../../stores/components';

function Outline() {
  const { components, setCurComponentId } = useComponentsStore();
  return (
    <Tree
      fieldNames={{ title: 'desc', key: 'id' }}
      treeData={components as BasicDataNode[]}
      showLine
      defaultExpandAll
      onSelect={([selectedKey]) => {
        setCurComponentId(selectedKey as number);
      }}
    />
  );
}

export default Outline;
