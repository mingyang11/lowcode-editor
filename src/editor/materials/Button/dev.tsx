import { Button as AntdButton } from 'antd';
import { CommonComponentProps } from '../../interface';

const Button = ({ type, text, id, styles }: CommonComponentProps) => {
  return (
    <AntdButton data-component-id={id} type={type} style={styles}>
      {text}
    </AntdButton>
  );
};

export default Button;
