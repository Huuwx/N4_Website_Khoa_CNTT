package com.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class YeuCauLienHeDTO {
    private Long id;
    private String name;
    private String email;
    private String message;
    private String status;
    private LocalDateTime createdAt;
}
