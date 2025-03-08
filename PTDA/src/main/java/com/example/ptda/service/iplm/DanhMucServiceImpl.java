package com.example.ptda.service.iplm;

import com.example.ptda.dto.DanhMucDTO;
import com.example.ptda.dto.ResponseDTO;
import com.example.ptda.entity.DanhMuc;
import com.example.ptda.respository.DanhMucRepository;
import com.example.ptda.service.DanhMucService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DanhMucServiceImpl implements DanhMucService {
    @Autowired
    private DanhMucRepository danhMucRepository;

    @Override
    public ResponseDTO<List<DanhMucDTO>> getAllDanhMuc() {
        List<DanhMuc> danhMucs = danhMucRepository.findAll();
        List<DanhMucDTO> danhMucDTOs = danhMucs.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
        return new ResponseDTO<>(true, "Lấy danh mục thành công", danhMucDTOs);
    }

    @Override
    public ResponseDTO<DanhMucDTO> getDanhMucById(Long id) {
        DanhMuc danhMuc = danhMucRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Danh mục không tồn tại!"));
        return new ResponseDTO<>(true, "Lấy danh mục thành công", convertToDTO(danhMuc));
    }

    @Override
    public ResponseDTO<DanhMucDTO> createDanhMuc(DanhMucDTO danhMucDTO) {
        DanhMuc danhMuc = new DanhMuc();
        danhMuc.setTenDanhMuc(danhMucDTO.getTenDanhMuc());
        danhMuc.setNhomDanhMuc(danhMucDTO.getNhomDanhMuc());

        danhMucRepository.save(danhMuc);
        return new ResponseDTO<>(true, "Tạo danh mục thành công", convertToDTO(danhMuc));
    }

    @Override
    public ResponseDTO<DanhMucDTO> updateDanhMuc(Long id, DanhMucDTO danhMucDTO) {
        DanhMuc danhMuc = danhMucRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Danh mục không tồn tại!"));

        danhMuc.setTenDanhMuc(danhMucDTO.getTenDanhMuc());
        danhMuc.setNhomDanhMuc(danhMucDTO.getNhomDanhMuc());

        danhMucRepository.save(danhMuc);
        return new ResponseDTO<>(true, "Cập nhật danh mục thành công", convertToDTO(danhMuc));
    }

    @Override
    public ResponseDTO<String> deleteDanhMuc(Long id) {
        if (!danhMucRepository.existsById(id)) {
            return new ResponseDTO<>(false, "Danh mục không tồn tại!", null);
        }
        danhMucRepository.deleteById(id);
        return new ResponseDTO<>(true, "Xóa danh mục thành công", null);
    }

    private DanhMucDTO convertToDTO(DanhMuc danhMuc) {
        DanhMucDTO dto = new DanhMucDTO();
        dto.setId(danhMuc.getIdDanhMuc());
        dto.setTenDanhMuc(danhMuc.getTenDanhMuc());
        dto.setNhomDanhMuc(danhMuc.getNhomDanhMuc());
        return dto;
    }
}
