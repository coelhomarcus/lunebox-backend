import { db } from "@/database/db";
import * as schema from "@/database/schema";
// import { eq } from "drizzle-orm";

export const getAllUsers = () => {
  const users = db.select().from(schema.user);

  return users;
};
