package com.example.backend.service;

import lombok.extern.slf4j.Slf4j;
import com.example.backend.dto.category.CategoryRequest;
import com.example.backend.dto.category.CategoryResponse;
import com.example.backend.entity.Category;
import com.example.backend.entity.CategoryGroup;
import com.example.backend.repository.CategoryGroupRepository;
import com.example.backend.repository.CategoryRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Set;
import java.util.HashSet;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryRepository categoryRepository;
    private final CategoryGroupRepository categoryGroupRepository;

    public List<CategoryResponse> getAllCategories() {
        log.info("Fetching all categories");
        List<Category> categories = categoryRepository.findAll();
        log.info("Found {} categories from database", categories.size());
        
        if (categories.isEmpty()) {
            log.warn("No categories found in database");
            return List.of();
        }

        log.info("Mapping categories to response");
        List<CategoryResponse> responses = categories.stream()
                .map(category -> {
                    try {
                        log.debug("Mapping category with ID: {}, Name: {}", category.getId(), category.getName());
                        CategoryResponse response = mapToResponse(category);
                        log.debug("Successfully mapped category ID: {}", category.getId());
                        return response;
                    } catch (Exception e) {
                        log.error("Error mapping category with ID {}: {}", category.getId(), e.getMessage(), e);
                        return null;
                    }
                })
                .filter(response -> response != null)
                .collect(Collectors.toList());
        
        log.info("Successfully mapped {} categories to response", responses.size());
        return responses;
    }

    public CategoryResponse getCategoryById(Long id) {
        return categoryRepository.findById(id)
                .map(this::mapToResponse)
                .orElseThrow(() -> new EntityNotFoundException("Category not found with id: " + id));
    }

    @Transactional
    public CategoryResponse createCategory(CategoryRequest request) {
        Set<CategoryGroup> categoryGroups = getCategoryGroups(request.getCategoryGroupIds());
        
        Category category = Category.builder()
                .name(request.getName())
                .categoryGroups(categoryGroups)
                .build();
        
        return mapToResponse(categoryRepository.save(category));
    }

    @Transactional
    public CategoryResponse updateCategory(Long id, CategoryRequest request) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Category not found with id: " + id));
        
        Set<CategoryGroup> categoryGroups = getCategoryGroups(request.getCategoryGroupIds());
        
        category.setName(request.getName());
        category.setCategoryGroups(categoryGroups);
        
        return mapToResponse(categoryRepository.save(category));
    }

    @Transactional
    public void deleteCategory(Long id) {
        if (!categoryRepository.existsById(id)) {
            throw new EntityNotFoundException("Category not found with id: " + id);
        }
        categoryRepository.deleteById(id);
    }

    private Set<CategoryGroup> getCategoryGroups(Set<Long> ids) {
        Set<CategoryGroup> categoryGroups = ids.stream()
                .map(groupId -> categoryGroupRepository.findById(groupId)
                        .orElseThrow(() -> new EntityNotFoundException("Category group not found with id: " + groupId)))
                .collect(Collectors.toSet());
        
        if (categoryGroups.isEmpty()) {
            throw new IllegalArgumentException("At least one category group must be selected");
        }
        
        return categoryGroups;
    }

    private CategoryResponse mapToResponse(Category category) {
        log.debug("Starting to map category: ID={}, Name={}", category.getId(), category.getName());
        
        try {
            Set<CategoryResponse.CategoryGroupResponse> groupResponses = new HashSet<>();
            if (category.getCategoryGroups() != null) {
                log.debug("Mapping category groups for category ID={}", category.getId());
                groupResponses = category.getCategoryGroups().stream()
                        .map(group -> {
                            try {
                                log.debug("Mapping group: ID={}, Name={}", group.getId(), group.getName());
                                return CategoryResponse.CategoryGroupResponse.builder()
                                        .id(group.getId())
                                        .name(group.getName())
                                        .build();
                            } catch (Exception e) {
                                log.error("Error mapping category group: ID={}, Error={}",
                                    group.getId(), e.getMessage(), e);
                                throw e;
                            }
                        })
                        .collect(Collectors.toSet());
            } else {
                log.debug("No category groups found for category ID={}", category.getId());
            }

            CategoryResponse response = CategoryResponse.builder()
                    .id(category.getId())
                    .name(category.getName())
                    .categoryGroups(groupResponses)
                    .build();
            
            log.debug("Successfully mapped category to response: ID={}", category.getId());
            return response;
            
        } catch (Exception e) {
            log.error("Error in mapToResponse for category ID={}: {}",
                category.getId(), e.getMessage(), e);
            throw new RuntimeException("Error mapping category to response", e);
        }
    }
}