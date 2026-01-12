import {
  uuid,
  pgTable,
  varchar,
  timestamp,
  integer,
  boolean,
  date,
} from "drizzle-orm/pg-core";

import { user } from "./auth";

export const media = pgTable("media", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar().notNull(),
  sinopse: varchar().notNull(),
  tags: varchar().array().notNull(),
  coverUrl: varchar().notNull(),
  bannerUrl: varchar().notNull(),
  isMovie: boolean().notNull(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date()),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const episode = pgTable("episode", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  mediaId: integer()
    .notNull()
    .references(() => media.id),
  name: varchar().notNull(),
  episodeNumber: varchar().notNull(),
  thumbnailUrl: varchar().notNull(),
  streamUrl: varchar().notNull(),
  subtitleUrl: varchar().notNull(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date()),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const watchProgress = pgTable("watch_progress", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: uuid()
    .notNull()
    .references(() => user.id),
  mediaId: integer()
    .notNull()
    .references(() => media.id),
  episodeId: integer()
    .notNull()
    .references(() => episode.id),
  timestamp: timestamp().notNull(),
  duration: timestamp().notNull(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date()),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const watchedEpisode = pgTable("watched_episode", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: uuid()
    .notNull()
    .references(() => user.id),
  mediaId: integer()
    .notNull()
    .references(() => media.id),
  episodeId: integer()
    .notNull()
    .references(() => episode.id),
  watchedDate: date().notNull(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date()),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
