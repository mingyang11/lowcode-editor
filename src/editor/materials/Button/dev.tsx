import { Button } from 'antd';
import { CommonComponentProps } from '../../interface';

export default function Index(props: CommonComponentProps) {
  const { text, type, id, styles } = props;

  return (
    <Button data-component-id={id} type={type} style={styles}>
      {text || '按钮'}
    </Button>
  );
}
