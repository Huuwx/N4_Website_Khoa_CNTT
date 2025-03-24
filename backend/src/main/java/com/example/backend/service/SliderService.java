package com.example.backend.service;

import com.example.backend.dto.slider.SliderRequest;
import com.example.backend.dto.slider.SliderResponse;
import com.example.backend.entity.Slider;
import com.example.backend.repository.SliderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SliderService {
    private final SliderRepository sliderRepository;
    private final FileUploadService fileUploadService;

    public List<SliderResponse> getAllSliders() {
        return sliderRepository.findAllByOrderByDisplayOrderAsc()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public List<SliderResponse> getActiveSliders() {
        return sliderRepository.findByActiveOrderByDisplayOrderAsc(true)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public SliderResponse createSlider(SliderRequest request) {
        Slider slider = Slider.builder()
                .imageUrl(request.getImageUrl())
                .displayOrder(request.getDisplayOrder())
                .title(request.getTitle())
                .description(request.getDescription())
                .active(request.isActive())
                .build();
        
        return mapToResponse(sliderRepository.save(slider));
    }

    @Transactional
    public void deleteSlider(Long id) {
        Slider slider = sliderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Slider not found"));
        
        // Delete image from Cloudinary if needed
        if (slider.getImageUrl() != null && !slider.getImageUrl().isEmpty()) {
            fileUploadService.deleteFile(slider.getImageUrl());
        }
        
        sliderRepository.deleteById(id);
    }

    @Transactional
    public SliderResponse updateSliderOrder(Long id, Integer newOrder) {
        Slider slider = sliderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Slider not found"));
        
        slider.setDisplayOrder(newOrder);
        return mapToResponse(sliderRepository.save(slider));
    }

    private SliderResponse mapToResponse(Slider slider) {
        return SliderResponse.builder()
                .id(slider.getId())
                .imageUrl(slider.getImageUrl())
                .displayOrder(slider.getDisplayOrder())
                .title(slider.getTitle())
                .description(slider.getDescription())
                .active(slider.isActive())
                .build();
    }
}