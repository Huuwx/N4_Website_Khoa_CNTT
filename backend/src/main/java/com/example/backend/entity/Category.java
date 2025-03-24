package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "categories")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @ManyToMany(fetch = FetchType.LAZY, cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(
        name = "category_group_mapping",
        joinColumns = @JoinColumn(name = "category_id"),
        inverseJoinColumns = @JoinColumn(name = "category_group_id")
    )
    @Builder.Default
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private Set<CategoryGroup> categoryGroups = new HashSet<>();

    public void addCategoryGroup(CategoryGroup categoryGroup) {
        if (categoryGroups == null) {
            categoryGroups = new HashSet<>();
        }
        categoryGroups.add(categoryGroup);
        categoryGroup.getCategories().add(this);
    }

    public void removeCategoryGroup(CategoryGroup categoryGroup) {
        if (categoryGroups != null) {
            categoryGroups.remove(categoryGroup);
            categoryGroup.getCategories().remove(this);
        }
    }

}