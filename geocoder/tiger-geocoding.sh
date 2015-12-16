#!/usr/bin/env bash

TMPDIR="/gisdata/temp/"
UNZIPTOOL=unzip
WGETTOOL="/usr/bin/wget"
export PGBIN=/usr/bin
export PGPORT=5432
export PGHOST=localhost
export PGUSER=geocoder
export PGPASSWORD=tiger
export PGDATABASE=geocoder
PSQL=${PGBIN}/psql
SHP2PGSQL=${PGBIN}/shp2pgsql
cd /gisdata

cd /gisdata
wget ftp://ftp2.census.gov/geo/tiger/TIGER2013/PLACE/tl_*_39_* --no-parent --relative --recursive --level=2 --accept=zip --mirror --reject=html
cd /gisdata/ftp2.census.gov/geo/tiger/TIGER2013/PLACE
rm -f ${TMPDIR}/*.*
${PSQL} -c "DROP SCHEMA IF EXISTS tiger_staging CASCADE;"
${PSQL} -c "CREATE SCHEMA tiger_staging;"
for z in tl_*_39*_place.zip ; do $UNZIPTOOL -o -d $TMPDIR $z; done
for z in */tl_*_39*_place.zip ; do $UNZIPTOOL -o -d $TMPDIR $z; done
cd $TMPDIR;

${PSQL} -c "CREATE TABLE tiger_data.OH_place(CONSTRAINT pk_OH_place PRIMARY KEY (plcidfp) ) INHERITS(place);"
${SHP2PGSQL} -c -s 4269 -g the_geom   -W "latin1" tl_2013_39_place.dbf tiger_staging.oh_place | ${PSQL}
${PSQL} -c "ALTER TABLE tiger_staging.OH_place RENAME geoid TO plcidfp;SELECT loader_load_staged_data(lower('OH_place'), lower('OH_place')); ALTER TABLE tiger_data.OH_place ADD CONSTRAINT uidx_OH_place_gid UNIQUE (gid);"
${PSQL} -c "CREATE INDEX idx_OH_place_soundex_name ON tiger_data.OH_place USING btree (soundex(name));"
${PSQL} -c "CREATE INDEX tiger_data_OH_place_the_geom_gist ON tiger_data.OH_place USING gist(the_geom);"
${PSQL} -c "ALTER TABLE tiger_data.OH_place ADD CONSTRAINT chk_statefp CHECK (statefp = '39');"
cd /gisdata
wget ftp://ftp2.census.gov/geo/tiger/TIGER2013/COUSUB/tl_*_39_* --no-parent --relative --recursive --level=2 --accept=zip --mirror --reject=html
cd /gisdata/ftp2.census.gov/geo/tiger/TIGER2013/COUSUB
rm -f ${TMPDIR}/*.*
${PSQL} -c "DROP SCHEMA IF EXISTS tiger_staging CASCADE;"
${PSQL} -c "CREATE SCHEMA tiger_staging;"
for z in tl_*_39*_cousub.zip ; do $UNZIPTOOL -o -d $TMPDIR $z; done
for z in */tl_*_39*_cousub.zip ; do $UNZIPTOOL -o -d $TMPDIR $z; done
cd $TMPDIR;

${PSQL} -c "CREATE TABLE tiger_data.OH_cousub(CONSTRAINT pk_OH_cousub PRIMARY KEY (cosbidfp), CONSTRAINT uidx_OH_cousub_gid UNIQUE (gid)) INHERITS(cousub);"
${SHP2PGSQL} -c -s 4269 -g the_geom   -W "latin1" tl_2013_39_cousub.dbf tiger_staging.oh_cousub | ${PSQL}
${PSQL} -c "ALTER TABLE tiger_staging.OH_cousub RENAME geoid TO cosbidfp;SELECT loader_load_staged_data(lower('OH_cousub'), lower('OH_cousub')); ALTER TABLE tiger_data.OH_cousub ADD CONSTRAINT chk_statefp CHECK (statefp = '39');"
${PSQL} -c "CREATE INDEX tiger_data_OH_cousub_the_geom_gist ON tiger_data.OH_cousub USING gist(the_geom);"
${PSQL} -c "CREATE INDEX idx_tiger_data_OH_cousub_countyfp ON tiger_data.OH_cousub USING btree(countyfp);"
cd /gisdata
wget ftp://ftp2.census.gov/geo/tiger/TIGER2013/TRACT/tl_*_39_* --no-parent --relative --recursive --level=2 --accept=zip --mirror --reject=html
cd /gisdata/ftp2.census.gov/geo/tiger/TIGER2013/TRACT
rm -f ${TMPDIR}/*.*
${PSQL} -c "DROP SCHEMA IF EXISTS tiger_staging CASCADE;"
${PSQL} -c "CREATE SCHEMA tiger_staging;"
for z in tl_*_39*_tract.zip ; do $UNZIPTOOL -o -d $TMPDIR $z; done
for z in */tl_*_39*_tract.zip ; do $UNZIPTOOL -o -d $TMPDIR $z; done
cd $TMPDIR;

