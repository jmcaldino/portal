package com.gestion.calmar.web.rest;

import java.net.URI;
import java.net.URISyntaxException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.gestion.calmar.domain.Producto;
import com.gestion.calmar.security.AuthoritiesConstants;
import com.gestion.calmar.service.ProductService;
import com.gestion.calmar.service.dto.ProductDTO;
import com.gestion.calmar.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.swagger.annotations.ApiParam;
import javassist.NotFoundException;

@RestController
@RequestMapping("/api")
public class ProductController {

	private final Logger log = LoggerFactory.getLogger(ProductController.class);

	private static final String ENTITY_NAME = "producto";

	@Value("${jhipster.clientApp.name}")
	private String applicationName;

	@Autowired
	private ProductService productService;

	@GetMapping("/productos")
	public ResponseEntity<Page<Producto>> getAllProducts(@ApiParam Pageable pageable) {
		log.info("Inside getAllProducts method...");
		Page<Producto> pageProduct = productService.listProductPage(pageable);
		HttpHeaders headers = PaginationUtil
				.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), pageProduct);
		log.info("Exit getAllProducts method...");
		return new ResponseEntity<>(pageProduct, headers, HttpStatus.OK);
	}

	@GetMapping("/productos/name/{name}")
	public ResponseEntity<ProductDTO> getProduct(@PathVariable(name = "name") String name) {
		log.info("Inside getProduct method..." + " { name = " + name + " }");
		ProductDTO productDTO = productService.getProductByName(name);
		log.info("Exit getProduct method...");
		return new ResponseEntity<>(productDTO, HttpStatus.OK);
	}

	@PostMapping("/productos")
	@PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.ADMIN + "\")")
	public ResponseEntity<?> createBasicProduct(@RequestParam(name = "file", required = false) MultipartFile file,
			@RequestParam String name, @RequestParam(required = false) String description, @RequestParam Double price,
			@RequestParam(required = false) Double newPrice, @RequestParam(required = false) Integer stock,
			@RequestParam Boolean isNew, @RequestParam Boolean isRecommended, @RequestParam Long marcaId,
			@RequestParam Long categoriaId, @RequestParam Boolean isEnable)
			throws URISyntaxException, NotFoundException {
		log.debug("REST request to save Product : {}", name);
		if (name != null && !name.isEmpty() && productService.getByName(name.toLowerCase()).isPresent()) {
			log.error("El nombre del producto '" + name + "' ya existe en el sistema.");
			throw new BadRequestAlertException("El nombre de producto ya existe", "productManagement", "productexists");
		}

		log.info("Creando el producto '" + name + "'.");
		productService.createProduct(name, description, file, price, newPrice, stock, isNew, isRecommended, isEnable,
				marcaId, categoriaId);
		// mailService.sendCreationEmail(newUser); TODO CAMBIAR getMarcaId()
		return ResponseEntity.created(new URI("/api/productos"))
				.headers(HeaderUtil.createAlert("productManagement", "productManagement.created", name)).body(null);
	}

	@PutMapping("/productos")
	@PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.ADMIN + "\")")
	public ResponseEntity<?> updateBasicProduct(@RequestParam(name = "file", required = false) MultipartFile file,
			@RequestParam Long id, @RequestParam String name, @RequestParam(required = false) String description,
			@RequestParam Double price, @RequestParam(required = false) Double newPrice,
			@RequestParam(required = false) Integer stock, @RequestParam Boolean isNew,
			@RequestParam Boolean isRecommended, @RequestParam Long marcaId, @RequestParam Long categoriaId,
			@RequestParam Boolean isEnable) throws URISyntaxException, NotFoundException {
		log.debug("REST request to update Product : {}", id);

		log.info("Actualizando el producto '" + name + "'.");
		productService.updateProduct(id, name, description, file, price, newPrice, stock, isNew, isRecommended,
				isEnable, marcaId, categoriaId);
		return ResponseEntity.ok()
				.headers(HeaderUtil.createAlert("productManagement", "productManagement.updated", name)).body(null);
	}

	/**
	 * {@code DELETE /productos/name/:name} : delete the "id" Product.
	 *
	 * @param name the name of the product to delete.
	 * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
	 */
	@DeleteMapping("/productos/name/{name}")
	@PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.ADMIN + "\")")
	public ResponseEntity<Void> deleteUser(@PathVariable String name) {
		log.debug("REST request to delete Product: {}", name);
		productService.deleteProduct(name);
		return ResponseEntity.noContent()
				.headers(HeaderUtil.createAlert(applicationName, "productManagement.deleted", name)).build();
	}

}
