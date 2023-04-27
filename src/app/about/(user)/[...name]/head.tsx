interface HeadProps {
  name: string;
}
const Head = ({ name }: HeadProps) => {
  return (
    <>
      <title>{name}</title>
    </>
  );
};

export default Head;