${PSQL} -c "CREATE TABLE tiger_data.OH_tract(CONSTRAINT pk_OH_tract PRIMARY KEY (tract_id) ) INHERITS(tiger.tract); "
${SHP2PGSQL} -c -s 4269 -g the_geom   -W "latin1" tl_2013_39_tract.dbf tiger_staging.oh_tract | ${PSQL}
${PSQL} -c "ALTER TABLE tiger_staging.OH_tract RENAME geoid TO tract_id;  SELECT loader_load_staged_data(lower('OH_tract'), lower('OH_tract')); "
	${PSQL} -c "CREATE INDEX tiger_data_OH_tract_the_geom_gist ON tiger_data.OH_tract USING gist(the_geom);"
	${PSQL} -c "VACUUM ANALYZE tiger_data.OH_tract;"
	${PSQL} -c "ALTER TABLE tiger_data.OH_tract ADD CONSTRAINT chk_statefp CHECK (statefp = '39');"
cd /gisdata
wget ftp://ftp2.census.gov/geo/tiger/TIGER2013/TABBLOCK/tl_*_39_* --no-parent --relative --recursive --level=2 --accept=zip --mirror --reject=html
cd /gisdata/ftp2.census.gov/geo/tiger/TIGER2013/TABBLOCK
rm -f ${TMPDIR}/*.*
${PSQL} -c "DROP SCHEMA IF EXISTS tiger_staging CASCADE;"
${PSQL} -c "CREATE SCHEMA tiger_staging;"
for z in tl_*_39*_tabblock.zip ; do $UNZIPTOOL -o -d $TMPDIR $z; done
for z in */tl_*_39*_tabblock.zip ; do $UNZIPTOOL -o -d $TMPDIR $z; done
cd $TMPDIR;

${PSQL} -c "CREATE TABLE tiger_data.OH_tabblock(CONSTRAINT pk_OH_tabblock PRIMARY KEY (tabblock_id)) INHERITS(tiger.tabblock);"
${SHP2PGSQL} -c -s 4269 -g the_geom   -W "latin1" tl_2013_39_tabblock.dbf tiger_staging.oh_tabblock | ${PSQL}
${PSQL} -c "ALTER TABLE tiger_staging.OH_tabblock RENAME geoid TO tabblock_id;  SELECT loader_load_staged_data(lower('OH_tabblock'), lower('OH_tabblock'), '{gid, statefp10, countyfp10, tractce10, blockce10,suffix1ce,blockce,tractce}'::text[]); "
${PSQL} -c "ALTER TABLE tiger_data.OH_tabblock ADD CONSTRAINT chk_statefp CHECK (statefp = '39');"
${PSQL} -c "CREATE INDEX tiger_data_OH_tabblock_the_geom_gist ON tiger_data.OH_tabblock USING gist(the_geom);"
${PSQL} -c "vacuum analyze tiger_data.OH_tabblock;"
cd /gisdata
wget ftp://ftp2.census.gov/geo/tiger/TIGER2013/BG/tl_*_39_* --no-parent --relative --recursive --level=2 --accept=zip --mirror --reject=html
cd /gisdata/ftp2.census.gov/geo/tiger/TIGER2013/BG
rm -f ${TMPDIR}/*.*
${PSQL} -c "DROP SCHEMA IF EXISTS tiger_staging CASCADE;"
${PSQL} -c "CREATE SCHEMA tiger_staging;"
for z in tl_*_39*_bg.zip ; do $UNZIPTOOL -o -d $TMPDIR $z; done
for z in */tl_*_39*_bg.zip ; do $UNZIPTOOL -o -d $TMPDIR $z; done
cd $TMPDIR;

