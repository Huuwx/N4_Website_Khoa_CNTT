package com.example.backend.dto.article;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ArticleRequest {
    @NotEmpty(message = "Title is required")
    private String title;

    @NotEmpty(message = "Content is required")
    private String content;

    @NotEmpty(message = "Thumbnail URL is required")
    private String thumbnailUrl;

    @NotNull(message = "Publish date is required")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ssXXX")
    private LocalDateTime publishDate;

    @NotNull(message = "Category Group ID is required")
    private Long categoryGroupId;

    @NotNull(message = "Status is required")
    private String status; // DRAFT or PUBLISHED
}