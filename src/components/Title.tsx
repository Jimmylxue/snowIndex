import { CSSProperties, FC } from 'react';

type Props = {
  type: 'large' | 'small';
  title: string;
};

const largeStyle: CSSProperties = {
  fontSize: '2rem',
  color: 'red',
};

const smallStyle: CSSProperties = {
  fontSize: '0.5rem',
  color: 'green',
};

const styleMapper: Record<'small' | 'large', CSSProperties> = {
  small: smallStyle,
  large: largeStyle,
};

const Title: FC<Props> = (props) => {
  const { type, title } = props;
  return <p style={styleMapper[type]}>{title}</p>;
};

export default Title;
