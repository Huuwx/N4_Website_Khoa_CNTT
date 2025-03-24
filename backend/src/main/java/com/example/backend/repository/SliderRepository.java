package com.example.backend.repository;

import com.example.backend.entity.Slider;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SliderRepository extends JpaRepository<Slider, Long> {
    List<Slider> findAllByOrderByDisplayOrderAsc();
    
    List<Slider> findByActiveOrderByDisplayOrderAsc(boolean active);
}