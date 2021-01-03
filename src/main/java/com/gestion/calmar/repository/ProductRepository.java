package com.gestion.calmar.repository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.gestion.calmar.domain.Producto;

/**
 * Spring Data JPA repository for the User entity.
 */
@Repository
public interface ProductRepository extends JpaRepository<Producto, Long> {

	Optional<Producto> findOneByName(String name);

	Optional<Producto> findOneById(Long id);

	@Query(value = "FROM Producto p "
			+ "WHERE p.isEnable = true AND p.categoria.isEnable = true AND p.marca.isEnable = true and p.categoria.name = :categoria")
	Page<Producto> getAllProductByCategory(@Param("categoria") String categoria, Pageable pageable);

	@Query(value = "FROM Producto p "
			+ "WHERE p.isEnable = true AND p.categoria.isEnable = true AND p.marca.isEnable = true ")
	Page<Producto> getAllDestacadosProduct(Pageable pageable);

	@Query(value = "FROM Producto p "
			+ "WHERE p.isEnable = true AND p.categoria.isEnable = true AND p.marca.isEnable = true AND ( p.name like :keyword OR p.description like :keyword )")
	Page<Producto> searchProduct(@Param("keyword") String keyword, Pageable pageable);

	@Query(value = "FROM Producto p "
			+ "WHERE p.isEnable = true AND p.categoria.isEnable = true AND p.marca.isEnable = true AND "
			+ "( p.name like :keyword OR p.description like :keyword "
			+ "OR p.name like :keyword2 OR p.description like :keyword2 )")
	Page<Producto> searchProductWithTwoWord(@Param("keyword") String keyword, @Param("keyword2") String keyword2,
			Pageable pageable);

	@Query(value = "FROM Producto p WHERE p.id IN :ids")
	Set<Producto> getProductByIDs(@Param("ids") List<Long> ids);
}
