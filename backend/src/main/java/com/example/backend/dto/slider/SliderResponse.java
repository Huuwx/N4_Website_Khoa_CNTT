package com.example.backend.dto.slider;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SliderResponse {
    private Long id;
    private String imageUrl;
    private Integer displayOrder;
    private String title;
    private String description;
    private boolean active;
}