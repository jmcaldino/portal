package com.gestion.calmar.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.gestion.calmar.domain.Marca;
import com.gestion.calmar.repository.MarcaRepository;

import javassist.NotFoundException;

@Service
@Transactional
public class MarcaService {

	@Autowired
	private MarcaRepository marcaRepo;

	public Marca getMarca(Long id) throws NotFoundException {
		return marcaRepo.findById(id)
				.orElseThrow(() -> new NotFoundException("Marca -> Not Found. Parameter { marcaId: " + id + "}"));
	}
}
