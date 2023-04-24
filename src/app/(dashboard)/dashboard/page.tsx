import { authOption } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

interface PageProps {}
const Page = async ({}: PageProps) => {
  const session = await getServerSession(authOption);
  if (!session) notFound();
  return <pre>{JSON.stringify(session)}</pre>;
};

export default Page;
