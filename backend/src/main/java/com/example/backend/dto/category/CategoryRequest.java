package com.example.backend.dto.category;

import com.example.backend.entity.CategoryType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CategoryRequest {
    @NotBlank(message = "Name cannot be blank")
    private String name;

    @NotBlank(message = "Slug cannot be blank")
    @Pattern(regexp = "^[a-z0-9-]+$", message = "Slug must contain only lowercase letters, numbers, and hyphens")
    private String slug;

    @NotNull(message = "Category type cannot be null")
    private CategoryType type;

    private String pageUrl;

    @NotEmpty(message = "At least one category group must be selected")
    private Set<Long> categoryGroupIds;
}