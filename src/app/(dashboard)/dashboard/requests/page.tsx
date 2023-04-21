import FriendRequests from "@/components/FriendRequests";
import { authOption } from "@/lib/auth";
import { fetchRedis } from "@/lib/helpers/redis";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

const Page = async () => {
  const session = await getServerSession(authOption);
  if (!session) notFound();

  // ids of people who current logged in user a friend requests
  const incommingSenderIds = (await fetchRedis(
    "smembers",
    `user:${session.user.id}:incoming_friend_requests`
  )) as string[];

  const incommingSenders = incommingSenderIds.map(async (senderId) => {
    const sender = await fetchRedis("get", `user:${senderId}`).then((res) => {
      return JSON.parse(res);
    });

    return {
      senderId,
      senderEmail: sender?.email,
    };
  });

  const incommingFriendRequests = (await Promise.all(
    incommingSenders
  )) as IncomingFriendRequest[];

  return (
    <FriendRequests
      incomingFriendRequests={incommingFriendRequests}
      sessionId={session.user.id}
    />
  );
};

export default Page;
