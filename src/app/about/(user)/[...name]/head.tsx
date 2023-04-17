interface HeadProps {
  name: string;
}
const Head = ({ name }: HeadProps) => {
  console.log(name);

  return (
    <>
      <title>{name}</title>
    </>
  );
};

export default Head;
