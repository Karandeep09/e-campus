create database if not exists campus;
use campus;

drop table if exists likes;
drop table if exists comments;
drop table if exists tags;
drop table if exists posts;
drop table if exists users;

create table users(
username varchar(50) not null,
email varchar(50) not null,
nm varchar(35) not null,
batch varchar(6),
branch varchar(40),
bio text,
contact varchar(15),
pwd varchar(255),
dp varchar(255),
primary key(username) 
);

create table posts(
post_id int not null auto_increment,
title varchar(255) not null,
content text not null,
_date datetime not null,
image varchar(255),
username varchar(50) not null,
tags varchar(255),
deleted tinyint(1) default 0,
primary key(post_id),
foreign key(username) references users(username) 
);

create table tags(
   tagname varchar(50) not null,
   post_id int not null,
   constraint pktags primary key(tagname, post_id),
   foreign key(post_id) references posts(post_id)
);

create table comments(
comment_id int auto_increment not null, 
content text not null,
username varchar(50) not null,
post_id int not null,
_date datetime not null,
primary key(comment_id),
foreign key(username) references users(username),
foreign key(post_id) references posts(post_id)
);

create table likes(
username varchar(50) not null,
post_id int not null,
constraint pk_likes primary key(username, post_id),
foreign key(username) references users(username),
foreign key(post_id) references posts(post_id)
);
