package com.example.demo.service;

import com.example.demo.dto.*;
import com.example.demo.exception.BadRequestException;
import com.example.demo.model.TaiKhoan;
import com.example.demo.model.ThongTinGiangVien;
import com.example.demo.repository.TaiKhoanRepository;
import com.example.demo.repository.ThongTinGiangVienRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
public class AuthService {

    private final TaiKhoanRepository taiKhoanRepository;
    private final ThongTinGiangVienRepository giangVienRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public AuthService(TaiKhoanRepository taiKhoanRepository,
                       ThongTinGiangVienRepository giangVienRepository) {
        this.taiKhoanRepository = taiKhoanRepository;
        this.giangVienRepository = giangVienRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    @Transactional
    public UserDto register(RegisterRequest request) {
        // Kiểm tra tài khoản đã tồn tại chưa
        if (taiKhoanRepository.existsByTaiKhoan(request.getTaiKhoan())) {
            throw new BadRequestException("Tài khoản đã tồn tại");
        }

        // Kiểm tra email đã tồn tại chưa
        if (taiKhoanRepository.existsByEmail(request.getEmail())) {
            throw new BadRequestException("Email đã được sử dụng");
        }

        // Tạo tài khoản mới nhưng chưa có giảng viên
        TaiKhoan taiKhoan = new TaiKhoan();
        taiKhoan.setTaiKhoan(request.getTaiKhoan());
        taiKhoan.setMatKhau(passwordEncoder.encode(request.getMatKhau())); // Mã hóa mật khẩu
        taiKhoan.setHoTen(request.getHoTen());
        taiKhoan.setGioiTinh(request.getGioiTinh());
        taiKhoan.setSdt(request.getSdt());
        taiKhoan.setEmail(request.getEmail());
        taiKhoan.setTrangThai("Hoạt động");
        taiKhoan.setPhanQuyen("GIANGVIEN");
        taiKhoan.setNgayTao(LocalDateTime.now().toString());
        taiKhoan.setNgayChinhSua(LocalDateTime.now().toString());

        // Tạo một ThongTinGiangVien rỗng
        ThongTinGiangVien giangVien = new ThongTinGiangVien();
        giangVien = giangVienRepository.save(giangVien); // Lưu vào database

        // Gán giảng viên cho tài khoản
        taiKhoan.setGiangVien(giangVien);

        // Lưu tài khoản
        TaiKhoan savedTaiKhoan = taiKhoanRepository.save(taiKhoan);

        // Trả về thông tin đăng ký thành công
        return mapToUserDto(savedTaiKhoan);
    }

    public UserDto login(LoginRequest request) {
        // Tìm tài khoản theo tên đăng nhập
        TaiKhoan taiKhoan = taiKhoanRepository.findByTaiKhoan(request.getTaiKhoan())
                .orElseThrow(() -> new BadRequestException("Tài khoản không tồn tại"));

        // Kiểm tra mật khẩu
        if (!passwordEncoder.matches(request.getMatKhau(), taiKhoan.getMatKhau())) {
            throw new BadRequestException("Mật khẩu không chính xác");
        }

        // Kiểm tra trạng thái tài khoản
        if (!"Hoạt động".equals(taiKhoan.getTrangThai())) {
            throw new BadRequestException("Tài khoản đã bị khóa hoặc không hoạt động");
        }

        // Đăng nhập thành công
        return mapToUserDto(taiKhoan);
    }

    @Transactional
    public UserDto updateGiangVien(String taiKhoan, UpdateGiangVienRequest request) {
        TaiKhoan taiKhoanEntity = taiKhoanRepository.findByTaiKhoan(taiKhoan)
                .orElseThrow(() -> new BadRequestException("Tài khoản không tồn tại"));

        ThongTinGiangVien giangVien = taiKhoanEntity.getGiangVien();

        // Nếu chưa có thông tin giảng viên, tạo mới và liên kết với tài khoản
        if (giangVien == null) {
            giangVien = new ThongTinGiangVien();
            giangVien.setTaiKhoan(taiKhoanEntity);
            taiKhoanEntity.setGiangVien(giangVien);
        }

        // Cập nhật thông tin giảng viên
        giangVien.setAnh(request.getAnh());
        giangVien.setLinhVucNghienCuu(request.getLinhVucNghienCuu());
        giangVien.setHocVi(request.getHocVi());
        giangVien.setKhoa(request.getKhoa());
        giangVien.setBoMon(request.getBoMon());

        // Chỉ cập nhật trạng thái hiển thị nếu frontend gửi dữ liệu
        if (request.getHienAnh() != null) giangVien.setHienAnh(request.getHienAnh());
        if (request.getHienLinhVucNghienCuu() != null) giangVien.setHienLinhVucNghienCuu(request.getHienLinhVucNghienCuu());
        if (request.getHienHocVi() != null) giangVien.setHienHocVi(request.getHienHocVi());
        if (request.getHienKhoa() != null) giangVien.setHienKhoa(request.getHienKhoa());
        if (request.getHienBoMon() != null) giangVien.setHienBoMon(request.getHienBoMon());

        // Lưu dữ liệu vào database
        giangVienRepository.save(giangVien);
        taiKhoanRepository.save(taiKhoanEntity);

        return mapToUserDto(taiKhoanEntity);
    }

    @Transactional
    public UserDto updateVisibility(String taiKhoan, UpdateVisibilityRequest request) {
        TaiKhoan taiKhoanEntity = taiKhoanRepository.findByTaiKhoan(taiKhoan)
                .orElseThrow(() -> new BadRequestException("Tài khoản không tồn tại"));

        ThongTinGiangVien giangVien = taiKhoanEntity.getGiangVien();
        if (giangVien == null) {
            throw new BadRequestException("Giảng viên chưa có thông tin");
        }

        // Cập nhật trạng thái hiển thị
        giangVien.setHienAnh(request.isHienAnh());
        giangVien.setHienLinhVucNghienCuu(request.isHienLinhVucNghienCuu());
        giangVien.setHienHocVi(request.isHienHocVi());
        giangVien.setHienKhoa(request.isHienKhoa());
        giangVien.setHienBoMon(request.isHienBoMon());

        giangVienRepository.save(giangVien);

        return mapToUserDto(taiKhoanEntity);
    }

    private UserDto mapToUserDto(TaiKhoan taiKhoan) {
        ThongTinGiangVien giangVien = taiKhoan.getGiangVien();
        return UserDto.builder()
                .taiKhoan(taiKhoan.getTaiKhoan())
                .hoTen(taiKhoan.getHoTen())
                .email(taiKhoan.getEmail())
                .phanQuyen(taiKhoan.getPhanQuyen())

                // Kiểm tra cờ hiển thị trước khi gán giá trị
                .idgv(giangVien != null ? giangVien.getIdgv() : null)
                .anh(giangVien != null && giangVien.isHienAnh() ? giangVien.getAnh() : null)
                .linhVucNghienCuu(giangVien != null && giangVien.isHienLinhVucNghienCuu() ? giangVien.getLinhVucNghienCuu() : null)
                .hocVi(giangVien != null && giangVien.isHienHocVi() ? giangVien.getHocVi() : null)
                .khoa(giangVien != null && giangVien.isHienKhoa() ? giangVien.getKhoa() : null)
                .boMon(giangVien != null && giangVien.isHienBoMon() ? giangVien.getBoMon() : null)
                .build();
    }

    public ProfileResponseDto getProfile(String taiKhoan) {
        // Tìm tài khoản
        TaiKhoan taiKhoanEntity = taiKhoanRepository.findByTaiKhoan(taiKhoan)
                .orElseThrow(() -> new BadRequestException("Tài khoản không tồn tại"));

        // Lấy thông tin giảng viên
        ThongTinGiangVien giangVien = taiKhoanEntity.getGiangVien();

        // Xây dựng response
        return ProfileResponseDto.builder()
                // Thông tin tài khoản
                .taiKhoan(taiKhoanEntity.getTaiKhoan())
                .hoTen(taiKhoanEntity.getHoTen())
                .email(taiKhoanEntity.getEmail())
                .sdt(taiKhoanEntity.getSdt())
                .gioiTinh(taiKhoanEntity.getGioiTinh())
                .phanQuyen(taiKhoanEntity.getPhanQuyen())

                // Thông tin giảng viên (nếu có)
                .anh(giangVien != null ? giangVien.getAnh() : null)
                .linhVucNghienCuu(giangVien != null ? giangVien.getLinhVucNghienCuu() : null)
                .hocVi(giangVien != null ? giangVien.getHocVi() : null)
                .khoa(giangVien != null ? giangVien.getKhoa() : null)
                .boMon(giangVien != null ? giangVien.getBoMon() : null)

                // Trạng thái hiển thị
                .hienAnh(giangVien != null && giangVien.isHienAnh())
                .hienLinhVucNghienCuu(giangVien != null && giangVien.isHienLinhVucNghienCuu())
                .hienHocVi(giangVien != null && giangVien.isHienHocVi())
                .hienKhoa(giangVien != null && giangVien.isHienKhoa())
                .hienBoMon(giangVien != null && giangVien.isHienBoMon())
                .build();
    }

}
