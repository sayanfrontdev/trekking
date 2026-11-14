CREATE TABLE IF NOT EXISTS community_travel_photo_chunks (
  photo_id TEXT NOT NULL REFERENCES community_travel_photos(id) ON DELETE CASCADE,
  chunk_index INTEGER NOT NULL,
  data BLOB NOT NULL CHECK (length(data) <= 900000),
  PRIMARY KEY (photo_id, chunk_index)
);

INSERT INTO community_travel_photo_chunks (photo_id, chunk_index, data)
SELECT id, 0, substr(data, 1, 900000)
FROM community_travel_photos
WHERE length(data) > 0;

INSERT INTO community_travel_photo_chunks (photo_id, chunk_index, data)
SELECT id, 1, substr(data, 900001)
FROM community_travel_photos
WHERE length(data) > 900000;

UPDATE community_travel_photos SET data = X'' WHERE length(data) > 0;
