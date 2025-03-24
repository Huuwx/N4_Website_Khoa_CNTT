package com.example.backend.controller;

import com.example.backend.dto.article.ArticleRequest;
import com.example.backend.dto.article.ArticleResponse;
import com.example.backend.dto.common.ApiResponse;
import com.example.backend.service.ArticleService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/articles")
public class ArticleController {

    @Autowired
    private ArticleService articleService;

    @GetMapping
    public ResponseEntity<ApiResponse<Page<ArticleResponse>>> getArticles(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) Long categoryId,
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String sort) {
        try {
            Page<ArticleResponse> articles = articleService.getArticles(page, size, categoryId, search, status, sort);
            return ResponseEntity.ok(ApiResponse.<Page<ArticleResponse>>builder()
                    .status("SUCCESS")
                    .message("Articles retrieved successfully")
                    .data(articles)
                    .timestamp(java.time.LocalDateTime.now())
                    .build());
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(ApiResponse.<Page<ArticleResponse>>builder()
                            .status("ERROR")
                            .message("Failed to retrieve articles: " + e.getMessage())
                            .timestamp(java.time.LocalDateTime.now())
                            .build());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ArticleResponse>> getArticleById(@PathVariable Long id) {
        try {
            ArticleResponse article = articleService.getArticleById(id);
            return ResponseEntity.ok(ApiResponse.<ArticleResponse>builder()
                    .status("SUCCESS")
                    .message("Article retrieved successfully")
                    .data(article)
                    .timestamp(java.time.LocalDateTime.now())
                    .build());
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(ApiResponse.<ArticleResponse>builder()
                            .status("ERROR")
                            .message("Failed to retrieve article: " + e.getMessage())
                            .timestamp(java.time.LocalDateTime.now())
                            .build());
        }
    }

    @PostMapping
    public ResponseEntity<ApiResponse<ArticleResponse>> createArticle(@Valid @RequestBody ArticleRequest request) {
        try {
            ArticleResponse article = articleService.createArticle(request);
            return ResponseEntity.ok(ApiResponse.<ArticleResponse>builder()
                    .status("SUCCESS")
                    .message("Article created successfully")
                    .data(article)
                    .timestamp(java.time.LocalDateTime.now())
                    .build());
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(ApiResponse.<ArticleResponse>builder()
                            .status("ERROR")
                            .message("Failed to create article: " + e.getMessage())
                            .timestamp(java.time.LocalDateTime.now())
                            .build());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<ArticleResponse>> updateArticle(
            @PathVariable Long id,
            @Valid @RequestBody ArticleRequest request) {
        try {
            ArticleResponse article = articleService.updateArticle(id, request);
            return ResponseEntity.ok(ApiResponse.<ArticleResponse>builder()
                    .status("SUCCESS")
                    .message("Article updated successfully")
                    .data(article)
                    .timestamp(java.time.LocalDateTime.now())
                    .build());
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(ApiResponse.<ArticleResponse>builder()
                            .status("ERROR")
                            .message("Failed to update article: " + e.getMessage())
                            .timestamp(java.time.LocalDateTime.now())
                            .build());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteArticle(@PathVariable Long id) {
        try {
            articleService.deleteArticle(id);
            return ResponseEntity.ok(ApiResponse.<Void>builder()
                    .status("SUCCESS")
                    .message("Article deleted successfully")
                    .timestamp(java.time.LocalDateTime.now())
                    .build());
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(ApiResponse.<Void>builder()
                            .status("ERROR")
                            .message("Failed to delete article: " + e.getMessage())
                            .timestamp(java.time.LocalDateTime.now())
                            .build());
        }
    }
}