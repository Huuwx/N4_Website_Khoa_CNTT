package com.example.backend.controller;

import com.example.backend.dto.category.CategoryGroupRequest;
import com.example.backend.dto.category.CategoryResponse.CategoryGroupResponse;
import com.example.backend.dto.common.ApiResponse;
import com.example.backend.service.CategoryGroupService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/category-groups")
@RequiredArgsConstructor
public class CategoryGroupController {
    private final CategoryGroupService categoryGroupService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<CategoryGroupResponse>>> getAllCategoryGroups() {
        return ResponseEntity.ok(ApiResponse.success(
            categoryGroupService.getAllCategoryGroups(),
            "Success"
        ));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<CategoryGroupResponse>> getCategoryGroupById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(
            categoryGroupService.getCategoryGroupById(id),
            "Success"
        ));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<CategoryGroupResponse>> createCategoryGroup(@Valid @RequestBody CategoryGroupRequest request) {
        return ResponseEntity.ok(ApiResponse.success(
            categoryGroupService.createCategoryGroup(request),
            "Category group created successfully"
        ));
    }
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<CategoryGroupResponse>> updateCategoryGroup(
            @PathVariable Long id,
            @Valid @RequestBody CategoryGroupRequest request) {
        return ResponseEntity.ok(ApiResponse.success(
            categoryGroupService.updateCategoryGroup(id, request),
            "Category group updated successfully"
        ));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteCategoryGroup(@PathVariable Long id) {
        categoryGroupService.deleteCategoryGroup(id);
        return ResponseEntity.ok(ApiResponse.success(
            null,
            "Category group deleted successfully"
        ));
    }
}