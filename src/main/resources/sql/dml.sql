INSERT INTO ci_cynic.s_roles (id, name, display, lastUpdated)
VALUES (1, ''ADMINISTRATOR'', ''Administrator'', ''2017-04-25 21:35:44''),
  (2, ''SUPER_USER'', ''Super User'', ''2017-04-25 21:35:44'');

INSERT INTO ci_cynic.t_users (email, password, name, lastUpdated, role_id)
VALUES (''ali_jalbani@symantec.com'', '''', ''Ali Jalbani'', ''2017-04-25 21:35:45'', 1);