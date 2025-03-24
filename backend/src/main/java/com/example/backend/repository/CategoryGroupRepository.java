package com.example.backend.repository;

import com.example.backend.entity.CategoryGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryGroupRepository extends JpaRepository<CategoryGroup, Long> {
}