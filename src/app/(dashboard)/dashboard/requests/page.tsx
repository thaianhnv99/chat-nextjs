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
    `user: ${session.user.id}:incoming_friend_requests`
  )) as User[];

  const incommingFriendRequests = await Promise.all(
    incommingSenderIds.map(async (senderId) => {
      const sender = (await fetchRedis("get", `user:${senderId}`)) as User;
      return {
        senderId,
        senderEmail: sender.email,
      };
    })
  );
  return <></>;
};

export default Page;
