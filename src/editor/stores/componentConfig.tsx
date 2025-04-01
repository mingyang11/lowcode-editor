import { create } from 'zustand';
import ButtonDev from '../materials/Button/dev';
import ContainerDev from '../materials/Container/dev';
import PageDev from '../materials/Page/dev';
import ButtonProd from '../materials/Button/prod';
import ContainerProd from '../materials/Container/prod';
import PageProd from '../materials/Page/prod';
import ModalDev from '../materials/Modal/dev';
import ModalProd from '../materials/Modal/prod';

export interface IComponentSetter {
  name: string;
  label: string;
  type: string;
  [key: string]: any;
}

export interface IComponentEvents {
  name: string;
  label: string;
}

export interface IComponentMethod {
  name: string;
  label: string;
}
export interface IComponentConfig {
  name: string;
  defaultProps: Record<string, any>;
  desc: string;
  setter?: IComponentSetter[];
  stylesSetter?: IComponentSetter[];
  events?: IComponentEvents[];
  methods?: IComponentMethod[];
  dev: any;
  prod: any;
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
        dev: PageDev,
        prod: PageProd,
      },
      Container: {
        name: 'Container',
        defaultProps: {},
        desc: '容器',
        dev: ContainerDev,
        prod: ContainerProd,
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
        events: [
          {
            name: 'onClick',
            label: '点击事件',
          },
          {
            name: 'onDoubleClick',
            label: '双击事件',
          },
        ],
        desc: '按钮',
        dev: ButtonDev,
        prod: ButtonProd,
      },
      Modal: {
        name: 'Modal',
        defaultProps: {
          title: '弹窗',
        },
        setter: [
          {
            name: 'title',
            label: '标题',
            type: 'input',
          },
        ],
        stylesSetter: [],
        events: [
          {
            name: 'onOk',
            label: '确认事件',
          },
          {
            name: 'onCancel',
            label: '取消事件',
          },
        ],
        methods: [
          { label: '打开弹窗', name: 'open' },
          { label: '关闭弹窗', name: 'close' },
        ],
        desc: '弹窗',
        dev: ModalDev,
        prod: ModalProd,
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
