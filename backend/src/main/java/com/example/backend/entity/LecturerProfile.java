package com.example.backend.entity;

import com.example.backend.config.JsonListConverter;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "lecturer_profiles")
public class LecturerProfile {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    private UUID id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @Column(name = "full_name", nullable = false)
    private String fullName;

    @Column(name = "show_full_name", nullable = false)
    private boolean showFullName = true;

    @Column(name = "date_of_birth")
    private LocalDate dateOfBirth;

    @Column(name = "show_date_of_birth", nullable = false)
    private boolean showDateOfBirth = true;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    @Column(name = "show_gender", nullable = false)
    private boolean showGender = true;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "show_phone_number", nullable = false)
    private boolean showPhoneNumber = true;

    @Column(name = "address", columnDefinition = "TEXT")
    private String address;

    @Column(name = "show_address", nullable = false)
    private boolean showAddress = true;

    @Column(name = "avatar_url")
    private String avatarUrl;

    @Column(name = "show_avatar", nullable = false)
    private boolean showAvatar = true;

    @Column(name = "academic_degree")
    private String academicDegree;

    @Column(name = "show_academic_degree", nullable = false)
    private boolean showAcademicDegree = true;

    private String department;

    @Column(name = "show_department", nullable = false)
    private boolean showDepartment = true;

    private String position;

    @Column(name = "show_position", nullable = false)
    private boolean showPosition = true;

    private String faculty;

    @Column(name = "show_faculty", nullable = false)
    private boolean showFaculty = true;

    @Convert(converter = JsonListConverter.class)
    @Column(name = "research_fields", columnDefinition = "json")
    private List<String> researchFields;

    @Column(name = "show_research_fields", nullable = false)
    private boolean showResearchFields = true;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}