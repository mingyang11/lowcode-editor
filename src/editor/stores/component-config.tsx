import { create } from 'zustand';
import Containerdev from '../materials/Container/dev';
import Containerprod from '../materials/Container/prod';
import Buttondev from '../materials/Button/dev';
import Buttonprod from '../materials/Button/prod';
import Pagedev from '../materials/Page/dev';
import Pagedprod from '../materials/Page/prod';

export interface ComponentSetter {
  name: string;
  label: string;
  type: string;
  [key: string]: any;
}

export interface ComponentConfig {
  name: string;
  defaultProps: Record<string, any>;
  desc: string;
  setter: ComponentSetter[];
  styleSetter: ComponentSetter[];
  // component: any;
  dev: any;
  prod: any;
}

interface State {
  componentConfig: { [key: string]: ComponentConfig };
}

interface Action {
  registerComponent: (name: string, componentConfig: ComponentConfig) => void;
}

export const useComponentConfigStore = create<State & Action>((set) => ({
  componentConfig: {
    Container: {
      name: 'Container',
      defaultProps: {},
      desc: '容器',
      setter: [],
      styleSetter: [],
      dev: Containerdev,
      prod: Containerprod,
    },
    Button: {
      name: 'Button',
      defaultProps: {
        type: 'primary',
        text: '按钮',
      },
      desc: '按钮',
      setter: [
        {
          name: 'type',
          label: '按钮类型',
          type: 'select',
          options: [
            { label: '主按钮', value: 'primary' },
            { label: '次按钮', value: 'default' },
          ],
        },
        {
          name: 'text',
          label: '文本',
          type: 'input',
        },
      ],
      styleSetter: [
        {
          label: '宽度',
          name: 'width',
          type: 'inputNumber',
        },
        {
          label: '高度',
          name: 'height',
          type: 'inputNumber',
        },
      ],
      dev: Buttondev,
      prod: Buttonprod,
    },
    Page: {
      name: 'Page',
      defaultProps: {},
      desc: '页面',
      setter: [],
      styleSetter: [],
      dev: Pagedev,
      prod: Pagedprod,
    },
  },
  registerComponent: (name, componentConfig) =>
    set((state) => {
      return {
        ...state,
        componentConfig: {
          ...state.componentConfig,
          [name]: componentConfig,
        },
      };
    }),
}));
