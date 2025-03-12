package com.example.ptda.respository;

import com.example.ptda.entity.YeuCauLienHe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface YeuCauLienHeRepository extends JpaRepository<YeuCauLienHe, Long> {
}

