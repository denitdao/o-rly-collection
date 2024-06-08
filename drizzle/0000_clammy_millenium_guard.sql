CREATE TABLE `orly_post`
(
    `id`         integer PRIMARY KEY AUTOINCREMENT NOT NULL,
    `name`       text(256),
    `created_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
    `updatedAt`  integer
);
--> statement-breakpoint
CREATE INDEX `name_idx` ON `orly_post` (`name`);