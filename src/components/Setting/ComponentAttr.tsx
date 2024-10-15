import { Form, Input, Select } from 'antd';
import { useComponetsStore } from '../../editor/stores/components';
import {
  useComponentConfigStore,
  ComponentSetter,
  ComponentConfig,
} from '../../editor/stores/component-config';
import { useEffect } from 'react';

export function ComponentAttr() {
  const [form] = Form.useForm();

  const { curComponent, curComponentId, updateComponentProps } =
    useComponetsStore();
  const { componentConfig } = useComponentConfigStore();

  const onValuesChange = (changedValues: ComponentConfig) => {
    updateComponentProps(curComponentId as number, changedValues);
  };

  const renderFormElememt = (setter: ComponentSetter) => {
    const { type, options } = setter;
    if (type === 'select') {
      return (
        <Select>
          {options.map((option: any) => {
            return (
              <Select.Option key={option.value} value={option.value}>
                {option.label}
              </Select.Option>
            );
          })}
        </Select>
      );
    } else if (type === 'input') {
      return <Input></Input>;
    }
  };

  useEffect(() => {
    const data = form.getFieldsValue();
    form.setFieldsValue({ ...data, ...curComponent?.props });
  }, [curComponent]);

  if (!curComponentId) return;
  return (
    <Form
      form={form}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 14 }}
      onValuesChange={onValuesChange}
    >
      <Form.Item label="组件ID">
        <Input value={curComponent?.id} disabled></Input>
      </Form.Item>
      <Form.Item label="组件名称">
        <Input value={curComponent?.name} disabled></Input>
      </Form.Item>
      <Form.Item label="组件描述">
        <Input value={curComponent?.desc} disabled></Input>
      </Form.Item>
      {componentConfig[curComponent?.name as string]?.setter?.map((setter) => {
        return (
          <Form.Item key={setter.name} name={setter.name} label={setter.label}>
            {renderFormElememt(setter)}
          </Form.Item>
        );
      })}
    </Form>
  );
}
