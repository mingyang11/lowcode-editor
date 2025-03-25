import { CommonComponentProps } from '../../interface';

export default function Index({ children, styles }: CommonComponentProps) {
  return (
    <div className="p-[8px]" style={{ ...styles }}>
      {children}
    </div>
  );
}
