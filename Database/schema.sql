-- Creating tables for 2019
CREATE TABLE dc2019 (
	order_id VARCHAR(9) NOT NULL,
	girl VARCHAR NOT NULL,
	su_id VARCHAR NOT NULL,
	order_date VARCHAR, 
	order_time VARCHAR,
	order_type VARCHAR,
	bill_zip VARCHAR,
	dosidos INT,
	samoas INT,
	savannahs INT,
	smores INT,
	tagalongs INT,
	thinmints INT,
	toffeetastic INT,
	trefoils INT,
	total_pkgs INT,
	donation INT,
    PRIMARY KEY (order_id)
);

-- ACTION: import 2019 csv file
-- check count of 2019 to ensure 22973 records
SELECT * FROM dc2019

-- Creating tables for 2020
CREATE TABLE dc2020 (
	order_id VARCHAR(9) NOT NULL,
	girl VARCHAR NOT NULL,
	su_id VARCHAR NOT NULL,
	order_date VARCHAR, 
	order_time VARCHAR,
	order_type VARCHAR,
	bill_zip VARCHAR,
	lemonups INT,
	trefoils INT,
	dosidos INT,
	samoas INT,
	tagalongs INT,
	thinmints INT,
	smores INT,
	toffeetastic INT,
	donation INT,
	total_pkgs INT,
    PRIMARY KEY (order_id)
);

-- ACTION: import 2020 csv file
-- check count of 2020 to ensure 30709 records
SELECT * FROM dc2020

-- Creating tables for 2021
CREATE TABLE dc2021 (
	order_id VARCHAR(9) NOT NULL,
	girl VARCHAR NOT NULL,
	su_id VARCHAR NOT NULL,
	order_date VARCHAR, 
	order_time VARCHAR,
	order_type VARCHAR,
	bill_zip VARCHAR,
	lemonups INT,
	trefoils INT,
	dosidos INT,
	samoas INT,
	tagalongs INT,
	thinmints INT,
	smores INT,
	toffeetastic INT,
	donation INT,
	total_pkgs INT,
    PRIMARY KEY (order_id)
);

-- ACTION: import 2021 csv file
-- check count of 2021 to ensure 65590 records
SELECT * FROM dc2021

-- Creating tables for 2022
CREATE TABLE dc2022 (
	order_id VARCHAR(9) NOT NULL,
	girl VARCHAR NOT NULL,
	su_id VARCHAR NOT NULL,
	order_date VARCHAR, 
	order_time VARCHAR,
	order_type VARCHAR,
	bill_zip VARCHAR,
	adventurefuls INT,
	lemonups INT,
	trefoils INT,
	dosidos INT,
	samoas INT,
	tagalongs INT,
	thinmints INT,
	smores INT,
	toffeetastic INT,
	donation INT,
	total_pkgs INT,
    PRIMARY KEY (order_id)
);

-- ACTION: import 2022 csv file
-- check count of 2022 to ensure 66739 records
SELECT * FROM dc2022

-- Add year 2019 as "season" to new column in 2019 table
ALTER TABLE dc2019
ADD season VARCHAR(4)
DEFAULT '2019';

-- Add year 2020 as "season" to new column in 2019 table
ALTER TABLE dc2020
ADD season VARCHAR(4)
DEFAULT '2020';

-- Add year 2021 as "season" to new column in 2019 table
ALTER TABLE dc2021
ADD season VARCHAR(4)
DEFAULT '2021';

-- Add year 2022 as "season" to new column in 2019 table
ALTER TABLE dc2022
ADD season VARCHAR(4)
DEFAULT '2022';

-- confirm all tables have the new year column
SELECT * FROM dc2019
SELECT * FROM dc2020
SELECT * FROM dc2021
SELECT * FROM dc2022

-- adjust tables to all have same columns for union

-- Savannahs were not sold 2020-2022; 0 qty sold added 
ALTER TABLE dc2020
ADD savannahs INT
DEFAULT '0';

ALTER TABLE dc2021
ADD savannahs INT
DEFAULT '0';

ALTER TABLE dc2022
ADD savannahs INT
DEFAULT '0';

