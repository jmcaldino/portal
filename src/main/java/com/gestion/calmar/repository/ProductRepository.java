package com.gestion.calmar.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.gestion.calmar.domain.Producto;

/**
 * Spring Data JPA repository for the User entity.
 */
@Repository
public interface ProductRepository extends JpaRepository<Producto, Long> {

	Optional<Producto> findOneByName(String name);

}
