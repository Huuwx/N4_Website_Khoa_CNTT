package com.example.backend.service;

import com.example.backend.dto.YeuCauLienHeDTO;
import com.example.backend.dto.ResponseDTO;
import com.example.backend.entity.YeuCauLienHe;
import com.example.backend.repository.YeuCauLienHeRepository;
import com.example.backend.service.YeuCauLienHeService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class YeuCauLienHeService {

    private final YeuCauLienHeRepository yeuCauLienHeRepository;

    public ResponseDTO<List<YeuCauLienHeDTO>> getAllYeuCau() {
        log.info("Fetching all contact requests...");
        List<YeuCauLienHeDTO> result = yeuCauLienHeRepository.findAll()
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
        log.info("Found {} contact requests", result.size());
        return new ResponseDTO<>(true, "Success", result);
    }

    public ResponseDTO<YeuCauLienHeDTO> getYeuCauById(Long id) {
        log.info("Fetching contact request with ID: {}", id);
        YeuCauLienHe yeuCau = yeuCauLienHeRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Contact request not found"));
        log.info("Contact request found: {}", yeuCau.getId());
        return new ResponseDTO<>(true, "Success", mapToDTO(yeuCau)); 
    }

    @Transactional
    public ResponseDTO<YeuCauLienHeDTO> createYeuCau(YeuCauLienHeDTO dto) {
        log.info("Creating new contact request: {}", dto);
        YeuCauLienHe entity = mapToEntity(dto);
        YeuCauLienHe savedEntity = yeuCauLienHeRepository.save(entity);
        log.info("Created contact request with ID: {}", savedEntity.getId());
        return new ResponseDTO<>(true, "Created successfully", mapToDTO(savedEntity));
    }

    @Transactional
    public ResponseDTO<YeuCauLienHeDTO> updateYeuCau(Long id, YeuCauLienHeDTO dto) {
        log.info("Updating contact request with ID: {}", id);
        YeuCauLienHe entity = yeuCauLienHeRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Contact request not found"));

        // Chỉ cập nhật trường status nếu được cung cấp
        if (dto.getStatus() != null) {
            entity.setStasus(dto.getStatus());
        }

        YeuCauLienHe updatedEntity = yeuCauLienHeRepository.save(entity);
        log.info("Updated contact request ID: {}", id);
        return new ResponseDTO<>(true, "Updated successfully", mapToDTO(updatedEntity));
    }

    @Transactional
    public ResponseDTO<String> deleteYeuCau(Long id) {
        log.info("Deleting contact request with ID: {}", id);
        if (!yeuCauLienHeRepository.existsById(id)) {
            throw new EntityNotFoundException("Contact request not found");
        }
        yeuCauLienHeRepository.deleteById(id);
        log.info("Deleted contact request ID: {}", id);
        return new ResponseDTO<>(true, "Deleted successfully", "Deleted request ID: " + id);
    }

    // ✅ Chuyển đổi từ Entity -> DTO
    private YeuCauLienHeDTO mapToDTO(YeuCauLienHe entity) {
        return new YeuCauLienHeDTO(
                entity.getId(),
                entity.getName(),
                entity.getEmail(),
                entity.getMessage(),
                entity.getStasus(),
                entity.getCreatedAt()
        );
    }

    // ✅ Chuyển đổi từ DTO -> Entity
    private YeuCauLienHe mapToEntity(YeuCauLienHeDTO dto) {
        return YeuCauLienHe.builder()
                .name(dto.getName())
                .email(dto.getEmail())
                .message(dto.getMessage())
                .stasus(dto.getStatus())
                .build();
    }
}
