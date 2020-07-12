package com.gestion.calmar.web.rest;

import java.net.URI;
import java.net.URISyntaxException;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.gestion.calmar.domain.Producto;
import com.gestion.calmar.repository.ProductRepository;
import com.gestion.calmar.security.AuthoritiesConstants;
import com.gestion.calmar.service.ProductService;
import com.gestion.calmar.service.dto.ProductDTO;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.swagger.annotations.ApiParam;
import javassist.NotFoundException;

@RestController
@RequestMapping("/api")
public class ProductController {

	private final Logger log = LoggerFactory.getLogger(ProductController.class);

	private static final String ENTITY_NAME = "productos";

	@Autowired
	private ProductService productService;

	@Autowired
	private ProductRepository productRepo;

	@GetMapping("/productos")
	public ResponseEntity<Page<Producto>> getAllProducts(@ApiParam Pageable pageable) {
		log.info("Inside getAllProducts method...");
		Page<Producto> pageProduct = productService.listProductPage(pageable);
		HttpHeaders headers = PaginationUtil
				.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), pageProduct);
		log.info("Exit getAllProducts method...");
		return new ResponseEntity<>(pageProduct, headers, HttpStatus.OK);
	}

	@PostMapping("/productos")
	@PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.ADMIN + "\")")
	public ResponseEntity<?> createProduct(@Valid @RequestBody ProductDTO producto) throws URISyntaxException {
		log.debug("REST request to save User : {}", producto);

		if (producto.getId() != null) {
			return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, false, "idexists",
					"A new product cannot already have an ID", "sad")).body(null);
			// Lowercase the user login before comparing with database
		} else if (productRepo.findOneByName(producto.getName().toLowerCase()).isPresent()) {
			return ResponseEntity.badRequest().headers(
					HeaderUtil.createFailureAlert(ENTITY_NAME, false, "productexists", "Product already in use", "sad"))
					.body(null);
		} else {
			try {
				productService.createProduct(producto);
			} catch (NotFoundException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			// mailService.sendCreationEmail(newUser); TODO CAMBIAR getMarcaId()
			return ResponseEntity.created(new URI("/api/productos/" + producto.getMarcaId()))
					.headers(HeaderUtil.createAlert("productoEntity", "userManagement.created", producto.getName()))
					.body(producto);
		}
	}

	@PostMapping("/productos/basic")
	@PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.ADMIN + "\")")
	public ResponseEntity<?> createBasicProduct(@RequestParam("file") MultipartFile file,
			@RequestParam(required = false) Long id, @RequestParam String name,
			@RequestParam(required = false) String description, @RequestParam Double price,
			@RequestParam(required = false) Double newPrice, @RequestParam(required = false) Integer stock,
			@RequestParam Boolean isNew, @RequestParam Boolean isRecommended, @RequestParam Long marcaId,
			@RequestParam Long categoriaId, @RequestParam Boolean isEnable)
			throws URISyntaxException, NotFoundException {
		log.debug("REST request to save User : {}", name);

		if (id != null) {
			return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, false, "idexists",
					"A new product cannot already have an ID", "sad")).body(null);
			// Lowercase the user login before comparing with database
		} else if (productRepo.findOneByName(name.toLowerCase()).isPresent()) {
			return ResponseEntity.badRequest().headers(
					HeaderUtil.createFailureAlert(ENTITY_NAME, false, "productexists", "Product already in use", "sad"))
					.body(null);
		} else {
			// productService.createProduct(producto);
			log.info("llego");
			// mailService.sendCreationEmail(newUser); TODO CAMBIAR getMarcaId()
			return ResponseEntity.created(new URI("/api/productos/" + marcaId))
					.headers(HeaderUtil.createAlert("productoEntity", "userManagement.created", name)).body(null);
		}
	}

}
