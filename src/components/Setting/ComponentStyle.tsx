import { Form, Input, InputNumber, Select } from 'antd';
import { useState } from 'react';
import { useComponetsStore } from '../../editor/stores/components';
import {
  useComponentConfigStore,
  ComponentSetter,
} from '../../editor/stores/component-config';
import { useEffect } from 'react';
import CssEditor from './CssEditor';
import { debounce } from 'lodash-es';
import styleToObject from 'style-to-object';

export function ComponentStyle() {
  const [form] = Form.useForm();
  const [css, setCss] = useState(`.comp{\n\n}`);
  const { curComponentId, curComponent, updateComponentStyles } =
    useComponetsStore();
  const { componentConfig } = useComponentConfigStore();

  useEffect(() => {
    form.resetFields();

    const formData = { ...curComponent?.styles };
    form.setFieldsValue({ width: formData.width, height: formData.height });

    setCss(toCSSStr(curComponent?.styles!));
  }, [curComponent]);

  if (!curComponentId || !curComponent) return null;

  function toCSSStr(css: Record<string, any>) {
    let str = `.comp {\n`;
    for (let key in css) {
      let value = css[key];
      if (!value) {
        continue;
      }
      if (
        ['width', 'height'].includes(key) &&
        !value.toString().endsWith('px')
      ) {
        value += 'px';
      }

      str += `\t${key}: ${value};\n`;
    }
    str += `}`;
    return str;
  }

  const onValuesChange = (changedValues: any) => {
    if (curComponentId) {
      updateComponentStyles(curComponentId, changedValues);
    }
  };

  const handleEditorChange = debounce((value) => {
    setCss(value);

    const css: Record<string, any> = {};

    try {
      const cssStr = value
        .replace(/\/\*.*\*\//, '') // 去掉注释 /** */
        .replace(/(\.?[^{]+{)/, '') // 去掉 .comp {
        .replace('}', ''); // 去掉 }

      styleToObject(cssStr, (name, value) => {
        css[
          name.replace(/-\w/, (item) => item.toUpperCase().replace('-', ''))
        ] = value;
      });

      console.log(css);
      updateComponentStyles(
        curComponentId,
        { ...form.getFieldsValue(), ...css },
        true
      );
    } catch (e) {
      console.log(e);
    }
  }, 500);

  const renderFormElememt = (item: ComponentSetter) => {
    const { type, options } = item;
    if (type === 'input') {
      return <Input style={{ width: '100%' }}></Input>;
    } else if (type === 'select') {
      return <Select style={{ width: '100%' }} options={options} />;
    } else if (type === 'inputNumber') {
      return <InputNumber style={{ width: '100%' }} />;
    }
  };

  return (
    <Form
      form={form}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 14 }}
      onValuesChange={onValuesChange}
    >
      {componentConfig[curComponent?.name].styleSetter.map(
        (item: ComponentSetter) => {
          return (
            <Form.Item key={item.name} name={item.name} label={item.label}>
              {renderFormElememt(item)}
            </Form.Item>
          );
        }
      )}

      <div className="h-[200px] border-[1px] border-[#ccc]">
        <CssEditor value={css} onChange={handleEditorChange} />
      </div>
    </Form>
  );
}
