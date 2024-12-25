CREATE DATABASE libraryDb -- \c pg_db

CREATE EXTENSION IF NOT EXISTS "uuid-ossp"; 


CREATE TABLE users( 
      id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
      username VARCHAR(250) NOT NULL, 
      email VARCHAR(100) NOT NULL UNIQUE,
      password VARCHAR(100) NOT NULL,
      role VARCHAR(10) NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin')),
      otp VARCHAR(6),
      otpExpiry TIMESTAMP
      );

ALTER TABLE users ADD COLUMN otpExpiry TIMESTAMP;

CREATE TABLE authors( 
      id SERIAL PRIMARY KEY NOT NULL,
      name VARCHAR(60) NOT NULL,
      year_of_birth INTEGER NOT NULL,
      description VARCHAR(250) NOT NULL,
      url VARCHAR(200),
      uuid UUID DEFAULT uuid_generate_v4() NOT NULL);

---DONE

INSERT INTO authors(name, year_of_birth, description, url)
VALUES
      (
            'Antoine de Saint-Exupery',
            1901,
            ' Antoine:Advanced technologies enable precise data collection, leading to accurate measurements and analysis critical for drawing meaningful conclusions from experiments. ',
            'https://antonie/photo'
      ),
      (
            'Rider Haggard',
            1902,
            ' Rider:Advanced technologies enable precise data collection, leading to accurate measurements and analysis critical for drawing meaningful conclusions from experiments. ',
            'https://rider/photo'
      ),
      (
            'Paulo Coelho',
            1903,
            ' Paulo:Advanced technologies enable precise data collection, leading to accurate measurements and analysis critical for drawing meaningful conclusions from experiments. ',
            'https://paulo/photo'
      ),
      (
            'Agatha Christie',
            1904,
            ' Agatha:Advanced technologies enable precise data collection, leading to accurate measurements and analysis critical for drawing meaningful conclusions from experiments. ',
            'https://agatha/photo'
      ),
      (
            'Mario Puzo',
            1905,
            ' Mario:Advanced technologies enable precise data collection, leading to accurate measurements and analysis critical for drawing meaningful conclusions from experiments. ',
            'https://Mario/photo'
      ),
      (
            'Gillian Flyn',
            1906,
            ' Gillian:Advanced technologies enable precise data collection, leading to accurate measurements and analysis critical for drawing meaningful conclusions from experiments. ',
            'https://Gillian/photo'
      ),
      (
            'Dan Brown',
            1907,
            ' Dan:Advanced technologies enable precise data collection, leading to accurate measurements and analysis critical for drawing meaningful conclusions from experiments. ',
            'https://Dan/photo'
      ),
      (
            'JK Rowling',
            1908,
            ' Jk:Advanced technologies enable precise data collection, leading to accurate measurements and analysis critical for drawing meaningful conclusions from experiments. ',
            'https://Rowling/photo'
      ),
      (
            'Charles Dickens',
            1909,
            ' Charles:Advanced technologies enable precise data collection, leading to accurate measurements and analysis critical for drawing meaningful conclusions from experiments. ',
            'https://Dickens/photo'
      ),
      (
            'Umberto Eco',
            1910,
            ' Umberto:Advanced technologies enable precise data collection, leading to accurate measurements and analysis critical for drawing meaningful conclusions from experiments. ',
            'https://Umberto/photo'
      );


CREATE TABLE books (
      id SERIAL PRIMARY KEY NOT NULL,
      name VARCHAR(60) NOT NULL,
      author_id INTEGER NOT NULL REFERENCES authors (id),
      description VARCHAR(250) NOT NULL,
      url VARCHAR(200),
      favorite BOOLEAN DEFAULT FALSE NOT NULL,
      recommended BOOLEAN DEFAULT FALSE NOT NULL,
      sub_category_id INTEGER REFERENCES sub_categories (id),
      uuid UUID DEFAULT uuid_generate_v4 () NOT NULL
      );


ALTER TABLE books ADD COLUMN sub_category_id INTEGER REFERENCES sub_categories(id);


UPDATE books
SET sub_category_id = 2
WHERE name = 'angels and demons';


