package com.substring.services;

import com.substring.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Component
public class UserService {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Autowired
    private NamedParameterJdbcTemplate namedParameterJdbcTemplate;

    // user related business logics

    @Autowired
    private JdbcClient jdbcClient;

    //user save:
    public void saveUser(User user) {

        //logic that save user:db
        //JdbcTemplate
        //JdbcClient
        String query = "insert into users(name,phone) values(?,?)";
        int update = jdbcTemplate.update(
                query,
                user.getName(),
                user.getPhone()
        );


        System.out.println("number of rows effect " + update);
        System.out.println("user saved success !!");


    }

    public List<User> getUsers() {

        String query = "select * from users";
//        id,name,phone
//        id,name,phone

//        row---> user object===> conversion==> RowMapper
        return jdbcTemplate.query(query, (rs, num) -> {
            return new User(rs.getInt("id"), rs.getString("name"), rs.getString("phone"));
        });
    }

    public User getByName(String name) {
        String query = "select * from users where name = :name";
        return namedParameterJdbcTemplate.queryForObject(query, Map.of("name", name), (rs, num) -> {
            return new User(rs.getInt("id"), rs.getString("name"), rs.getString("phone"));
        });

    }

    public void updateUser(User user, int userId) {


        String query = "update users set name =:name , phone =:phone where id =:id";
        namedParameterJdbcTemplate.update(query,
                Map.of(
                        "name", user.getName(),
                        "phone", user.getPhone(),
                        "id", userId
                )
        );


    }

    public void deleteUser(int userId) {
        jdbcTemplate.update("delete from users where id = ?", userId);
    }


    //
    @Transactional
    public void doOperations() {
        //operation1
        //operation2
        //operation3
        //operation4
    }


    @Transactional
    public void saveArticle() {

        // article ko save : operations
        // user ko article id assign--> karenge


    }

    //multiple users:
    @Transactional
    public void saveMany(List<User> userList) {
        String query = "insert into users(name,phone) values(?,?)";

        int[][] ints = jdbcTemplate.batchUpdate(query, userList, userList.size(), (ps, user) -> {
            // how you set the user to query
            ps.setString(1, user.getName());
            ps.setString(2, user.getPhone());
            //100
        });
    }


    //method:
    public User findById(int userId) {


        return jdbcClient
                .sql("select * from users where id =:id")
                .param("id", userId)
                .query(User.class)
                .single();

    }

    public User findByNameJdbcClient(String name) {


        return jdbcClient
                .sql("select * from users where name =:name")
                .param("name", name)
                .query(User.class)
                .single();

    }

    //
    public List<User> findByJdbcClient() {
        return jdbcClient
                .sql("select * from users")
                .query(User.class)
                .list();
    }
}