${PSQL} -c "CREATE TABLE tiger_data.OH_bg(CONSTRAINT pk_OH_bg PRIMARY KEY (bg_id)) INHERITS(tiger.bg);"
${SHP2PGSQL} -c -s 4269 -g the_geom   -W "latin1" tl_2013_39_bg.dbf tiger_staging.oh_bg | ${PSQL}
${PSQL} -c "ALTER TABLE tiger_staging.OH_bg RENAME geoid TO bg_id;  SELECT loader_load_staged_data(lower('OH_bg'), lower('OH_bg')); "
${PSQL} -c "ALTER TABLE tiger_data.OH_bg ADD CONSTRAINT chk_statefp CHECK (statefp = '39');"
${PSQL} -c "CREATE INDEX tiger_data_OH_bg_the_geom_gist ON tiger_data.OH_bg USING gist(the_geom);"
${PSQL} -c "vacuum analyze tiger_data.OH_bg;"
cd /gisdata
wget ftp://ftp2.census.gov/geo/tiger/TIGER2010/ZCTA5/2010/*_39* --no-parent --relative --recursive --level=2 --accept=zip --mirror --reject=html
cd /gisdata/ftp2.census.gov/geo/tiger/TIGER2010/ZCTA5/2010
rm -f ${TMPDIR}/*.*
${PSQL} -c "DROP SCHEMA IF EXISTS tiger_staging CASCADE;"
${PSQL} -c "CREATE SCHEMA tiger_staging;"
for z in tl_*_39*_zcta510.zip ; do $UNZIPTOOL -o -d $TMPDIR $z; done
for z in */tl_*_39*_zcta510.zip ; do $UNZIPTOOL -o -d $TMPDIR $z; done
cd $TMPDIR;

${PSQL} -c "CREATE TABLE tiger_data.OH_zcta5(CONSTRAINT pk_OH_zcta5 PRIMARY KEY (zcta5ce,statefp), CONSTRAINT uidx_OH_zcta5_gid UNIQUE (gid)) INHERITS(zcta5);"
for z in *zcta510.dbf; do
${SHP2PGSQL}  -D -s 4269 -g the_geom -W "latin1" $z tiger_staging.OH_zcta510 | ${PSQL}
${PSQL} -c "SELECT loader_load_staged_data(lower('OH_zcta510'), lower('OH_zcta5'));"
done

${PSQL} -c "ALTER TABLE tiger_data.OH_zcta5 ADD CONSTRAINT chk_statefp CHECK (statefp = '39');"
${PSQL} -c "CREATE INDEX tiger_data_OH_zcta5_the_geom_gist ON tiger_data.OH_zcta5 USING gist(the_geom);"
cd /gisdata
wget ftp://ftp2.census.gov/geo/tiger/TIGER2013/FACES/*_39* --no-parent --relative --recursive --level=2 --accept=zip --mirror --reject=html
cd /gisdata/ftp2.census.gov/geo/tiger/TIGER2013/FACES/
rm -f ${TMPDIR}/*.*
${PSQL} -c "DROP SCHEMA IF EXISTS tiger_staging CASCADE;"
${PSQL} -c "CREATE SCHEMA tiger_staging;"
for z in tl_*_39*_faces.zip ; do $UNZIPTOOL -o -d $TMPDIR $z; done
for z in */tl_*_39*_faces.zip ; do $UNZIPTOOL -o -d $TMPDIR $z; done
cd $TMPDIR;

${PSQL} -c "CREATE TABLE tiger_data.OH_faces(CONSTRAINT pk_OH_faces PRIMARY KEY (gid)) INHERITS(faces);"
for z in *faces.dbf; do
${SHP2PGSQL}  -D -s 4269 -g the_geom -W "latin1" $z tiger_staging.OH_faces | ${PSQL}
${PSQL} -c "SELECT loader_load_staged_data(lower('OH_faces'), lower('OH_faces'));"
done

${PSQL} -c "CREATE INDEX tiger_data_OH_faces_the_geom_gist ON tiger_data.OH_faces USING gist(the_geom);"
	${PSQL} -c "CREATE INDEX idx_tiger_data_OH_faces_tfid ON tiger_data.OH_faces USING btree (tfid);"
	${PSQL} -c "CREATE INDEX idx_tiger_data_OH_faces_countyfp ON tiger_data.OH_faces USING btree (countyfp);"
	${PSQL} -c "ALTER TABLE tiger_data.OH_faces ADD CONSTRAINT chk_statefp CHECK (statefp = '39');"
	${PSQL} -c "vacuum analyze tiger_data.OH_faces;"
cd /gisdata
wget ftp://ftp2.census.gov/geo/tiger/TIGER2013/FEATNAMES/*_39* --no-parent --relative --recursive --level=2 --accept=zip --mirror --reject=html
cd /gisdata/ftp2.census.gov/geo/tiger/TIGER2013/FEATNAMES/
rm -f ${TMPDIR}/*.*
${PSQL} -c "DROP SCHEMA IF EXISTS tiger_staging CASCADE;"
${PSQL} -c "CREATE SCHEMA tiger_staging;"
for z in tl_*_39*_featnames.zip ; do $UNZIPTOOL -o -d $TMPDIR $z; done
for z in */tl_*_39*_featnames.zip ; do $UNZIPTOOL -o -d $TMPDIR $z; done
cd $TMPDIR;

