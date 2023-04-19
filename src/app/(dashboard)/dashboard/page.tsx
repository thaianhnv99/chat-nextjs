import { authOption } from "@/lib/auth";
import { getServerSession } from "next-auth";

interface PageProps {}
const Page = async ({}: PageProps) => {
  const session = await getServerSession(authOption);
  return <pre>{JSON.stringify(session)}</pre>;
};

export default Page;
