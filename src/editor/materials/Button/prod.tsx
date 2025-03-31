import { Button } from 'antd';
import { CommonComponentProps } from '../../interface';

export default function Index(props: CommonComponentProps) {
  const { text, type, styles, id, ...rest } = props;

  return (
    <Button type={type} style={styles} {...rest}>
      {text || '按钮'}
    </Button>
  );
}
