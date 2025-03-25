import { Allotment } from 'allotment';
import Header from './components/Header';
import MaterialWrapper from './components/MaterialWrapper';
import EditArea from './components/EditArea';
import Setting from './components/Setting';
import Preview from './components/Preview';
import { useComponentsStore } from './stores/components';
import 'allotment/dist/style.css';

export default function LowcodeEditor() {
  const { mode } = useComponentsStore();
  return (
    <div className="h-[100vh] flex flex-col">
      <div className="h-12 mb-4 bg-slate-100">
        <Header />
      </div>
      {mode === 'edit' ? (
        <Allotment className="bg-slate-100">
          <Allotment.Pane
            className="p-3 pt-1"
            preferredSize={240}
            maxSize={300}
            minSize={200}
          >
            <MaterialWrapper />
          </Allotment.Pane>
          <Allotment.Pane className="bg-white border-t">
            <EditArea />
          </Allotment.Pane>
          <Allotment.Pane
            className="p-3 pt-1"
            preferredSize={300}
            maxSize={400}
            minSize={300}
          >
            <Setting />
          </Allotment.Pane>
        </Allotment>
      ) : (
        <Preview />
      )}
    </div>
  );
}
