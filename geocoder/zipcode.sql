create table zip_geocode (
    zip text primary key,
    city text,
    state text,
    latitude decimal,
    longitude decimal,
    timezone int,
    daylight_savings boolean
);
