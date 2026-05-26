"use server";

import { checkSession } from "@/lib/utils-server";
import { redirect } from "next/navigation";
import { profileSchema } from "./schema";
import { prisma } from "@/lib/prisma";

export async function editProfileAction(data: {
  name: string;
}): Promise<{ success: false; error: string } | { success: true }> {
  const session = await checkSession();
  if (!session.success) redirect("/auth/signin");

  const parsed = profileSchema.safeParse(data);

  if (!parsed.success) return { success: false, error: "Invalid form data" };

  const { name } = parsed.data;

  await prisma.user.update({
    where: { id: session.data.user.id },
    data: {
      name
    }
  });

  return { success: true };
}
