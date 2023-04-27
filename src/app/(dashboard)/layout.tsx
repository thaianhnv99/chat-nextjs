import { authOption } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import LayoutWrapper from "./LayoutWrapper";
import { fetchRedis } from "@/lib/helpers/redis";
import { getFriendsByUserId } from "@/lib/helpers/get-friend-by-user";

interface LayoutProps {
  children: React.ReactNode;
}
const Layout = async ({ children }: LayoutProps) => {
  const session = await getServerSession(authOption);
  if (!session) {
    notFound();
  }

  const friends = await getFriendsByUserId(session.user.id);
  
  const unseenRequestCount = (
    (await fetchRedis(
      "smembers",
      `user:${session.user.id}:incoming_friend_requests`
    )) as User[]
  ).length;

  return (
    <LayoutWrapper
      session={session}
      initialUnseenRequestCount={unseenRequestCount}
      friends={friends}
    >
      {children}
    </LayoutWrapper>
  );
};

export default Layout;
