package com.gestion.calmar.web.rest;

import java.net.URI;
import java.net.URISyntaxException;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gestion.calmar.domain.Producto;
import com.gestion.calmar.repository.ProductRepository;
import com.gestion.calmar.security.AuthoritiesConstants;
import com.gestion.calmar.service.ProductService;
import com.gestion.calmar.web.rest.errors.LoginAlreadyUsedException;

import io.github.jhipster.web.util.HeaderUtil;
import io.swagger.annotations.ApiParam;

@RestController
@RequestMapping("/api")
public class ProductoController {

	private final Logger log = LoggerFactory.getLogger(ProductoController.class);

	private static final String ENTITY_NAME = "productos";

	@Autowired
	private ProductService productService;

	@Autowired
	private ProductRepository productRepo;

	@GetMapping("/productos")
	public ResponseEntity<Page<Producto>> getAllProducts(@ApiParam Pageable pageable) {
		log.info("Inside getAllProducts method...");
		// Page<Producto> pageProduct = productService.listProductPage(pageable);
		log.info("Exit getAllProducts method...");
		return new ResponseEntity<>(null, HttpStatus.OK);
	}

//	@PostMapping("/productos")
//	@Timed
//	public ResponseEntity<Page<Producto>> addProduct(Response Pageable pageable) {
//		log.info("Inside getAllProducts method...");
//		// Page<Producto> pageProduct = productService.listProductPage(pageable);
//		log.info("Exit getAllProducts method...");
//		return new ResponseEntity<>(null, HttpStatus.OK);
//	}

	@PostMapping("/productos")
	@PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.ADMIN + "\")")
	public ResponseEntity<?> createUser(@Valid @RequestBody Producto producto) throws URISyntaxException {
		log.debug("REST request to save User : {}", producto);

		if (producto.getId() != null) {
			throw new LoginAlreadyUsedException();
			// Lowercase the user login before comparing with database
		} else if (productRepo.findOneByName(producto.getName().toLowerCase()).isPresent()) {
			throw new LoginAlreadyUsedException();
		} else {
			Producto newProduct = null;
			try {
				newProduct = productService.createProduct(producto);
			} catch (Exception e) {
				e.printStackTrace();
			}
			// mailService.sendCreationEmail(newUser);
			return ResponseEntity.created(new URI("/api/productos/" + newProduct.getName()))
					.headers(
							HeaderUtil.createAlert("ProductController", "userManagement.created", newProduct.getName()))
					.body(newProduct);
		}
	}
}
