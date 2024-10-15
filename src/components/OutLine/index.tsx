import { Tree } from 'antd';
import { useComponetsStore } from '../../editor/stores/components';

function Index() {
  const { components, setCurComponentId } = useComponetsStore();
  return (
    <Tree
      fieldNames={{ title: 'desc', key: 'id' }}
      defaultExpandAll
      showLine
      treeData={components as any}
      onSelect={(keys) => {
        setCurComponentId(keys?.[0] as number);
      }}
    />
  );
}

export default Index;
