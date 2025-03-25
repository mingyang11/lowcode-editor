import { Form, Input, InputNumber, Select } from 'antd';
import { useComponentsStore } from '../../stores/components';
import {
  IComponentConfig,
  IComponentSetter,
  useComponentConfigStore,
} from '../../stores/componentConfig';
import { CSSProperties, useEffect } from 'react';

export function ComponentStyle() {
  const [form] = Form.useForm();
  const { curComponentId, curComponent, updateComponentStyles } =
    useComponentsStore();
  const { componentConfig } = useComponentConfigStore();

  function renderFormElement(setter: IComponentSetter) {
    const { type, options } = setter;
    if (type === 'select') {
      return <Select options={options} />;
    } else if (type === 'input') {
      return <Input />;
    } else if (type === 'inputNumber') {
      return <InputNumber style={{ width: '100%' }} />;
    }
  }

  function onValuesChange(formValue: IComponentConfig) {
    if (curComponentId) {
      updateComponentStyles(curComponentId, formValue as CSSProperties);
    }
  }

  useEffect(() => {
    form.setFieldsValue({
      ...curComponent?.styles,
    });
  }, [curComponent]);

  if (!curComponent || !curComponentId) return null;

  return (
    <Form form={form} layout="vertical" onValuesChange={onValuesChange}>
      {componentConfig[curComponent?.name as string]?.stylesSetter?.map(
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
