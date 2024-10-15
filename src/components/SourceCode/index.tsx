import MonacoEditor, { OnMount } from '@monaco-editor/react';
import { useComponetsStore } from '../../editor/stores/components';

function Index() {
  const { components } = useComponetsStore();

  const handleEditorMount: OnMount = (editor, monaco) => {
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyJ, () => {
      editor.getAction('editor.action.formatDocument')?.run();
    });
  };

  // return <div>{JSON.stringify(components, null, 2)}</div>;
  return (
    <MonacoEditor
      height={'100%'}
      path="components.json"
      language="json"
      onMount={handleEditorMount}
      value={JSON.stringify(components, null, 2)}
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
  );
}

export default Index;
