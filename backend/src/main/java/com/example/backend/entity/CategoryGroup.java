package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "category_groups")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CategoryGroup {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String slug;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private CategoryType type;

    @Column(name = "page_url")
    private String pageUrl;

    @ManyToMany(mappedBy = "categoryGroups", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    @Builder.Default
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private Set<Category> categories = new HashSet<>();

    public void removeCategory(Category category) {
        categories.remove(category);
        category.getCategoryGroups().remove(this);
    }

    public void addCategory(Category category) {
        categories.add(category);
        category.getCategoryGroups().add(this);
    }
}