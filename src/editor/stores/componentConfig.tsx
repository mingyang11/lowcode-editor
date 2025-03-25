import { create } from 'zustand';
import Button from '../materials/Button';
import Container from '../materials/Container';
import Page from '../materials/Page';

export interface IComponentConfig {
  name: string;
  defaultProps: Record<string, any>;
  desc: string;
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
