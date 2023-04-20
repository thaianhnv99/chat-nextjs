import { authOption } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import LayoutWrapper from "./LayoutWrapper";
import { fetchRedis } from "@/lib/helpers/redis";

interface LayoutProps {
  children: React.ReactNode;
}
const Layout = async ({ children }: LayoutProps) => {
  const session = await getServerSession(authOption);
  if (!session) notFound();

  const unseenRequestCount = (
    (await fetchRedis(
      "smembers",
      `user:${session.user.id}:incoming_friend_requests`
    )) as User[]
  ).length;  

  return (
    <LayoutWrapper session={session} unseenRequestCount={unseenRequestCount}>
      {children}
    </LayoutWrapper>
  );
};

export default Layout;
