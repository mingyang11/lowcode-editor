import { PropsWithChildren } from 'react';
import { Button } from 'antd';

export interface IButton {
  type: 'link' | 'text' | 'default' | 'primary' | 'dashed' | undefined;
  text: string;
}

export default function Index(props: PropsWithChildren<IButton>) {
  const { text, type } = props;

  return <Button type={type}>{text || '按钮'}</Button>;
}
