import { PropsWithChildren } from 'react';
import { Button } from 'antd';

export interface IButton {
  type: 'link' | 'text' | 'default' | 'primary' | 'dashed' | undefined;
  text: string;
  id: number;
}

export default function Index(props: PropsWithChildren<IButton>) {
  const { text, type, id } = props;

  return (
    <Button data-component-id={id} type={type}>
      {text || '按钮'}
    </Button>
  );
}
