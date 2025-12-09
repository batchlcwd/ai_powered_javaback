create view short_address AS
select aid,city,country,user_id
from address;

create view users_address AS
select u.id ,u.name, a.street, a.city , a.zipcode, a.addresss_type
FROM users u
INNER JOIN address a
ON u.id = a.user_id;