INSERT INTO books(name, author_id, description, url)
VALUES
      (
            'wild cards I',
            1,
            'wild:Advanced technologies enable precise data collection, leading to accurate measurements and analysis critical for drawing meaningful conclusions from experiments. ',
            'https://wild/photo'
      ),
      (
            'a tale of two cities',
            1,
            ' tale:Advanced technologies enable precise data collection, leading to accurate measurements and analysis critical for drawing meaningful conclusions from experiments. ',
            'https://tale/photo'
      ),
      (
            'the little prince',
            6,
            'little:Advanced technologies enable precise data collection, leading to accurate measurements and analysis critical for drawing meaningful conclusions from experiments. ',
            'https://little/photo'
      ),
      (
            'the lord of the rings',
            2,
            ' lord:Advanced technologies enable precise data collection, leading to accurate measurements and analysis critical for drawing meaningful conclusions from experiments. ',
            'https://lord/photo'
      ),
      (
            'harry potter and the philosophers stone',
            2,
            ' potter:Advanced technologies enable precise data collection, leading to accurate measurements and analysis critical for drawing meaningful conclusions from experiments. ',
            'https://potter/photo'
      ),
      (
            'and then there were none',
            2,
            ' none:Advanced technologies enable precise data collection, leading to accurate measurements and analysis critical for drawing meaningful conclusions from experiments. ',
            'https://none/photo'
      ),
      (
            'dream of the red chamber',
            3,
            ' chamber:Advanced technologies enable precise data collection, leading to accurate measurements and analysis critical for drawing meaningful conclusions from experiments. ',
            'https://chamber/photo'
      ),
      (
            'the hobbit',
            3,
            ' hobbit:Advanced technologies enable precise data collection, leading to accurate measurements and analysis critical for drawing meaningful conclusions from experiments. ',
            'https://hobbit/photo'
      ),
      (
            'the lion, the witch and the wardrobe',
            8,
            ' wardrobe:Advanced technologies enable precise data collection, leading to accurate measurements and analysis critical for drawing meaningful conclusions from experiments. ',
            'https://wardrobe/photo'
      ),
      (
            'she: a history of adventure',
            4,
            'she:Advanced technologies enable precise data collection, leading to accurate measurements and analysis critical for drawing meaningful conclusions from experiments. ',
            'https://she/photo'
      ),
      (
            'the da vinci code',
            4,
            ' vinci:Advanced technologies enable precise data collection, leading to accurate measurements and analysis critical for drawing meaningful conclusions from experiments. ',
            'https://vinci/photo'
      ),
      (
            'harry potter and the chamber of secrets',
            4,
            'chamber of secrets:Advanced technologies enable precise data collection, leading to accurate measurements and analysis critical for drawing meaningful conclusions from experiments. ',
            'https://chamber of secrets/photo'
      ),
      (
            'the song of fire and ice',
            5,
            ' song:Advanced technologies enable precise data collection, leading to accurate measurements and analysis critical for drawing meaningful conclusions from experiments. ',
            'https://song/photo'
      ),
      (
            'the alchemist',
            5,
            ' alchemist:Advanced technologies enable precise data collection, leading to accurate measurements and analysis critical for drawing meaningful conclusions from experiments. ',
            'https://alchemist/photo'
      ),
      (
            'the godfather',
            1,
            ' godfather:Advanced technologies enable precise data collection, leading to accurate measurements and analysis critical for drawing meaningful conclusions from experiments. ',
            'https://godfather/photo'
      ),
      (
            'gone girl',
            6,
            ' girl:Advanced technologies enable precise data collection, leading to accurate measurements and analysis critical for drawing meaningful conclusions from experiments. ',
            'https://girl/photo'
      ),
      (
            'the adventures of pinnocchio',
            7,
            ' pinnocchio:Advanced technologies enable precise data collection, leading to accurate measurements and analysis critical for drawing meaningful conclusions from experiments. ',
            'https://pinnocchio/photo'
      ),
      (
            'the name of the rose',
            7,
            ' rose:Advanced technologies enable precise data collection, leading to accurate measurements and analysis critical for drawing meaningful conclusions from experiments. ',
            'https://rose/photo'
      ),
      (
            'rebecca',
            8,
            ' rebecca:Advanced technologies enable precise data collection, leading to accurate measurements and analysis critical for drawing meaningful conclusions from experiments. ',
            'https://rebecca/photo'
      ),
      (
            'flowers in the actic',
            3,
            ' actic:Advanced technologies enable precise data collection, leading to accurate measurements and analysis critical for drawing meaningful conclusions from experiments. ',
            'https://actic/photo'
      ),
      (
            'jaws',
            9,
            ' jaws:Advanced technologies enable precise data collection, leading to accurate measurements and analysis critical for drawing meaningful conclusions from experiments. ',
            'https://jaws/photo'
      ),
      (
            'animal farm',
            9,
            ' farm:Advanced technologies enable precise data collection, leading to accurate measurements and analysis critical for drawing meaningful conclusions from experiments. ',
            'https://farm/photo'
      ),
      (
            'war and peace',
            10,
            ' peace:Advanced technologies enable precise data collection, leading to accurate measurements and analysis critical for drawing meaningful conclusions from experiments. ',
            'https://peace/photo'
      ),
      (
            'angels and demons',
            10,
            ' angels:Advanced technologies enable precise data collection, leading to accurate measurements and analysis critical for drawing meaningful conclusions from experiments. ',
            'https://angels/photo'
      );

