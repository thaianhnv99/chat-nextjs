import { authOption } from "@/lib/auth";
import { db } from "@/lib/db";
import { fetchRedis } from "@/lib/helpers/redis";
import { getServerSession } from "next-auth";
import { ZodError, z } from "zod";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const { id: idToAdd } = z.object({ id: z.string() }).parse(body);

    const session = await getServerSession(authOption);

    if (!session) {
      return new Response("Unauthorzed", { status: 401 });
    }

    //Verfy both users are not already friends
    const isAlreadyFriends = await fetchRedis(
      "sismember",
      `user:${session.user.id}:friends`,
      idToAdd
    );

    console.log("req 1", isAlreadyFriends);

    if (isAlreadyFriends) {
      return new Response("Already friends", { status: 400 });
    }

    const hasFriendRequest = await fetchRedis(
      "sismember",
      `user:${session.user.id}:incoming_friend_requests`,
      idToAdd
    );

    if (!hasFriendRequest) {
      return new Response("No friend request", { status: 400 });
    }

    await db.sadd(`user:${session.user.id}:friends`, idToAdd);

    await db.sadd(`user:${idToAdd}:friends`, session.user.id);

    // await db.srem(`user:${idToAdd}:outBound_friend_requests`, session.user.id);

    await db.srem(`user:${session.user.id}:incoming_friend_requests`, idToAdd);

    return new Response("OK");
  } catch (error) {
    if (error instanceof ZodError) {
      return new Response("Invalid request payload", { status: 422 });
    }

    return new Response("Invalid request", { status: 400 });
  }
};
