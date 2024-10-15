import { Button } from 'antd';
import { useComponetsStore } from '../../editor/stores/components';

const Index = () => {
  const { mode, setMode } = useComponetsStore();
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
