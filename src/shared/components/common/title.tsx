interface Props {
  title: string;
}

function Title({ title }: Props) {
  return <p className="text-toss-xl font-bold text-foreground-toss">{title}</p>;
}

export default Title;
