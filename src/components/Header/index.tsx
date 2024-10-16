import { Button } from 'antd';
import { useComponetsStore } from '../../editor/stores/components';
import { useEffect } from 'react';

const Index = () => {
  const { mode, setMode, setCurComponentId } = useComponetsStore();

  useEffect(() => {
    setCurComponentId(null);
  }, [mode]);
  return (
    <div>
      <Button
        onClick={() => setMode(mode === 'edit' ? 'preview' : 'edit')}
        type="primary"
      >
        {mode === 'edit' ? '预览' : '退出预览'}
      </Button>
    </div>
  );
};

export default Index;
