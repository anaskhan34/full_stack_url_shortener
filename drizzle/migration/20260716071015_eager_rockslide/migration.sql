CREATE TABLE `links_shortener` (
	`id` int AUTO_INCREMENT PRIMARY KEY,
	`short_code` varchar(20) NOT NULL,
	`url` varchar(200) NOT NULL,
	CONSTRAINT `short_code_unique` UNIQUE INDEX(`short_code`)
);
