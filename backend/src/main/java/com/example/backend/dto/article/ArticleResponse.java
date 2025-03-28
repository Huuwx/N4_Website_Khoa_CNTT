package com.example.backend.dto.article;

import com.example.backend.entity.ArticleStatus;
import com.example.backend.entity.CategoryType;
import com.example.backend.entity.CategoryGroup;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ArticleResponse {
    private Long id;
    private String title;
    private String content;
    private String thumbnailUrl;
    private LocalDateTime publishDate;
    private CategoryGroupDto categoryGroup;
    private ArticleStatus status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class CategoryGroupDto {
        private Long id;
        private String name;
        private String slug;
        private CategoryType type;
        private String pageUrl;
    }
}