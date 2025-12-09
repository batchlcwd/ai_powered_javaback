use ecom;

create table users(
	id int primary key auto_increment,
    name varchar(200) not null,
    phone varchar(10) not null
);

select * from users;

create table address(
	aid int primary key auto_increment,
    street varchar(200) ,
    city varchar(100) not null,
    country varchar(100) not null,
    zipcode varchar(10) not null,
    user_id int  ,    
    foreign key(user_id)  references users(id) 
);


#insert one user:
insert into users(name,phone) values
("devansh","123456"),
("om prakash","789456");
# insert two address
insert into address(street,city,country,zipcode,user_id,addresss_type) values 
('23525/2352 Sector 2','Delhi','india','226028',2,'SECONDARY');
#meaningful information ko fetch karne mein:
#question : sare users ke name aur unke address ko print kar do.
#users, address
select u.id ,u.name, a.street, a.city , a.zipcode, a.addresss_type
FROM users u
INNER JOIN address a
ON u.id = a.user_id;
#where u.name='devansh';
