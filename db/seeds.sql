-- department seeds
INSERT INTO department (name)
VALUES ('Architecture'),
       ('Business Analysis'),
       ('Database'),
       ('Developers'),
       ('Network qAdministration'),
       ('Security');

-- role seeds
INSERT INTO role (title, salary, department_id)
VALUES ('Cloud Infrastructure Architect', '100000', 1),
       ('Solutions Architect', '75000', 1),
       ('Systems Analyst', '70000', 5),
       ('Network Engineer', '80000', 5),
       ('Database Administrator', '85000', 3),
       ('Database Analyst', '90000', 3),
       ('Business System Analyst', '95000', 2),
       ('Intelligence Specialist', '50000', 2),
       ('Back-end Developer', '65000', 4),
       ('DevOps Engineer', '100000', 4),
       ('Cryptographer', '105000', 6),
       ('Cybersecurity Specialist', '115000', 6);

-- employee seeds
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('April', 'May', 1, null),
       ('Katrina', 'Jones', 1, 1),
       ('Laura', 'Dern', 2, null),
       ('Abe', 'Paco', 2, 2),
       ('Carson', 'Ryan', 3, null),
       ('Ru', 'Paul', 3, 3),
       ('Michelle', 'Visage', 4, null),
       ('Jupiter', 'Musk', 4, 4),
       ('Jimbo', 'Kyle', 5, null),
       ('Kandy', 'Muse', 5, 5),
       ('Toni', 'Braxton', 6, null),
       ('Peter', 'Planet', 6, 6);