-- Lemonups not sold 2019; 0 qty sold added
ALTER TABLE dc2019
ADD lemonups INT
DEFAULT '0';

-- Adventurefuls were not sold 2019-2021; 0 qty sold added 
ALTER TABLE dc2019
ADD adventurefuls INT
DEFAULT '0';

ALTER TABLE dc2020
ADD adventurefuls INT
DEFAULT '0';

ALTER TABLE dc2021
ADD adventurefuls INT
DEFAULT '0';

-- create union
SELECT * INTO cookiedata FROM (
    SELECT order_id, season, girl, su_id, order_type, order_date, order_time, bill_zip, adventurefuls, dosidos, lemonups, samoas, savannahs, smores, tagalongs, thinmints, toffeetastic, trefoils, donation, total_pkgs
	FROM dc2019
    UNION
    SELECT order_id, season, girl, su_id, order_type, order_date, order_time, bill_zip, adventurefuls, dosidos, lemonups, samoas, savannahs, smores, tagalongs, thinmints, toffeetastic, trefoils, donation, total_pkgs
	FROM dc2020
    UNION
    SELECT order_id, season, girl, su_id, order_type, order_date, order_time, bill_zip, adventurefuls, dosidos, lemonups, samoas, savannahs, smores, tagalongs, thinmints, toffeetastic, trefoils, donation, total_pkgs 
	FROM dc2021
    UNION
    SELECT order_id, season, girl, su_id, order_type, order_date, order_time, bill_zip, adventurefuls, dosidos, lemonups, samoas, savannahs, smores, tagalongs, thinmints, toffeetastic, trefoils, donation, total_pkgs 
	FROM dc2022
) a

-- confirm all 186011 rows combined with all columns 
SELECT * FROM cookiedata

-- remove total packages column due to mixed meaning among provided raw data
ALTER TABLE cookiedata
DROP COLUMN total_pkgs
;

SELECT * FROM cookiedata

-- remove 4 digit extension from zip codes
UPDATE cookiedata
   SET bill_zip = LEFT(bill_zip,5)

-- left pad the northeastern zip codes for 5 digits with leading zeros
UPDATE cookiedata
   SET bill_zip = LPAD(bill_zip, 5, '0')
   WHERE LENGTH(bill_zip) < 5

SELECT * FROM cookiedata

-- Create table for service unit ids
CREATE TABLE serviceunit_ids (
	su_id VARCHAR NOT NULL,
	su_name VARCHAR, 
    PRIMARY KEY (su_id)
);
-- import service unit id csv
SELECT * FROM serviceunit_ids

-- Create table for service unit zip codes
CREATE TABLE serviceunit_zips (
	zipcode VARCHAR NOT NULL,
	city VARCHAR,
	county VARCHAR,
	su_name VARCHAR,
    PRIMARY KEY (zipcode)
);

-- import service unit zip code csv
SELECT * FROM serviceunit_zips

-- join service unit zip code and id tables
SELECT serviceunit_zips.*, serviceunit_ids.su_id INTO serviceunits FROM serviceunit_zips
LEFT OUTER JOIN serviceunit_ids
ON serviceunit_zips.su_name = serviceunit_ids.su_name
;

SELECT * FROM serviceunits

-- MECK 1 vs Meck 1 failure - deleting new table, replace MECK with Meck and recreate table
DROP TABLE serviceunits;

UPDATE serviceunit_ids
SET su_name = REPLACE(su_name, 'MECK 1', 'Meck 1')
;
SELECT * FROM serviceunit_ids

SELECT serviceunit_zips.*, serviceunit_ids.su_id INTO serviceunits FROM serviceunit_zips
LEFT OUTER JOIN serviceunit_ids
ON serviceunit_zips.su_name = serviceunit_ids.su_name
;

SELECT * FROM serviceunits

-- Create table for median incomes
CREATE TABLE median_incomes (
	county VARCHAR NOT NULL,
	zipcode VARCHAR,
	median_income VARCHAR,
    PRIMARY KEY (zipcode)
);

SELECT * FROM median_incomes




