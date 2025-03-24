package com.example.backend.service;

import lombok.extern.slf4j.Slf4j;
import com.example.backend.dto.article.ArticleRequest;
import com.example.backend.dto.article.ArticleResponse;
import com.example.backend.entity.Article;
import com.example.backend.entity.ArticleStatus;
import com.example.backend.entity.Category;
import com.example.backend.repository.ArticleRepository;
import com.example.backend.repository.CategoryRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
public class ArticleService {

    @Autowired
    private ArticleRepository articleRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private FileUploadService fileUploadService;

    public Page<ArticleResponse> getArticles(int page, int size, Long categoryId, String search, String status, String sort) {
        Pageable pageable;
        if (sort != null && !sort.isEmpty()) {
            String[] parts = sort.split(",");
            String field = parts[0];
            Sort.Direction direction = parts.length > 1 && parts[1].equalsIgnoreCase("desc") 
                ? Sort.Direction.DESC : Sort.Direction.ASC;
            pageable = PageRequest.of(page, size, Sort.by(direction, field));
        } else {
            pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));
        }

        Page<Article> articles;
        if (categoryId != null) {
            articles = articleRepository.findByCategoryId(categoryId, pageable);
        } else if (search != null && !search.isEmpty()) {
            articles = articleRepository.findByTitleContainingIgnoreCase(search, pageable);
        } else if (status != null && !status.isEmpty()) {
            ArticleStatus articleStatus = ArticleStatus.valueOf(status.toUpperCase());
            articles = articleRepository.findByStatus(articleStatus, pageable);
        } else {
            articles = articleRepository.findAll(pageable);
        }

        return articles.map(this::mapToResponse);
    }

    public ArticleResponse getArticleById(Long id) {
        Article article = articleRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Article not found"));
        return mapToResponse(article);
    }

    @Transactional
    public ArticleResponse createArticle(ArticleRequest request) {
        log.info("Starting article creation with request: {}", request);
        
        try {
            log.info("Finding category with ID: {}", request.getCategoryId());
            Category category = categoryRepository.findById(request.getCategoryId())
                    .orElseThrow(() -> new EntityNotFoundException("Category not found"));
            log.info("Found category: {}", category.getName());

            log.info("Building article entity with status: {}", request.getStatus());
            Article article = Article.builder()
                    .title(request.getTitle())
                    .content(request.getContent())
                    .thumbnailUrl(request.getThumbnailUrl())
                    .publishDate(request.getPublishDate())
                    .category(category)
                    .status(ArticleStatus.valueOf(request.getStatus().toUpperCase()))
                    .build();

            log.info("Saving article: {}", article.getTitle());
            Article savedArticle = articleRepository.save(article);
            log.info("Successfully created article with ID: {}", savedArticle.getId());
            
            log.info("Mapping article to response");
            ArticleResponse response = mapToResponse(savedArticle);
            log.info("Article creation completed successfully");
            
            return response;
        } catch (Exception e) {
            log.error("Error creating article: ", e);
            throw e;
        }
    }

    @Transactional
    public ArticleResponse updateArticle(Long id, ArticleRequest request) {
        log.info("Updating article with ID: {}", id);
        
        Article article = articleRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Article not found"));

        // If thumbnail URL is changed, delete the old image
        if (!article.getThumbnailUrl().equals(request.getThumbnailUrl())) {
            log.info("Deleting old thumbnail for article ID: {}", id);
            fileUploadService.deleteFile(article.getThumbnailUrl());
        }

        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new EntityNotFoundException("Category not found"));

        article.setTitle(request.getTitle());
        article.setContent(request.getContent());
        article.setThumbnailUrl(request.getThumbnailUrl());
        article.setPublishDate(request.getPublishDate());
        article.setCategory(category);
        article.setStatus(ArticleStatus.valueOf(request.getStatus().toUpperCase()));

        Article updatedArticle = articleRepository.save(article);
        log.info("Successfully updated article with ID: {}", id);
        
        return mapToResponse(updatedArticle);
    }

    @Transactional
    public void deleteArticle(Long id) {
        log.info("Attempting to delete article with ID: {}", id);
        
        Article article = articleRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Article not found"));

        // Delete the thumbnail from Cloudinary
        log.info("Deleting thumbnail for article ID: {}", id);
        fileUploadService.deleteFile(article.getThumbnailUrl());

        log.info("Deleting article from database, ID: {}", id);
        articleRepository.delete(article);
        log.info("Successfully deleted article with ID: {}", id);
    }

    private void updateArticleFromRequest(Article article, ArticleRequest request) {
        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new EntityNotFoundException("Category not found"));

        article.setTitle(request.getTitle());
        article.setContent(request.getContent());
        article.setThumbnailUrl(request.getThumbnailUrl());
        article.setPublishDate(request.getPublishDate());
        article.setCategory(category);
        article.setStatus(ArticleStatus.valueOf(request.getStatus().toUpperCase()));
    }

    private ArticleResponse mapToResponse(Article article) {
        ArticleResponse.CategoryDto categoryDto = new ArticleResponse.CategoryDto(
                article.getCategory().getId(),
                article.getCategory().getName()
        );

        return new ArticleResponse(
                article.getId(),
                article.getTitle(),
                article.getContent(),
                article.getThumbnailUrl(),
                article.getPublishDate(),
                categoryDto,
                article.getStatus(),
                article.getCreatedAt(),
                article.getUpdatedAt()
        );
    }
}