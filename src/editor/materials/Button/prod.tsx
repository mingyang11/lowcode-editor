import { Button } from 'antd';
import { CommonComponentProps } from '../../interface';

export default function Index(props: CommonComponentProps) {
  const { text, type, styles } = props;

  return (
    <Button type={type} style={styles}>
      {text || '按钮'}
    </Button>
  );
}
