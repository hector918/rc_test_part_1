\c rc_test;

INSERT INTO
    users (name, email)
VALUES
    ('Alice Johnson', 'alice@example.com'),
    ('Bob Williams', 'bob@example.com'),
    ('Charlie Brown', 'charlie@example.com'),
    ('Dana White', 'dana@example.com'),
    ('Eva Green', 'eva@example.com'),
    ('Frank Miller', 'frank@example.com'),
    ('Grace Lee', 'grace@example.com'),
    ('Hannah Scott', 'hannah@example.com'),
    ('Ian Thompson', 'ian@example.com'),
    ('Jane Smith', 'jane@example.com'),
    ('Kevin Turner', 'kevin@example.com'),
    ('Laura Adams', 'laura@example.com'),
    ('Mike Wilson', 'mike@example.com'),
    ('Nina Patel', 'nina@example.com'),
    ('Oliver Harris', 'oliver@example.com'),
    ('Paula Clark', 'paula@example.com'),
    ('Quincy Lewis', 'quincy@example.com'),
    ('Rachel Martin', 'rachel@example.com'),
    ('Steve King', 'steve@example.com'),
    ('Tina Adams', 'tina@example.com'),
    ('Ursula Carter', 'ursula@example.com');

INSERT INTO
    movies (title, user_id, release_date)
VALUES
    ('The Matrix', 1, '1999-03-31'),
    ('The Godfather', 3, '1972-03-24'),
    ('The Dark Knight', 2, '2008-07-18'),
    ('Pulp Fiction', 4, '1994-10-14'),
    ('Inception', 3, '2010-07-16'),
    ('Avatar', 2, '2009-12-18'),
    ('Titanic', 1, '1997-12-19');