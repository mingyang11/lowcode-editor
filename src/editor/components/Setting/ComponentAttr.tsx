import { Form, Input, Select } from 'antd';
import { useComponentsStore } from '../../stores/components';
import {
  IComponentConfig,
  IComponentSetter,
  useComponentConfigStore,
} from '../../stores/componentConfig';
import { useEffect } from 'react';

export function ComponentAttr() {
  const [form] = Form.useForm();
  const { curComponentId, curComponent, updateComponentProps } =
    useComponentsStore();
  const { componentConfig } = useComponentConfigStore();

  function renderFormElement(setter: IComponentSetter) {
    const { type, options } = setter;
    if (type === 'select') {
      return <Select options={options} />;
    } else if (type === 'input') {
      return <Input />;
    }
  }

  function onValuesChange(formValue: IComponentConfig) {
    if (curComponentId) {
      console.log(formValue, 'formValue');

      updateComponentProps(curComponentId, formValue);
    }
  }

  useEffect(() => {
    form.setFieldsValue({
      ...curComponent?.props,
    });
  }, [curComponent]);

  if (!curComponent || !curComponentId) return null;

  return (
    <Form form={form} layout="vertical" onValuesChange={onValuesChange}>
      {/* <Form.Item label="组件ID">
        <Input value={curComponent?.id} disabled />
      </Form.Item> */}
      <Form.Item label="组件名称">
        <Input value={curComponent?.name} disabled />
      </Form.Item>
      <Form.Item label="组件描述">
        <Input value={curComponent?.desc} disabled />
      </Form.Item>
      {componentConfig[curComponent?.name as string]?.setter?.map(
        (setter: IComponentSetter) => {
          return (
            <Form.Item
              key={setter.name}
              name={setter.name}
              label={setter.label}
            >
              {renderFormElement(setter)}
            </Form.Item>
          );
        }
      )}
    </Form>
  );
}
