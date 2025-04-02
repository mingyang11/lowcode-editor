import { Button } from 'antd';
import { useDrag } from 'react-dnd';
import { CommonComponentProps } from '../../interface';

export default function Index(props: CommonComponentProps) {
  const { text, type, id, styles } = props;
  const [_, drag] = useDrag({
    type: 'Button',
    item: {
      type: 'Button',
      dragType: 'move',
      id,
    },
  });

  return (
    <Button ref={drag} data-component-id={id} type={type} style={styles}>
      {text || '按钮'}
    </Button>
  );
}
