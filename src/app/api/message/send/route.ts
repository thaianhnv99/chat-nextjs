import { authOption } from "@/lib/auth";
import { db } from "@/lib/db";
import { fetchRedis } from "@/lib/helpers/redis";
import { messageValidator } from "@/lib/validations/message";
import { nanoid } from "nanoid";
import { getServerSession } from "next-auth";

export const POST = async (req: Request) => {
  try {
    const { text, chatId } = await req.json();

    console.log(chatId);

    const session = await getServerSession(authOption);

    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    const [user1, user2] = chatId.split("--");

    if (session.user.id !== user1 && session.user.id !== user2) {
      return new Response("Unauthorized", { status: 401 });
    }

    const friendId = session.user.id === user1 ? user2 : user1;

    const friendList = (await fetchRedis(
      "smembers",
      `user:${session.user.id}:friends`
    )) as string[];

    const isFriend = friendList.includes(friendId);

    if (!isFriend) {
      return new Response("Unauthorized", { status: 401 });
    }

    const sender = (await fetchRedis("get", `user:${session.user.id}`).then(
      (user) => JSON.parse(user)
    )) as User;
    const timestamp = Date.now();

    console.log(sender);

    const messageData: Message = {
      id: nanoid(),
      senderId: session.user.id,
      text,
      timestamp,
    };

    const message = messageValidator.parse(messageData);

    // All valid, send the message
    await db.zadd(`chat:${chatId}:messages`, {
      score: timestamp,
      member: JSON.stringify(message),
    });

    return new Response("OK");
  } catch (error) {
    if (error instanceof Error) {
      return new Response(error.message);
    }

    return new Response("Internal Server Error", { status: 500 });
  }
};
