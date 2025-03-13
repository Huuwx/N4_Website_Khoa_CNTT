package com.example.ptda.service;

import com.example.ptda.entity.AnhDong;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;
import java.util.List;

public interface AnhDongService {
    AnhDong uploadAnh(MultipartFile file) throws IOException;

    //AnhDong updateAnh(Long id, MultipartFile file) throws IOException;

    boolean deleteAnh(Long id) throws IOException;
    List<AnhDong> getAllAnh();
    Optional<AnhDong> getAnhById(Long id);
}
