CREATE DATABASE project;

CREATE TABLE student(
    id SERIAL PRIMARY KEY,
    sname TEXT,
    email TEXT,
    address TEXT,
    dob TEXT,
    phone INTEGER
);

CREATE TABLE teacher (
    id SERIAL PRIMARY KEY,
    tname TEXT,
    email TEXT,
    address TEXT,
    dob TEXT,
    phone INTEGER
);

CREATE TABLE course (
    id SERIAL PRIMARY KEY,
    cname TEXT,
    credit INTEGER,
    duration INTEGER
);

CREATE TABLE report (
    id SERIAL PRIMARY KEY,
    sid INTEGER REFERENCES student(id),
    cid INTEGER REFERENCES course(id),
    marks INTEGER,
    remark TEXT
);

-- SELECT * FROM report
-- INNER JOIN student ON student.id = report.sid
-- WHERE student.id = 3;