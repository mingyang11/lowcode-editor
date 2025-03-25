import { CSSProperties } from 'react';
import { create } from 'zustand';

export interface IComponent {
  id: number;
  name: string;
  props: any;
  desc: string;
  styles?: CSSProperties;
  children?: IComponent[];
  parentId?: number;
}

interface IState {
  components: IComponent[];
  curComponentId?: number | null;
  curComponent: IComponent | null;
}

interface IAction {
  addComponent: (component: IComponent, parentId?: number) => void;
  deleteComponent: (componentId: number | null) => void;
  updateComponentProps: (componentId: number | null, props: any) => void;
  setCurComponentId: (componentId: number | null) => void;
  updateComponentStyles: (
    componentId: number | null,
    styles: CSSProperties
  ) => void;
}

export const useComponentsStore = create<IState & IAction>((set, get) => {
  return {
    components: [
      {
        id: 1,
        name: 'Page',
        props: {},
        desc: '页面',
      },
    ],
    curComponentId: null,
    curComponent: null,
    /**
     * 新增
     * @param component
     * @param parentId
     * @returns
     */
    addComponent: (component: IComponent, parentId?: number) =>
      set((state) => {
        // parentId是否存在？存在时找到对应的组件，并在其children中添加，不存在时在第一级的组件中
        if (parentId) {
          const parentComponent = getComponentById(parentId, state.components);
          if (parentComponent) {
            if (parentComponent.children) {
              parentComponent.children.push(component);
            } else {
              parentComponent.children = [component];
            }
          }
          component.parentId = parentId;
          return { components: [...state.components] };
        }

        return { components: [...state.components, component] };
      }),

    /**
     * 删除
     * @param componentId
     * @returns
     */
    deleteComponent: (componentId: number | null) => {
      if (!componentId) return;
      const component = getComponentById(componentId, get().components);
      if (component?.parentId) {
        const parentComponent = getComponentById(
          component.parentId,
          get().components
        );
        if (parentComponent) {
          parentComponent.children = parentComponent?.children?.filter(
            (com) => com.id !== componentId
          );

          set({ components: [...get().components] });
        }
      }
    },

    /**
     * 更新props
     * @param componentId
     * @param props
     * @returns
     */
    updateComponentProps: (componentId: number | null, props: any) =>
      set((state) => {
        const component = getComponentById(componentId, state.components);
        if (component) {
          component.props = { ...component.props, ...props };
        }
        return { components: [...state.components] };
      }),

    setCurComponentId: (curComponentId) =>
      set((state) => ({
        curComponentId: curComponentId,
        curComponent: getComponentById(curComponentId, state.components),
      })),

    updateComponentStyles: (componentId, styles: any) =>
      set((state) => {
        const component = getComponentById(componentId, state.components);
        if (component) {
          component.styles = { ...component.styles, ...styles };
        }
        return { components: [...state.components] };
      }),
  };
});

/**
 * 通过id在组件数据中查找需要插入的组件
 * @param id id
 * @param components 组件树
 * @returns parentComponent
 */
export const getComponentById = (
  id: number | null,
  components: IComponent[]
): IComponent | null => {
  if (!id) return null;

  for (const component of components) {
    if (component.id === id) return component;
    if (component.children?.length) {
      const result = getComponentById(id, component.children);
      if (result !== null) return result;
    }
  }

  return null;
};
