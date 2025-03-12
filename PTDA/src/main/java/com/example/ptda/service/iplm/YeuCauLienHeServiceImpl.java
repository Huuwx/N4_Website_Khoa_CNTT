package com.example.ptda.service.iplm;

import com.example.ptda.dto.YeuCauLienHeDTO;
import com.example.ptda.dto.ResponseDTO;
import com.example.ptda.entity.YeuCauLienHe;
import com.example.ptda.respository.YeuCauLienHeRepository;
import com.example.ptda.service.YeuCauLienHeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class YeuCauLienHeServiceImpl implements YeuCauLienHeService {

    @Autowired
    private YeuCauLienHeRepository yeuCauLienHeRepository;

    @Override
    public ResponseDTO<List<YeuCauLienHeDTO>> getAllYeuCau() {
        List<YeuCauLienHe> yeuCaus = yeuCauLienHeRepository.findAll();
        List<YeuCauLienHeDTO> yeuCauDTOs = yeuCaus.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
        return new ResponseDTO<>(true, "Lấy danh sách yêu cầu liên hệ thành công", yeuCauDTOs);
    }

    @Override
    public ResponseDTO<YeuCauLienHeDTO> getYeuCauById(Long id) {
        YeuCauLienHe yeuCau = yeuCauLienHeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Yêu cầu liên hệ không tồn tại!"));
        return new ResponseDTO<>(true, "Lấy yêu cầu liên hệ thành công", convertToDTO(yeuCau));
    }

    @Override
    public ResponseDTO<YeuCauLienHeDTO> createYeuCau(YeuCauLienHeDTO yeuCauDTO) {
        YeuCauLienHe yeuCau = new YeuCauLienHe();
        yeuCau.setNgayLienHe(yeuCauDTO.getNgayLienHe());
        yeuCau.setHoTen(yeuCauDTO.getHoTen());
        yeuCau.setEmail(yeuCauDTO.getEmail());
        yeuCau.setNoiDung(yeuCauDTO.getNoiDung());
        yeuCau.setTrangThai("Đang xử lý");

        yeuCauLienHeRepository.save(yeuCau);
        return new ResponseDTO<>(true, "Tạo yêu cầu liên hệ thành công", convertToDTO(yeuCau));
    }

    @Override
    public ResponseDTO<YeuCauLienHeDTO> updateYeuCau(Long id, YeuCauLienHeDTO yeuCauDTO) {
        YeuCauLienHe yeuCau = yeuCauLienHeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Yêu cầu liên hệ không tồn tại!"));
        yeuCau.setTrangThai(yeuCauDTO.getTrangThai());

        yeuCauLienHeRepository.save(yeuCau);
        return new ResponseDTO<>(true, "Cập nhật yêu cầu liên hệ thành công", convertToDTO(yeuCau));
    }

    @Override
    public ResponseDTO<String> deleteYeuCau(Long id) {
        if (!yeuCauLienHeRepository.existsById(id)) {
            return new ResponseDTO<>(false, "Yêu cầu liên hệ không tồn tại!", null);
        }
        yeuCauLienHeRepository.deleteById(id);
        return new ResponseDTO<>(true, "Xóa yêu cầu liên hệ thành công", null);
    }

    private YeuCauLienHeDTO convertToDTO(YeuCauLienHe yeuCau) {
        YeuCauLienHeDTO dto = new YeuCauLienHeDTO();
        dto.setId(yeuCau.getId());
        dto.setNgayLienHe(yeuCau.getNgayLienHe());
        dto.setHoTen(yeuCau.getHoTen());
        dto.setEmail(yeuCau.getEmail());
        dto.setNoiDung(yeuCau.getNoiDung());
        dto.setTrangThai(yeuCau.getTrangThai());
        return dto;
    }
}
