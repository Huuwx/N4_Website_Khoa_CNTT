package com.example.backend.service;

import com.example.backend.dto.auth.AuthRequest;
import com.example.backend.dto.auth.AuthResponse;
import com.example.backend.dto.auth.RefreshTokenRequest;
import com.example.backend.entity.User;
import com.example.backend.entity.UserStatus;
import com.example.backend.repository.UserRepository;
import com.example.backend.security.jwt.JwtService;
import jakarta.validation.ValidationException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthResponse login(AuthRequest request) {
        // This will throw an exception if authentication fails
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );

        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new ValidationException("User not found"));

        if (user.getStatus() != UserStatus.ACTIVE) {
            throw new ValidationException("Account is locked");
        }

        String accessToken = jwtService.generateAccessToken(user);
        String refreshToken = jwtService.generateRefreshToken(user);

        return AuthResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .username(user.getUsername())
                .role(user.getRole())
                .message("Login successful")
                .build();
    }

    public AuthResponse refreshToken(RefreshTokenRequest request) {
        String refreshToken = request.getRefreshToken();
        
        // Validate refresh token and extract username
        String username = jwtService.extractUsername(refreshToken);
        if (username == null) {
            throw new ValidationException("Invalid refresh token");
        }

        // Get user details
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ValidationException("User not found"));

        // Validate refresh token
        if (!jwtService.isTokenValid(refreshToken, user)) {
            throw new ValidationException("Invalid refresh token");
        }

        // Generate new tokens
        String newAccessToken = jwtService.generateAccessToken(user);
        String newRefreshToken = jwtService.generateRefreshToken(user);

        return AuthResponse.builder()
                .accessToken(newAccessToken)
                .refreshToken(newRefreshToken)
                .username(user.getUsername())
                .role(user.getRole())
                .message("Token refreshed successfully")
                .build();
    }
}