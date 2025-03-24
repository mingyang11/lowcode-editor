import { useComponentsStore } from '../../stores/components';
export default function Index() {
  const { components } = useComponentsStore();
  return <pre>{JSON.stringify(components, null, 2)}</pre>;
}
