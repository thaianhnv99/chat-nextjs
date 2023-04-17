import Head from "./head";

interface PageProps {
  params: { name: string[] };
}
const Page = ({ params }: PageProps) => {
  return (
    <>
      <Head name={params?.name[0]} />
      Show name:
    </>
  );
};

export default Page;
