package com.example.backend.repository;

import com.example.backend.entity.LecturerProfile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface LecturerProfileRepository extends JpaRepository<LecturerProfile, UUID> {
    Optional<LecturerProfile> findByUserId(UUID userId);
    boolean existsByUserId(UUID userId);
}