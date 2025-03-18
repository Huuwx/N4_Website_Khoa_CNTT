package com.example.ptda.service.iplm;

import com.example.ptda.dto.DanhMucDTO;
import com.example.ptda.dto.NhomDanhMucDTO;
import com.example.ptda.entity.DanhMuc;
import com.example.ptda.entity.NhomDanhMuc;
import com.example.ptda.respository.DanhMucRepository;
import com.example.ptda.respository.NhomDanhMucRepository;
import com.example.ptda.service.DanhMucService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DanhMucServiceImpl implements DanhMucService {
    private final DanhMucRepository danhMucRepository;
    private final NhomDanhMucRepository nhomDanhMucRepository;

    @Override
    public List<DanhMucDTO> getAllDanhMuc() {
        return danhMucRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public DanhMucDTO createDanhMuc(DanhMucDTO danhMucDTO) {
        DanhMuc danhMuc = new DanhMuc();
        //danhMuc.setMaDanhMuc(danhMucDTO.getMaDanhMuc());
        danhMuc.setTenDanhMuc(danhMucDTO.getTenDanhMuc());

        Optional<NhomDanhMuc> nhomDanhMuc = nhomDanhMucRepository.findById(danhMucDTO.getNhomDanhMuc().getId());
        nhomDanhMuc.ifPresent(danhMuc::setNhomDanhMuc);

        danhMuc = danhMucRepository.save(danhMuc);
        return convertToDTO(danhMuc);
    }

    @Override
    @Transactional
    public DanhMucDTO updateDanhMuc(Long id, DanhMucDTO danhMucDTO) {
        DanhMuc danhMuc = danhMucRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Danh mục không tồn tại!"));

        //danhMuc.setMaDanhMuc(danhMucDTO.getMaDanhMuc());
        danhMuc.setTenDanhMuc(danhMucDTO.getTenDanhMuc());

        Optional<NhomDanhMuc> nhomDanhMuc = nhomDanhMucRepository.findById(danhMucDTO.getNhomDanhMuc().getId());
        nhomDanhMuc.ifPresent(danhMuc::setNhomDanhMuc);

        danhMuc = danhMucRepository.save(danhMuc);
        return convertToDTO(danhMuc);
    }

    @Override
    @Transactional
    public void deleteDanhMuc(Long id) {
        if (!danhMucRepository.existsById(id)) {
            throw new RuntimeException("Danh mục không tồn tại!");
        }
        danhMucRepository.deleteById(id);
    }

    private DanhMucDTO convertToDTO(DanhMuc danhMuc) {
        NhomDanhMuc nhom = danhMuc.getNhomDanhMuc(); // Lấy thông tin nhóm danh mục

        return new DanhMucDTO(
                danhMuc.getId(),
                //danhMuc.getMaDanhMuc(),
                danhMuc.getTenDanhMuc(),
                nhom != null ? new NhomDanhMucDTO(nhom.getId(), nhom.getTenNhom()) : null
        );
    }
}

