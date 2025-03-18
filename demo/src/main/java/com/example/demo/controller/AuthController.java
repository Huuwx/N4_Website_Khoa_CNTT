package com.example.demo.controller;

import com.example.demo.dto.*;
import com.example.demo.exception.BadRequestException;
import com.example.demo.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<ApiResponseDto<UserDto>> register(@Valid @RequestBody RegisterRequest request) {
        try {
            UserDto userDto = authService.register(request);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(ApiResponseDto.success(userDto, "Đăng ký tài khoản thành công"));
        } catch (BadRequestException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ApiResponseDto.error(HttpStatus.BAD_REQUEST.value(), e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponseDto.error(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Lỗi hệ thống"));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponseDto<UserDto>> login(@Valid @RequestBody LoginRequest request) {
        try {
            UserDto userDto = authService.login(request);
            return ResponseEntity.ok(ApiResponseDto.success(userDto, "Đăng nhập thành công"));
        } catch (BadRequestException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ApiResponseDto.error(HttpStatus.BAD_REQUEST.value(), e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponseDto.error(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Lỗi hệ thống"));
        }
    }

    // API cập nhật thông tin giảng viên
    @PutMapping("/update-profile/{taiKhoan}")
    public ResponseEntity<ApiResponseDto<UserDto>> updateProfile(
            @PathVariable String taiKhoan,
            @Valid @RequestBody UpdateGiangVienRequest request) {
        UserDto userDto = authService.updateGiangVien(taiKhoan, request);
        return ResponseEntity.ok(ApiResponseDto.success(userDto, "Cập nhật thông tin thành công"));
    }

    // API cập nhật trạng thái hiển thị thông tin giảng viên
    @PutMapping("/update-visibility/{taiKhoan}")
    public ResponseEntity<ApiResponseDto<UserDto>> updateVisibility(
            @PathVariable String taiKhoan,
            @Valid @RequestBody UpdateVisibilityRequest request) {
        UserDto userDto = authService.updateVisibility(taiKhoan, request);
        return ResponseEntity.ok(ApiResponseDto.success(userDto, "Cập nhật trạng thái hiển thị thành công"));
    }

    @GetMapping("/profile/{taiKhoan}")
    public ResponseEntity<ApiResponseDto<ProfileResponseDto>> getProfile(
            @PathVariable String taiKhoan) {
        try {
            ProfileResponseDto profileDto = authService.getProfile(taiKhoan);
            return ResponseEntity.ok(
                    ApiResponseDto.success(profileDto, "Lấy thông tin profile thành công")
            );
        } catch (BadRequestException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ApiResponseDto.error(HttpStatus.BAD_REQUEST.value(), e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponseDto.error(
                            HttpStatus.INTERNAL_SERVER_ERROR.value(),
                            "Lỗi hệ thống khi lấy thông tin profile"
                    ));
        }
    }

}
