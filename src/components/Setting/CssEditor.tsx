import MonacoEditor, { OnMount, EditorProps } from '@monaco-editor/react';
import { editor } from 'monaco-editor';

export interface EditorFile {
  name: string;
  value: string;
  language: string;
}

interface Props {
  value: string;
  onChange?: EditorProps['onChange'];
  options?: editor.IStandaloneEditorConstructionOptions;
}

function Index(props: Props) {
  const { onChange, value, options } = props;
  const handleEditorMount: OnMount = (editor, monaco) => {
    editor.addCommand(monaco?.KeyCode?.CtrlCmd | monaco.KeyCode.KeyJ, () => {
      editor.getAction('editor.action.formatDocument')?.run();
    });
  };

  return (
    <MonacoEditor
      height={'100%'}
      path="component.css"
      language="css"
      onMount={handleEditorMount}
      onChange={onChange}
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
        ...options,
      }}
    />
  );
}

export default Index;
