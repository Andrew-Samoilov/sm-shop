COPY brands(id, name, logo, description, website, country, created_at, updated_at)
FROM 'C:\sag\brands-in-db.csv'
DELIMITER ','
CSV HEADER;