CREATE TABLE s_roles
(
    name VARCHAR(100) PRIMARY KEY NOT NULL,
    lastUpdated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    display VARCHAR(100)
);
CREATE UNIQUE INDEX s_roles_name_uindex ON s_roles (name);

CREATE TABLE t_users
(
    id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(200),
    name VARCHAR(200),
    lastUpdated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE UNIQUE INDEX t_users_id_uindex ON t_users (id);
CREATE UNIQUE INDEX t_users_email_uindex ON t_users (email);

