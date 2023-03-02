INSERT INTO department (id, department_name)
VALUES (1,'sales'),
        (2,'human resources'),
        (3,'management'),
        (4,'software');


INSERT INTO role (id, title, salary, department_id)
VALUES (1,'software director', 100000.00, 4),
    (2,'manager', 75000.00, 3),
    (3,'human resources consultant', 75000.00, 2),
    (4,'Sales Representative', 50000.00, 1);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1,'Dominic', 'Schnepf', 1, 4),
        (2, 'John', 'Doe', 2, 3),
        (3, 'Jane', 'Doe',3, 2),
        (4, 'Michael', 'Scott',4, 1);

