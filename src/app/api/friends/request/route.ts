import { authOption } from "@/lib/auth";
import { fetchRedis } from "@/lib/helpers/redis";
import { getServerSession } from "next-auth";

export const GET = async () => {
  try {
    const session = await getServerSession(authOption);

    if (!session) {
      return new Response("Unauthorzed", { status: 401 });
    }

    const friendRequest = (await fetchRedis(
      "smembers",
      `user:${session.user.id}:incoming_friend_requests`
    )) as User[];

    return new Response(JSON.stringify(friendRequest), { status: 200 });
  } catch (error) {}
};
