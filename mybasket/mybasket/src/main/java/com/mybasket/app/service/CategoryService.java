package com.mybasket.app.service;

import com.mybasket.app.dto.CategoryDto;

import java.util.List;

public interface CategoryService {

    CategoryDto create(CategoryDto categoryDto);

    List<CategoryDto> getAll();

    CategoryDto get(Long categoryId);
    //create

    //update

    //get all

    //get single

    //delete

}
