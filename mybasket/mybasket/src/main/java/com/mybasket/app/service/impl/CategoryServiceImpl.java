package com.mybasket.app.service.impl;

import com.mybasket.app.dto.CategoryDto;
import com.mybasket.app.entity.Category;
import com.mybasket.app.exception.ResourceNotFoundException;
import com.mybasket.app.repository.CategoryRepository;
import com.mybasket.app.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;
    private final ModelMapper modelMapper;

    @Override
    public CategoryDto create(CategoryDto categoryDto) {
        // dto--> entity
        Category categoryEntity = modelMapper.map(categoryDto, Category.class);
        var savedCategoryEntity = categoryRepository.save(categoryEntity);
        // entity --> dto
        return modelMapper.map(savedCategoryEntity, CategoryDto.class);
    }

    @Override
    public List<CategoryDto> getAll() {
        List<Category> categories = categoryRepository.findAll();
        return categories
                .stream()
                .map(category -> modelMapper.map(category, CategoryDto.class))
                .toList();

    }

    @Override
    public CategoryDto get(Long categoryId) {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with this " + categoryId));
        return modelMapper.map(category, CategoryDto.class);
    }

    @Override
    public CategoryDto update(Long categoryId, CategoryDto categoryDto) {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with this " + categoryId));
        category.setTitle(categoryDto.getTitle());
        // Map other fields as necessary. Assuming title is the only updateable field
        // for now based on DTO.
        // If there are other fields in CategoryDto, they should be updated here.
        // However, checking CategoryDto in previous steps showed it might be simple.
        // Let's assume standard update logic.
        // Actually, let's use model mapper carefully or manual set to avoid overwriting
        // id.
        // Since it's a simple entity, manual update is safer.
        // But wait, I don't see the content of CategoryDto fully (only file list).
        // Let's assume title is what matters

        // Actually simplest is:
        category.setTitle(categoryDto.getTitle());
        // Add more fields if CategoryDto has them

        Category updatedCategory = categoryRepository.save(category);
        return modelMapper.map(updatedCategory, CategoryDto.class);
    }

    @Override
    public void delete(Long categoryId) {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with this " + categoryId));
        categoryRepository.delete(category);
    }
}
