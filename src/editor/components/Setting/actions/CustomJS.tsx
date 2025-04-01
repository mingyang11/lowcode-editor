import MonacoEditor, { OnMount } from '@monaco-editor/react';
import { useState } from 'react';
import { useComponentsStore } from '../../../stores/components';

export interface ICustomJSConfig {
  type: 'customJS';
  code: string;
}

export interface ICustomJSProps {
  defaultValue?: string;
  onChange?: (config: ICustomJSConfig) => void;
}

export function CustomJS(props: ICustomJSProps) {
  const { defaultValue, onChange } = props;
  const [value, setValue] = useState<string>(defaultValue as string);

  const { curComponentId } = useComponentsStore();

  const handleEditorMount: OnMount = (editor, monaco) => {
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyJ, () => {
      editor.getAction('editor.action.formatDocument')?.run();
    });
  };

  function codeChange(value: string) {
    if (!curComponentId) return;
    setValue(value);
    onChange?.({
      type: 'customJS',
      code: value,
    });
  }
  return (
    <div className="mt-[40px]">
      <div className="flex items-start gap-[10px]">
        <div>自定义 JS</div>
        <div>
          <MonacoEditor
            width={'600px'}
            height={'400px'}
            path="action.js"
            language="javascript"
            onMount={handleEditorMount}
            onChange={(v) => codeChange(v as string)}
            value={value}
            options={{
              fontSize: 14,
              scrollBeyondLastLine: false,
              minimap: {
                enabled: false,
              },
              scrollbar: {
                verticalScrollbarSize: 6,
                horizontalScrollbarSize: 6,
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
