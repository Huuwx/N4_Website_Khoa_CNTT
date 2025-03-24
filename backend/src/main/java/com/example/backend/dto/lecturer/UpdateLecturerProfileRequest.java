package com.example.backend.dto.lecturer;

import com.example.backend.entity.Gender;
import jakarta.validation.constraints.Email;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UpdateLecturerProfileRequest {
    @Email(message = "Invalid email format")
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

    // Visibility toggles
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
}