package com.gestion.calmar.web.rest.publicAPI;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gestion.calmar.domain.Marca;
import com.gestion.calmar.service.MarcaService;

@RestController
@RequestMapping("/public-api")
public class MarcaController {

	private final Logger log = LoggerFactory.getLogger(this.getClass());

	@Autowired
	private MarcaService marcaService;

	@GetMapping("/marcas")
	public ResponseEntity<List<Marca>> getAllMark() {
		log.info("Inside getAllMark method...");
		List<Marca> listMarks = marcaService.getAllMarca();
		log.info("Exit getAllMark method...");
		return new ResponseEntity<>(listMarks, HttpStatus.OK);
	}

	@GetMapping("/marcas/id/{id}")
	public ResponseEntity<List<Marca>> getMark(@PathVariable(name = "id") Long id) {
		log.info("Inside getMark method... Param {} " + id); // TODO agregar
		log.info("Exit getAllProducts method...");
		return new ResponseEntity<>(marcaService.getAllMarca(), HttpStatus.OK);
	}

}
