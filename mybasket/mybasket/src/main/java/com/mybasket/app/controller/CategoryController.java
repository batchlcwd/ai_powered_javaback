package com.mybasket.app.controller;

import com.mybasket.app.dto.CategoryDto;
import com.mybasket.app.entity.Category;
import com.mybasket.app.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/categories")

@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    // create
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<CategoryDto> createCategory(@RequestBody CategoryDto categoryDto) {
        CategoryDto category1 = categoryService.create(categoryDto);
        return new ResponseEntity<>(category1, HttpStatus.CREATED);

    }

    // get all
    @GetMapping
    public ResponseEntity<List<CategoryDto>> getAll() {
        List<CategoryDto> list = categoryService.getAll();
        return new ResponseEntity<>(list, HttpStatus.OK);

    }

    // get single
    @GetMapping("/{categoryId}")
    public ResponseEntity<CategoryDto> get(
            @PathVariable("categoryId") Long categoryId) {
        CategoryDto categoryDto = categoryService.get(categoryId);
        return new ResponseEntity<>(categoryDto, HttpStatus.OK);
    }

    // update
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{categoryId}")
    public ResponseEntity<CategoryDto> update(@PathVariable("categoryId") Long categoryId,
            @RequestBody CategoryDto categoryDto) {
        CategoryDto updatedCategory = categoryService.update(categoryId, categoryDto);
        return new ResponseEntity<>(updatedCategory, HttpStatus.OK);
    }

    // delete
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{categoryId}")
    public ResponseEntity<Void> delete(@PathVariable("categoryId") Long categoryId) {
        categoryService.delete(categoryId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
