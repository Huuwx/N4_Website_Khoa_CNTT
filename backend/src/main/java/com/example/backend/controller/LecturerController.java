package com.example.backend.controller;

import com.example.backend.dto.common.ApiResponse;
import com.example.backend.dto.lecturer.CreateLecturerRequest;
import com.example.backend.dto.lecturer.LecturerProfileResponse;
import com.example.backend.dto.lecturer.UpdateLecturerProfileRequest;
import com.example.backend.entity.User;
import com.example.backend.entity.UserStatus;
import com.example.backend.service.LecturerService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class LecturerController {

    private final LecturerService lecturerService;

    @PostMapping("/auth/admin/create-lecturer")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<LecturerProfileResponse>> createLecturer(
            @Valid @RequestBody CreateLecturerRequest request) {
        LecturerProfileResponse response = lecturerService.createLecturer(request);
        return ResponseEntity.ok(ApiResponse.success(response, "Lecturer account created successfully"));
    }

    @GetMapping("/v1/lecturers")
    public ResponseEntity<ApiResponse<List<LecturerProfileResponse>>> getAllLecturers(
            @AuthenticationPrincipal User user) {
        boolean isPublicView = user == null || !user.getRole().toString().equals("ADMIN");
        List<LecturerProfileResponse> lecturers = lecturerService.getAllLecturerProfiles(isPublicView);
        return ResponseEntity.ok(ApiResponse.success(lecturers));
    }

    @GetMapping("/v1/lecturers/profile")
    @PreAuthorize("hasRole('LECTURER')")
    public ResponseEntity<ApiResponse<LecturerProfileResponse>> getOwnProfile(
            @AuthenticationPrincipal User user) {
        LecturerProfileResponse lecturer = lecturerService.getLecturerProfileByUserId(user.getId(), false);
        return ResponseEntity.ok(ApiResponse.success(lecturer));
    }

    @GetMapping("/v1/lecturers/{id}")
    public ResponseEntity<ApiResponse<LecturerProfileResponse>> getLecturer(
            @PathVariable UUID id) {
        boolean isPublicView = false;
        LecturerProfileResponse lecturer = lecturerService.getLecturerProfile(id, isPublicView);
        return ResponseEntity.ok(ApiResponse.success(lecturer));
    }

    @PutMapping("/v1/lecturers/profile")
    @PreAuthorize("hasRole('LECTURER')")
    public ResponseEntity<ApiResponse<LecturerProfileResponse>> updateOwnProfile(
            @AuthenticationPrincipal User user,
            @Valid @RequestBody UpdateLecturerProfileRequest request) {
        LecturerProfileResponse response = lecturerService.updateProfile(user.getId(), request);
        return ResponseEntity.ok(ApiResponse.success(response, "Profile updated successfully"));
    }

    @PutMapping("/v1/lecturers/profile/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<LecturerProfileResponse>> updateLecturerProfile(
            @PathVariable UUID id,
            @Valid @RequestBody UpdateLecturerProfileRequest request) {
        LecturerProfileResponse response = lecturerService.updateProfile(id, request);
        return ResponseEntity.ok(ApiResponse.success(response, "Lecturer profile updated successfully"));
    }

    @DeleteMapping("/v1/lecturers/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Void>> deleteLecturer(@PathVariable UUID id) {
        lecturerService.deleteLecturer(id);
        return ResponseEntity.ok(ApiResponse.success(null, "Lecturer deleted successfully"));
    }

    @PatchMapping("/v1/lecturers/{id}/toggle-status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<LecturerProfileResponse>> toggleLecturerStatus(@PathVariable UUID id) {
        LecturerProfileResponse response = lecturerService.toggleLecturerStatus(id);
        String message = response.getStatus() == UserStatus.ACTIVE ?
            "Lecturer account activated successfully" :
            "Lecturer account deactivated successfully";
        return ResponseEntity.ok(ApiResponse.success(response, message));
    }
}