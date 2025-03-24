package com.example.backend.service;

import com.example.backend.dto.lecturer.CreateLecturerRequest;
import com.example.backend.dto.lecturer.LecturerProfileResponse;
import com.example.backend.dto.lecturer.UpdateLecturerProfileRequest;
import com.example.backend.entity.*;
import com.example.backend.repository.LecturerProfileRepository;
import com.example.backend.repository.UserRepository;
import jakarta.validation.ValidationException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class LecturerService {
    private final UserRepository userRepository;
    private final LecturerProfileRepository lecturerProfileRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public LecturerProfileResponse createLecturer(CreateLecturerRequest request) {
        // Check if username or email already exists
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new ValidationException("Username already exists");
        }
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new ValidationException("Email already exists");
        }

        // Create user account
        User user = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.LECTURER)
                .status(UserStatus.ACTIVE)
                .build();
        
        userRepository.save(user);

        // Create lecturer profile with basic information
        LecturerProfile profile = LecturerProfile.builder()
                .user(user)
                .fullName(request.getFullName())
                .gender(Gender.valueOf(request.getGender().toUpperCase()))
                .phoneNumber(request.getPhoneNumber())
                .showFullName(true)
                .showGender(true)
                .showPhoneNumber(true)
                .showAddress(true)
                .showAvatar(true)
                .showAcademicDegree(true)
                .showDepartment(true)
                .showPosition(true)
                .showFaculty(true)
                .showResearchFields(true)
                .build();

        lecturerProfileRepository.save(profile);

        return LecturerProfileResponse.fromEntity(profile, false);
    }

    public LecturerProfileResponse getLecturerProfile(UUID id, boolean isPublicView) {
        LecturerProfile profile = lecturerProfileRepository.findById(id)
                .orElseThrow(() -> new ValidationException("Lecturer profile not found"));
        return LecturerProfileResponse.fromEntity(profile, isPublicView);
    }

    public LecturerProfileResponse getLecturerProfileByUserId(UUID userId, boolean isPublicView) {
        LecturerProfile profile = lecturerProfileRepository.findByUserId(userId)
                .orElseThrow(() -> new ValidationException("Lecturer profile not found"));
        return LecturerProfileResponse.fromEntity(profile, isPublicView);
    }

    public List<LecturerProfileResponse> getAllLecturerProfiles(boolean isPublicView) {
        return lecturerProfileRepository.findAll().stream()
                .map(profile -> LecturerProfileResponse.fromEntity(profile, isPublicView))
                .toList();
    }

    @Transactional
    public LecturerProfileResponse updateProfile(UUID userId, UpdateLecturerProfileRequest request) {
        LecturerProfile profile = lecturerProfileRepository.findByUserId(userId)
                .orElseThrow(() -> new ValidationException("Lecturer profile not found"));

        // Get user and update fields
        User user = profile.getUser();
        
        // Update user fields first
        if (request.getEmail() != null) {
            if (!request.getEmail().equals(user.getEmail()) &&
                userRepository.existsByEmail(request.getEmail())) {
                throw new ValidationException("Email already exists");
            }
            user.setEmail(request.getEmail());
        }
        
        // Save user changes
        user = userRepository.save(user);
        
        // Update profile fields
        if (request.getFullName() != null) {
            profile.setFullName(request.getFullName());
        }
        
        if (request.getGender() != null) {
            profile.setGender(request.getGender());
        }
        
        if (request.getPhoneNumber() != null) {
            profile.setPhoneNumber(request.getPhoneNumber());
        }

        if (request.getAddress() != null) {
            profile.setAddress(request.getAddress());
        }

        if (request.getAvatarUrl() != null) {
            profile.setAvatarUrl(request.getAvatarUrl());
        }

        if (request.getAcademicDegree() != null) {
            profile.setAcademicDegree(request.getAcademicDegree());
        }

        if (request.getDepartment() != null) {
            profile.setDepartment(request.getDepartment());
        }

        if (request.getPosition() != null) {
            profile.setPosition(request.getPosition());
        }

        if (request.getFaculty() != null) {
            profile.setFaculty(request.getFaculty());
        }

        if (request.getResearchFields() != null) {
            profile.setResearchFields(request.getResearchFields());
        }

        // Update visibility settings
        profile.setShowFullName(request.isShowFullName());
        profile.setShowGender(request.isShowGender());
        profile.setShowPhoneNumber(request.isShowPhoneNumber());
        profile.setShowAddress(request.isShowAddress());
        profile.setShowAvatar(request.isShowAvatar());
        profile.setShowAcademicDegree(request.isShowAcademicDegree());
        profile.setShowDepartment(request.isShowDepartment());
        profile.setShowPosition(request.isShowPosition());
        profile.setShowFaculty(request.isShowFaculty());
        profile.setShowResearchFields(request.isShowResearchFields());
        
        // Update user reference and save profile
        profile.setUser(user);
        LecturerProfile updatedProfile = lecturerProfileRepository.save(profile);
        return LecturerProfileResponse.fromEntity(updatedProfile, false);
    }

    @Transactional
    public LecturerProfileResponse toggleLecturerStatus(UUID id) {
        LecturerProfile profile = lecturerProfileRepository.findById(id)
                .orElseThrow(() -> new ValidationException("Lecturer profile not found"));
        
        User user = profile.getUser();
        user.setStatus(user.getStatus() == UserStatus.ACTIVE ? UserStatus.LOCKED : UserStatus.ACTIVE);
        userRepository.save(user);
        
        return LecturerProfileResponse.fromEntity(profile, false);
    }

    @Transactional
    public void deleteLecturer(UUID id) {
        LecturerProfile profile = lecturerProfileRepository.findById(id)
                .orElseThrow(() -> new ValidationException("Lecturer profile not found"));
        
        User user = profile.getUser();
        lecturerProfileRepository.delete(profile);
        userRepository.delete(user);
    }

    public void validateLecturerAccess(UUID userId, UUID requestedUserId) {
        if (!userId.equals(requestedUserId)) {
            throw new AccessDeniedException("You can only access your own profile");
        }
    }
}