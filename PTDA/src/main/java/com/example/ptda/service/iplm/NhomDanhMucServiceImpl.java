package com.example.ptda.service.iplm;


import com.example.ptda.dto.NhomDanhMucDTO;
import com.example.ptda.entity.NhomDanhMuc;
import com.example.ptda.respository.NhomDanhMucRepository;
import com.example.ptda.service.NhomDanhMucService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class NhomDanhMucServiceImpl implements NhomDanhMucService {
    private final NhomDanhMucRepository nhomDanhMucRepository;


    @Override
    public List<NhomDanhMucDTO> getAllNhomDanhMuc() {
        return nhomDanhMucRepository.findAll().stream()
                .map(nhom -> new NhomDanhMucDTO(nhom.getId(), nhom.getTenNhom()))
                .collect(Collectors.toList());
    }

    @Override
    public NhomDanhMucDTO createNhomDanhMuc(NhomDanhMucDTO nhomDanhMucDTO) {
        NhomDanhMuc nhomDanhMuc = new NhomDanhMuc();
        nhomDanhMuc.setTenNhom(nhomDanhMucDTO.getTenNhom());
        nhomDanhMuc = nhomDanhMucRepository.save(nhomDanhMuc);
        nhomDanhMucDTO.setId(nhomDanhMuc.getId());
        return nhomDanhMucDTO;
    }

    @Override
    public void deleteNhomDanhMuc(Long id) {
        if (nhomDanhMucRepository.existsById(id)) {
            nhomDanhMucRepository.deleteById(id);
        } else {
            throw new RuntimeException("Nhóm danh mục không tồn tại!");
        }
    }

}