${PSQL} -c "CREATE TABLE tiger_data.OH_featnames(CONSTRAINT pk_OH_featnames PRIMARY KEY (gid)) INHERITS(featnames);ALTER TABLE tiger_data.OH_featnames ALTER COLUMN statefp SET DEFAULT '39';"
for z in *featnames.dbf; do
${SHP2PGSQL}  -D -s 4269 -g the_geom -W "latin1" $z tiger_staging.OH_featnames | ${PSQL}
${PSQL} -c "SELECT loader_load_staged_data(lower('OH_featnames'), lower('OH_featnames'));"
done

${PSQL} -c "CREATE INDEX idx_tiger_data_OH_featnames_snd_name ON tiger_data.OH_featnames USING btree (soundex(name));"
${PSQL} -c "CREATE INDEX idx_tiger_data_OH_featnames_lname ON tiger_data.OH_featnames USING btree (lower(name));"
${PSQL} -c "CREATE INDEX idx_tiger_data_OH_featnames_tlid_statefp ON tiger_data.OH_featnames USING btree (tlid,statefp);"
${PSQL} -c "ALTER TABLE tiger_data.OH_featnames ADD CONSTRAINT chk_statefp CHECK (statefp = '39');"
${PSQL} -c "vacuum analyze tiger_data.OH_featnames;"
cd /gisdata
wget ftp://ftp2.census.gov/geo/tiger/TIGER2013/EDGES/*_39* --no-parent --relative --recursive --level=2 --accept=zip --mirror --reject=html
cd /gisdata/ftp2.census.gov/geo/tiger/TIGER2013/EDGES/
rm -f ${TMPDIR}/*.*
${PSQL} -c "DROP SCHEMA IF EXISTS tiger_staging CASCADE;"
${PSQL} -c "CREATE SCHEMA tiger_staging;"
for z in tl_*_39*_edges.zip ; do $UNZIPTOOL -o -d $TMPDIR $z; done
for z in */tl_*_39*_edges.zip ; do $UNZIPTOOL -o -d $TMPDIR $z; done
cd $TMPDIR;

${PSQL} -c "CREATE TABLE tiger_data.OH_edges(CONSTRAINT pk_OH_edges PRIMARY KEY (gid)) INHERITS(edges);"
for z in *edges.dbf; do
${SHP2PGSQL}  -D -s 4269 -g the_geom -W "latin1" $z tiger_staging.OH_edges | ${PSQL}
${PSQL} -c "SELECT loader_load_staged_data(lower('OH_edges'), lower('OH_edges'));"
done

