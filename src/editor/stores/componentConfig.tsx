import { create } from 'zustand';
import Button from '../materials/Button';
import Container from '../materials/Container';
import Page from '../materials/Page';

export interface IComponentSetter {
  name: string;
  label: string;
  type: string;
  [key: string]: any;
}
export interface IComponentConfig {
  name: string;
  defaultProps: Record<string, any>;
  desc: string;
  setter?: IComponentSetter[];
  stylesSetter?: IComponentSetter[];
  component: any;
}

interface IState {
  componentConfig: Record<string, IComponentConfig>;
}

interface IAction {
  registerComponent: (name: string, componentConfig: IComponentConfig) => void;
}

export const useComponentConfigStore = create<IState & IAction>((set) => {
  return {
    componentConfig: {
      Page: {
        name: 'Page',
        defaultProps: {},
        desc: '页面',
        component: Page,
      },
      Container: {
        name: 'Container',
        defaultProps: {},
        desc: '容器',
        component: Container,
      },
      Button: {
        name: 'Button',
        defaultProps: { type: 'primary', text: '按钮' },
        setter: [
          {
            label: '按钮类型',
            name: 'type',
            type: 'select',
            options: [
              { label: '主按钮', value: 'primary' },
              { label: '次按钮', value: 'default' },
            ],
          },
          {
            label: '文本',
            name: 'text',
            type: 'input',
          },
        ],
        stylesSetter: [
          {
            name: 'width',
            label: '宽度',
            type: 'inputNumber',
          },
          {
            name: 'height',
            label: '高度',
            type: 'inputNumber',
          },
        ],
        desc: '按钮',
        component: Button,
      },
    },
    registerComponent: (name, config) =>
      set((state) => {
        return {
          ...state,
          componentConfig: {
            ...state.componentConfig,
            [name]: config,
          },
        };
      }),
  };
});
