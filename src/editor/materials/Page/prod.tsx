import { CommonComponentProps } from '../../interface';

const Page = ({ children, styles }: CommonComponentProps) => {
  return (
    <div style={{ ...styles }} className="p-[20px]">
      {children}
    </div>
  );
};

export default Page;
