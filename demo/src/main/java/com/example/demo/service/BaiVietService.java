package com.example.demo.service;

import com.example.demo.dto.baiviet.BaiVietDTO;
import com.example.demo.dto.baiviet.BaiVietResponse;
import com.example.demo.model.AnhBaiViet;
import com.example.demo.model.BaiViet;
import com.example.demo.model.DanhMuc;
import com.example.demo.model.TaiKhoan;
import com.example.demo.repository.AnhBaiVietRepository;
import com.example.demo.repository.BaiVietRepository;
import com.example.demo.repository.DanhMucRepository;
import com.example.demo.repository.TaiKhoanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BaiVietService {

    @Autowired
    private BaiVietRepository baiVietRepository;

    @Autowired
    private DanhMucRepository danhMucRepository;

    @Autowired
    private TaiKhoanRepository taiKhoanRepository;

    @Autowired
    private AnhBaiVietRepository anhBaiVietRepository;

    public List<BaiVietResponse> getAllBaiViet() {
        List<BaiViet> baiViets = baiVietRepository.findAll();
        return baiViets.stream().map(this::convertToResponse).collect(Collectors.toList());
    }

    public BaiVietResponse getBaiVietById(Long id) {
        Optional<BaiViet> baiVietOpt = baiVietRepository.findById(id);
        return baiVietOpt.map(this::convertToResponse).orElse(null);
    }

    public List<BaiVietResponse> searchBaiVietByTitle(String title) {
        List<BaiViet> baiViets = baiVietRepository.findByTenBaiVietContaining(title);
        return baiViets.stream().map(this::convertToResponse).collect(Collectors.toList());
    }

    public List<BaiVietResponse> getBaiVietByDanhMuc(Long idDanhMuc) {
        List<BaiViet> baiViets = baiVietRepository.findByDanhMuc_IdDanhMuc(idDanhMuc);
        return baiViets.stream().map(this::convertToResponse).collect(Collectors.toList());
    }

    @Transactional
    public BaiVietResponse createBaiViet(BaiVietDTO baiVietDTO) {
        BaiViet baiViet = new BaiViet();
        baiViet.setTenBaiViet(baiVietDTO.getTenBaiViet());
        baiViet.setNoiDung(baiVietDTO.getNoiDung());
        baiViet.setNgayDang(LocalDateTime.now());
        baiViet.setNgayChinhSua(LocalDateTime.now());

        DanhMuc danhMuc = danhMucRepository.findById(baiVietDTO.getIdDanhMuc())
                .orElseThrow(() -> new RuntimeException("Danh mục không tồn tại"));
        baiViet.setDanhMuc(danhMuc);

        TaiKhoan taiKhoan = taiKhoanRepository.findByTaiKhoan(baiVietDTO.getIdTaiKhoan())
                .orElseThrow(() -> new RuntimeException("Tài khoản không tồn tại"));
        baiViet.setTaiKhoan(taiKhoan);

        // Lưu bài viết
        BaiViet savedBaiViet = baiVietRepository.save(baiViet);

        // Lưu ảnh bài viết
        if (baiVietDTO.getDanhSachAnh() != null && !baiVietDTO.getDanhSachAnh().isEmpty()) {
            for (String anh : baiVietDTO.getDanhSachAnh()) {
                AnhBaiViet anhBaiViet = new AnhBaiViet();
                anhBaiViet.setBaiViet(savedBaiViet);
                anhBaiViet.setAnh(anh);
                anhBaiVietRepository.save(anhBaiViet);
            }
        }

        return convertToResponse(savedBaiViet);
    }

    @Transactional
    public BaiVietResponse updateBaiViet(Long id, BaiVietDTO baiVietDTO) {
        BaiViet baiViet = baiVietRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Bài viết không tồn tại"));

        baiViet.setTenBaiViet(baiVietDTO.getTenBaiViet());
        baiViet.setNoiDung(baiVietDTO.getNoiDung());
        baiViet.setNgayChinhSua(LocalDateTime.now());

        // Cập nhật danh mục
        if (baiVietDTO.getIdDanhMuc() != null) {
            DanhMuc danhMuc = danhMucRepository.findById(baiVietDTO.getIdDanhMuc())
                    .orElseThrow(() -> new RuntimeException("Danh mục không tồn tại"));
            baiViet.setDanhMuc(danhMuc);
        }

        // Lưu bài viết
        BaiViet updatedBaiViet = baiVietRepository.save(baiViet);

        // Cập nhật ảnh bài viết
        if (baiVietDTO.getDanhSachAnh() != null) {
            // Xóa ảnh cũ
            anhBaiVietRepository.deleteByBaiViet_Idbv(id);

            // Thêm ảnh mới
            for (String anh : baiVietDTO.getDanhSachAnh()) {
                AnhBaiViet anhBaiViet = new AnhBaiViet();
                anhBaiViet.setBaiViet(updatedBaiViet);
                anhBaiViet.setAnh(anh);
                anhBaiVietRepository.save(anhBaiViet);
            }
        }

        return convertToResponse(updatedBaiViet);
    }

    @Transactional
    public boolean deleteBaiViet(Long id) {
        if (!baiVietRepository.existsById(id)) {
            return false;
        }

        // Xóa ảnh bài viết trước
        anhBaiVietRepository.deleteByBaiViet_Idbv(id);

        // Xóa bài viết
        baiVietRepository.deleteById(id);
        return true;
    }

    private BaiVietResponse convertToResponse(BaiViet baiViet) {
        BaiVietResponse response = new BaiVietResponse();
        response.setIdbv(baiViet.getIdbv());
        response.setTenBaiViet(baiViet.getTenBaiViet());
        response.setNoiDung(baiViet.getNoiDung());
        response.setNgayDang(baiViet.getNgayDang());
        response.setNgayChinhSua(baiViet.getNgayChinhSua());
        response.setDanhMuc(baiViet.getDanhMuc());


        response.setIdTaiKhoan(baiViet.getTaiKhoan().getTaiKhoan());
        response.setHoTenTaiKhoan(baiViet.getTaiKhoan().getHoTen());

        // Lấy danh sách ảnh
        List<AnhBaiViet> anhList = anhBaiVietRepository.findByBaiViet_Idbv(baiViet.getIdbv());
        List<String> danhSachAnh = anhList.stream()
                .map(AnhBaiViet::getAnh)
                .collect(Collectors.toList());
        response.setDanhSachAnh(danhSachAnh);

        return response;
    }

}
