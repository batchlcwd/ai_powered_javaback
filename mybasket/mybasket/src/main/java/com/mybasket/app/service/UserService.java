package com.mybasket.app.service;

import com.mybasket.app.dto.UserDto;

import java.util.List;

public interface UserService {

    UserDto createUser(UserDto userDto);

    UserDto updateUser(Integer userId, UserDto userDto);

    void deleteUser(Integer userId);

    List<UserDto> getAllUsers();

    UserDto getUser(Integer userId);
}