${PSQL} -c "ALTER TABLE tiger_data.OH_edges ADD CONSTRAINT chk_statefp CHECK (statefp = '39');"
${PSQL} -c "CREATE INDEX idx_tiger_data_OH_edges_tlid ON tiger_data.OH_edges USING btree (tlid);"
${PSQL} -c "CREATE INDEX idx_tiger_data_OH_edgestfidr ON tiger_data.OH_edges USING btree (tfidr);"
${PSQL} -c "CREATE INDEX idx_tiger_data_OH_edges_tfidl ON tiger_data.OH_edges USING btree (tfidl);"
${PSQL} -c "CREATE INDEX idx_tiger_data_OH_edges_countyfp ON tiger_data.OH_edges USING btree (countyfp);"
${PSQL} -c "CREATE INDEX tiger_data_OH_edges_the_geom_gist ON tiger_data.OH_edges USING gist(the_geom);"
${PSQL} -c "CREATE INDEX idx_tiger_data_OH_edges_zipl ON tiger_data.OH_edges USING btree (zipl);"
${PSQL} -c "CREATE TABLE tiger_data.OH_zip_state_loc(CONSTRAINT pk_OH_zip_state_loc PRIMARY KEY(zip,stusps,place)) INHERITS(zip_state_loc);"
${PSQL} -c "INSERT INTO tiger_data.OH_zip_state_loc(zip,stusps,statefp,place) SELECT DISTINCT e.zipl, 'OH', '39', p.name FROM tiger_data.OH_edges AS e INNER JOIN tiger_data.OH_faces AS f ON (e.tfidl = f.tfid OR e.tfidr = f.tfid) INNER JOIN tiger_data.OH_place As p ON(f.statefp = p.statefp AND f.placefp = p.placefp ) WHERE e.zipl IS NOT NULL;"
${PSQL} -c "CREATE INDEX idx_tiger_data_OH_zip_state_loc_place ON tiger_data.OH_zip_state_loc USING btree(soundex(place));"
${PSQL} -c "ALTER TABLE tiger_data.OH_zip_state_loc ADD CONSTRAINT chk_statefp CHECK (statefp = '39');"
${PSQL} -c "vacuum analyze tiger_data.OH_edges;"
${PSQL} -c "vacuum analyze tiger_data.OH_zip_state_loc;"
${PSQL} -c "CREATE TABLE tiger_data.OH_zip_lookup_base(CONSTRAINT pk_OH_zip_state_loc_city PRIMARY KEY(zip,state, county, city, statefp)) INHERITS(zip_lookup_base);"
${PSQL} -c "INSERT INTO tiger_data.OH_zip_lookup_base(zip,state,county,city, statefp) SELECT DISTINCT e.zipl, 'OH', c.name,p.name,'39'  FROM tiger_data.OH_edges AS e INNER JOIN tiger.county As c  ON (e.countyfp = c.countyfp AND e.statefp = c.statefp AND e.statefp = '39') INNER JOIN tiger_data.OH_faces AS f ON (e.tfidl = f.tfid OR e.tfidr = f.tfid) INNER JOIN tiger_data.OH_place As p ON(f.statefp = p.statefp AND f.placefp = p.placefp ) WHERE e.zipl IS NOT NULL;"
${PSQL} -c "ALTER TABLE tiger_data.OH_zip_lookup_base ADD CONSTRAINT chk_statefp CHECK (statefp = '39');"
${PSQL} -c "CREATE INDEX idx_tiger_data_OH_zip_lookup_base_citysnd ON tiger_data.OH_zip_lookup_base USING btree(soundex(city));"
cd /gisdata
wget ftp://ftp2.census.gov/geo/tiger/TIGER2013/ADDR/*_39* --no-parent --relative --recursive --level=2 --accept=zip --mirror --reject=html
cd /gisdata/ftp2.census.gov/geo/tiger/TIGER2013/ADDR/
rm -f ${TMPDIR}/*.*
${PSQL} -c "DROP SCHEMA IF EXISTS tiger_staging CASCADE;"
${PSQL} -c "CREATE SCHEMA tiger_staging;"
for z in tl_*_39*_addr.zip ; do $UNZIPTOOL -o -d $TMPDIR $z; done
for z in */tl_*_39*_addr.zip ; do $UNZIPTOOL -o -d $TMPDIR $z; done
cd $TMPDIR;

${PSQL} -c "CREATE TABLE tiger_data.OH_addr(CONSTRAINT pk_OH_addr PRIMARY KEY (gid)) INHERITS(addr);ALTER TABLE tiger_data.OH_addr ALTER COLUMN statefp SET DEFAULT '39';"
for z in *addr.dbf; do
${SHP2PGSQL}  -D -s 4269 -g the_geom -W "latin1" $z tiger_staging.OH_addr | ${PSQL}
${PSQL} -c "SELECT loader_load_staged_data(lower('OH_addr'), lower('OH_addr'));"
done

${PSQL} -c "ALTER TABLE tiger_data.OH_addr ADD CONSTRAINT chk_statefp CHECK (statefp = '39');"
	${PSQL} -c "CREATE INDEX idx_tiger_data_OH_addr_least_address ON tiger_data.OH_addr USING btree (least_hn(fromhn,tohn) );"
	${PSQL} -c "CREATE INDEX idx_tiger_data_OH_addr_tlid_statefp ON tiger_data.OH_addr USING btree (tlid, statefp);"
	${PSQL} -c "CREATE INDEX idx_tiger_data_OH_addr_zip ON tiger_data.OH_addr USING btree (zip);"
	${PSQL} -c "CREATE TABLE tiger_data.OH_zip_state(CONSTRAINT pk_OH_zip_state PRIMARY KEY(zip,stusps)) INHERITS(zip_state); "
	${PSQL} -c "INSERT INTO tiger_data.OH_zip_state(zip,stusps,statefp) SELECT DISTINCT zip, 'OH', '39' FROM tiger_data.OH_addr WHERE zip is not null;"
	${PSQL} -c "ALTER TABLE tiger_data.OH_zip_state ADD CONSTRAINT chk_statefp CHECK (statefp = '39');"
	${PSQL} -c "vacuum analyze tiger_data.OH_addr;"
