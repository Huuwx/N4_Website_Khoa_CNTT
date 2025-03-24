package com.example.backend.dto.lecturer;

import com.example.backend.entity.Gender;
import com.example.backend.entity.LecturerProfile;
import com.example.backend.entity.UserStatus;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class LecturerProfileResponse {
    private String id;
    private String username;
    private String email;
    private String fullName;
    private Gender gender;
    private String phoneNumber;
    private String address;
    private String avatarUrl;
    private String academicDegree;
    private String department;
    private String position;
    private String faculty;
    private List<String> researchFields;
    private UserStatus status;
    
    // Visibility flags
    private boolean showFullName;
    private boolean showGender;
    private boolean showPhoneNumber;
    private boolean showAddress;
    private boolean showAvatar;
    private boolean showAcademicDegree;
    private boolean showDepartment;
    private boolean showPosition;
    private boolean showFaculty;
    private boolean showResearchFields;

    public static LecturerProfileResponse fromEntity(LecturerProfile profile, boolean isPublicView) {
        LecturerProfileResponseBuilder builder = LecturerProfileResponse.builder()
                .id(profile.getId().toString())
                .username(profile.getUser().getUsername())
                .status(profile.getUser().getStatus());

        // For private view (lecturer viewing their own profile)
        if (!isPublicView) {
            builder
                .email(profile.getUser().getEmail())
                .fullName(profile.getFullName())
                .gender(profile.getGender())
                .phoneNumber(profile.getPhoneNumber())
                .address(profile.getAddress())
                .avatarUrl(profile.getAvatarUrl())
                .academicDegree(profile.getAcademicDegree())
                .department(profile.getDepartment())
                .position(profile.getPosition())
                .faculty(profile.getFaculty())
                .researchFields(profile.getResearchFields())
                // Include all visibility toggles in private view
                .showFullName(profile.isShowFullName())
                .showGender(profile.isShowGender())
                .showPhoneNumber(profile.isShowPhoneNumber())
                .showAddress(profile.isShowAddress())
                .showAvatar(profile.isShowAvatar())
                .showAcademicDegree(profile.isShowAcademicDegree())
                .showDepartment(profile.isShowDepartment())
                .showPosition(profile.isShowPosition())
                .showFaculty(profile.isShowFaculty())
                .showResearchFields(profile.isShowResearchFields());
        }
        // For public view, only show fields if they are marked as visible
        else {
            if (profile.isShowFullName()) {
                builder.fullName(profile.getFullName());
            }
            if (profile.isShowGender()) {
                builder.gender(profile.getGender());
            }
            if (profile.isShowPhoneNumber()) {
                builder.phoneNumber(profile.getPhoneNumber());
            }
            if (profile.isShowAddress()) {
                builder.address(profile.getAddress());
            }
            if (profile.isShowAvatar()) {
                builder.avatarUrl(profile.getAvatarUrl());
            }
            if (profile.isShowAcademicDegree()) {
                builder.academicDegree(profile.getAcademicDegree());
            }
            if (profile.isShowDepartment()) {
                builder.department(profile.getDepartment());
            }
            if (profile.isShowPosition()) {
                builder.position(profile.getPosition());
            }
            if (profile.isShowFaculty()) {
                builder.faculty(profile.getFaculty());
            }
            if (profile.isShowResearchFields()) {
                builder.researchFields(profile.getResearchFields());
            }
        }

        return builder.build();
    }
}