package com.example.backend.controller;

import com.example.backend.dto.common.ApiResponse;
import com.example.backend.dto.slider.SliderRequest;
import com.example.backend.dto.slider.SliderResponse;
import com.example.backend.service.SliderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sliders")
@RequiredArgsConstructor
public class SliderController {
    private final SliderService sliderService;

    @GetMapping
    public ResponseEntity<List<SliderResponse>> getAllSliders() {
        return ResponseEntity.ok(sliderService.getAllSliders());
    }

    @GetMapping("/active")
    public ResponseEntity<List<SliderResponse>> getActiveSliders() {
        return ResponseEntity.ok(sliderService.getActiveSliders());
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<SliderResponse> createSlider(@RequestBody SliderRequest request) {
        return ResponseEntity.ok(sliderService.createSlider(request));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse> deleteSlider(@PathVariable Long id) {
        sliderService.deleteSlider(id);
        return ResponseEntity.ok(ApiResponse.success(null, "Slider deleted successfully"));
    }

    @PutMapping("/{id}/order/{order}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<SliderResponse> updateSliderOrder(
            @PathVariable Long id,
            @PathVariable Integer order) {
        return ResponseEntity.ok(sliderService.updateSliderOrder(id, order));
    }
}