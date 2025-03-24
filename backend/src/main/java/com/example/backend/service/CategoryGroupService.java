package com.example.backend.service;

import com.example.backend.dto.category.CategoryGroupRequest;
import com.example.backend.dto.category.CategoryResponse.CategoryGroupResponse;
import com.example.backend.entity.CategoryGroup;
import com.example.backend.repository.CategoryGroupRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoryGroupService {
    private final CategoryGroupRepository categoryGroupRepository;

    public List<CategoryGroupResponse> getAllCategoryGroups() {
        return categoryGroupRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public CategoryGroupResponse getCategoryGroupById(Long id) {
        return categoryGroupRepository.findById(id)
                .map(this::mapToResponse)
                .orElseThrow(() -> new EntityNotFoundException("Category group not found with id: " + id));
    }

    @Transactional
    public CategoryGroupResponse createCategoryGroup(CategoryGroupRequest request) {
        CategoryGroup categoryGroup = CategoryGroup.builder()
                .name(request.getName())
                .build();
        return mapToResponse(categoryGroupRepository.save(categoryGroup));
    }

    @Transactional
    public CategoryGroupResponse updateCategoryGroup(Long id, CategoryGroupRequest request) {
        CategoryGroup categoryGroup = categoryGroupRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Category group not found with id: " + id));
        categoryGroup.setName(request.getName());
        return mapToResponse(categoryGroupRepository.save(categoryGroup));
    }

    @Transactional
    public void deleteCategoryGroup(Long id) {
        CategoryGroup categoryGroup = categoryGroupRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Category group not found with id: " + id));
        
        // Remove this category group from all associated categories
        categoryGroup.getCategories().forEach(category -> {
            category.getCategoryGroups().remove(categoryGroup);
        });
        
        categoryGroupRepository.delete(categoryGroup);
    }

    private CategoryGroupResponse mapToResponse(CategoryGroup categoryGroup) {
        return CategoryGroupResponse.builder()
                .id(categoryGroup.getId())
                .name(categoryGroup.getName())
                .build();
    }
}