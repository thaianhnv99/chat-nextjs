import { authOption } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { ZodError, z } from "zod";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const { id: idToAdd } = z.object({ id: z.string() }).parse(body);

    const session = await getServerSession(authOption);
    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    await db.srem(`user:${session.user.id}:incoming_friend_requests`, idToAdd);

    return new Response("OK");
  } catch (error) {
    if (error instanceof ZodError) {
      return new Response("Invalid request payload", { status: 422 });
    }

    return new Response("Invalid request", { status: 400 });
  }
};
