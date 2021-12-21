const queries = ["CREATE TABLE IF NOT EXISTS `topics` (`id` int(11) NOT NULL auto_increment,`topic` varchar(250)  NOT NULL default '',PRIMARY KEY  (`id`))",
"CREATE TABLE IF NOT EXISTS `subscribers` (`id` int(11) NOT NULL auto_increment, `topic_id` int(11) NOT NULL, `url` varchar(250)  NOT NULL, PRIMARY KEY  (`id`), CONSTRAINT fk_topic FOREIGN KEY (topic_id) REFERENCES topics(id))"];

module.exports = queries;