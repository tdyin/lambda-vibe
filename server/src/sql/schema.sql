CREATE TABLE songs (
	id int NOT NULL PRIMARY KEY,
	song_title text NOT NULL,
	album text NOT NULL,
	artist text NOT NULL,
	genre text NOT NULL,
	notes varchar NOT NULL
);

INSERT INTO
	songs (id, song_title, album, artist, genre, notes)
VALUES
	(
		1,
		'Ode to Joy (Dubstep Remix)',
		'Symphony No. 9',
		'Beethoven',
		'Classical',
		'E4 E4 F4 G4 G4 F4 E4 D4 C4 C4 D4 E4 E4 D4 D4'
	);

INSERT INTO
	songs (id, song_title, album, artist, genre, notes)
VALUES
	(
		2,
		'Fur Elise',
		'Bagatelle No. 25',
		'Beethoven',
		'Classical',
		'E5 Eb5 E5 Eb5 E5 B4 D5 C5 A4'
	);

INSERT INTO
	songs (id, song_title, album, artist, genre, notes)
VALUES
	(
		3,
		'Billie Jean',
		'Thriller',
		'Michael Jackson',
		'Pop',
		'F#3 C#3 E3 F#3 E3 C#3 B2 C#3 F#3 C#3 E3 F#3 E3 C#3 B2 C#3'
	);

INSERT INTO
	songs (id, song_title, album, artist, genre, notes)
VALUES
	(
		4,
		'Super Mario',
		'Super Mario Music',
		'Koji Kondo',
		'Game',
		'C5 G4 E4 A4 B4 Bb4 A4 G4 E5 G5 A5 F5 G5 E5 C5 D5 B4'
	);

INSERT INTO
	songs (id, song_title, album, artist, genre, notes)
VALUES
	(
		5,
		'Final Fantasy - Prelude',
		'Final Fantasy Music',
		'Nobuo Uematsu',
		'Game',
		'C2 D2 F2 Bb2 C3 D3 F3 Bb3 C4 D4 F4 Bb4 C5 D5 F5 Bb5 F5 D5 C5 Bb4 F4 D4 C4 Bb3 F3 D3 C2 Bb2 F2 D2 C2'
	);