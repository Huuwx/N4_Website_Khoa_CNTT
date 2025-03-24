package com.example.backend.repository;

import com.example.backend.entity.Article;
import com.example.backend.entity.ArticleStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Long> {
    Page<Article> findByCategoryId(Long categoryId, Pageable pageable);
    Page<Article> findByTitleContainingIgnoreCase(String title, Pageable pageable);
    Page<Article> findByStatus(ArticleStatus status, Pageable pageable);
}