package com.gestion.calmar.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.gestion.calmar.domain.Marca;

@Repository
public interface MarcaRepository extends JpaRepository<Marca, Long> {

}
