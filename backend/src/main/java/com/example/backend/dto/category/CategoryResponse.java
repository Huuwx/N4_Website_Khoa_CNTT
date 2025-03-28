package com.example.backend.dto.category;

import com.example.backend.entity.CategoryType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CategoryResponse {
    private Long id;
    private String name;
    private String slug;
    private CategoryType type;
    private String pageUrl;
    private Set<CategoryGroupResponse> categoryGroups;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CategoryGroupResponse {
        private Long id;
        private String name;
        private String slug;
        private CategoryType type;
        private String pageUrl;
    }
}