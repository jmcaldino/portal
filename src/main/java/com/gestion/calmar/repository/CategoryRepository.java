package com.gestion.calmar.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 * Spring Data JPA repository for the User entity.
 */

import org.springframework.stereotype.Repository;

import com.gestion.calmar.domain.Category;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {

	@Query("FROM Category c " + "WHERE ( c.id <> c.parent " + "AND c.isEnable = true "
			+ "AND c.parent.id = :c_principal)")
	public List<Category> getAllSubCategory(@Param("c_principal") Long categoriaPadre);

	@Query("FROM Category c " + "WHERE (c.id = c.parent " + "AND c.isEnable = true)")
	public List<Category> getAllPrincipalCategory();
}
