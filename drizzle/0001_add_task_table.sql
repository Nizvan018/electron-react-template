CREATE TABLE `task` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`date` integer NOT NULL,
	`id_user` text NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`id_user`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
