create database team4;
use team4;

CREATE TABLE board (
    idx INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(40) NOT NULL,
    content TEXT NULL,
    nickname VARCHAR(30) NOT NULL,
    date TIMESTAMP NOT NULL,
    hit INT NOT NULL DEFAULT 0,
    likes INT NOT NULL DEFAULT 0
);

CREATE TABLE user (
    idx INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    userid VARCHAR(30) NOT NULL,
    userpw VARCHAR(50) NOT NULL,
    userimg longblob NOT NULL,
    username VARCHAR(30) NOT NULL,
    nickname VARCHAR(30) NOT NULL,
    address VARCHAR(80) NOT NULL,
    gender VARCHAR(20) NOT NULL,
    phone VARCHAR(30) NULL,
    mobile VARCHAR(30) NOT NULL,
    email VARCHAR(50) NOT NULL,
    userintro TEXT NULL,
    level INT NOT NULL DEFAULT 1,
    available VARCHAR(3) NOT NULL DEFAULT 'on',
    UNIQUE (userid),
    UNIQUE (nickname),
    UNIQUE (email)

);

CREATE TABLE comment (
    idx INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    mcategory VARCHAR(30),
    midx INT NOT NULL,
    content TEXT NOT NULL,
    userid VARCHAR(30) NOT NULL,
    nickname VARCHAR(30) NOT NULL,
    date VARCHAR(30) NOT NULL
);

create table notice(
    idx INT AUTO_INCREMENT PRIMARY KEY,
    writer VARCHAR(30) DEFAULT 'admin',
    title VARCHAR(40) NOT NULL,
    content TEXT NOT NULL,
    date VARCHAR(30) NOT NULL
);

CREATE TABLE QnA (
    idx INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(40) NOT NULL,
    content TEXT NOT NULL,
    userid VARCHAR(30) NOT NULL,
    date VARCHAR(30) NOT NULL,
    category VARCHAR(20) DEFAULT 'qna',
    hit INT NOT NULL DEFAULT 0
);

CREATE TABLE reply (
    ridx INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    comment TEXT NOT NULL,
    r_nickname VARCHAR(30) NOT NULL,
    r_date TIMESTAMP NOT NULL
);

--CREATE TABLE notice (
--    idx INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--    nickname VARCHAR(20) NOT NULL,
--    title VARCHAR(40) NOT NULL,
--    content TEXT NULL,
--    date TIMESTAMP NOT NULL,
--    hit INT NOT NULL DEFAULT 0
--);