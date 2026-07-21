ALTER TABLE `links_shortener` MODIFY COLUMN `url` varchar(250) NOT NULL;--> statement-breakpoint
ALTER TABLE `links_shortener` ADD `created_at` timestamp DEFAULT (now()) NOT NULL;--> statement-breakpoint
ALTER TABLE `links_shortener` ADD `updated_at` timestamp DEFAULT (now()) NOT NULL ON UPDATE CURRENT_TIMESTAMP;--> statement-breakpoint
ALTER TABLE `links_shortener` ADD `user_id` int NOT NULL;--> statement-breakpoint
ALTER TABLE `links_shortener` ADD CONSTRAINT `links_shortener_user_id_users_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`);