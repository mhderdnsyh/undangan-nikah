CREATE TABLE `guests` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`slug` varchar(255) NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `guests_id` PRIMARY KEY(`id`),
	CONSTRAINT `guests_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `rsvps` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`guest_name` varchar(255) NOT NULL,
	`guest_id` int,
	`status` enum('hadir','tidak_hadir') NOT NULL,
	`total_guests` int DEFAULT 1,
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `rsvps_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `wishes` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`sender_name` varchar(255) NOT NULL,
	`message` text NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `wishes_id` PRIMARY KEY(`id`)
);