UPDATE books
SET recommended = true
WHERE name = 'animal farm';


ALTER TABLE books
DROP COLUMN sub_category_id;

CREATE TABLE ratings (
      id SERIAL PRIMARY KEY NOT NULL,
      rating INTEGER NOT NULL,
      book_id INTEGER NOT NULL REFERENCES books (id),
      CHECK (
            rating >= 1
            AND rating <= 5
      )
      );


INSERT INTO ratings(rating, book_id)
VALUES
      (4, 1),
      (3, 2),
      (5, 2),
      (5, 6),
      (4, 7),
      (5, 7),
      (4, 22),
      (4, 1),
      (3, 9),
      (5, 6),
      (5, 5),
      (4, 11),
      (5, 9),
      (4, 22),
      (4, 3),
      (3, 8),
      (5, 4),
      (5, 5),
      (4, 10),
      (5, 17),
      (4, 23),
      (4, 3),
      (3, 8),
      (5, 4),
      (5, 5),
      (4, 11),
      (5, 17),
      (4, 24),
      (4, 10),
      (5, 12),
      (4, 12),
      (4, 13),
      (3, 13),
      (5, 13),
      (5, 14),
      (4, 14),
      (5, 15),
      (4, 15),
      (4, 16),
      (3, 16),
      (5, 18),
      (5, 18),
      (4, 19),
      (5, 19),
      (4, 20),
      (4, 20),
      (3, 21),
      (5, 21),
      (5, 23),
      (4, 23),
      (5, 24),
      (4, 24);


CREATE TABLE categories (
      id SERIAL PRIMARY KEY NOT NULL,
      name VARCHAR(100) NOT NULL,
      url VARCHAR(100) NOT NULL
      );

INSERT INTO categories (name, url)
VALUES
      ('FANTASY', 'https://fantasy/photo'),
      ('HORROR', 'https://horror/photo'),
      ('MYSTERY', 'https://mystery/photo'),
      ('ROMANCE', 'https://Romance/photo'),
      ('SCIENCE FICTION','https://Science fiction/photo'),
      ('WESTERN', 'https://fantasy/photo');


CREATE TABLE sub_categories (
            id SERIAL PRIMARY KEY NOT NULL,
            name VARCHAR(100) NOT NULL,
            category_id INTEGER NOT NULL, --ADD TO TABLE
      );

ALTER TABLE sub_categories
DROP COLUMN book_id;

INSERT INTO sub_categories (name, category_id)
VALUES
      ('CHILDREN STORY', 1,),
      ('FAIRY TALE', 1),
      ('BODY HORROR', 2),
      ('EXTREME HORROR', 2),
      ('CAPER', 3),
      ('CHILD IN PERIL', 3),
      ('FANTASY ROMANCE', 4),
      ('COMEDY', 4),
      ('REAL FICTION', 5),
      ('FANTASY FICTION', 5),
      ('REAL WESTERN', 6),
      ('FAKE WESTERN', 6);

