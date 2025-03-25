import { Button } from 'antd';
import { useComponentsStore } from '../../stores/components';

export default function Index() {
  const { mode, updateMode, setCurComponentId } = useComponentsStore();
  return (
    <div className="h-full flex items-center justify-between pl-3 pr-3">
      <div>Lowcode-Editor</div>
      <Button
        onClick={() => {
          updateMode(mode === 'edit' ? 'preview' : 'edit');
          if (mode === 'edit') {
            setCurComponentId(null);
          }
        }}
        type="primary"
      >
        {mode === 'edit' ? '预览' : '退出预览'}
      </Button>
    </div>
  );
}
