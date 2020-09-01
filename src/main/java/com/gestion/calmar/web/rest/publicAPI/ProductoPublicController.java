package com.gestion.calmar.web.rest.publicAPI;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.gestion.calmar.domain.Producto;
import com.gestion.calmar.service.ProductService;

import io.github.jhipster.web.util.PaginationUtil;
import io.swagger.annotations.ApiParam;

@RestController
@RequestMapping("/public-api")
public class ProductoPublicController {

	private final Logger log = LoggerFactory.getLogger(this.getClass());

	@Autowired
	private ProductService productService;

	@GetMapping("/productos/destacados")
	public ResponseEntity<Page<Producto>> getAllDestacadosProduct(@ApiParam Pageable pageable) {
		log.info("Inside getAllRecommendedProduct method...");
		Page<Producto> listPage = productService.listDestacadosProductPage(pageable);
		log.info("Exit getAllRecommendedProduct method...");
		return new ResponseEntity<>(listPage, HttpStatus.OK);
	}

	@GetMapping("/productos/category/{category}")
	public ResponseEntity<Page<Producto>> getAllProductsByCategory(@PathVariable(name = "category") String category,
			@ApiParam Pageable pageable) {
		log.info("Inside getAllProductsByCategory method... param {} category: " + category);
		Page<Producto> pageProduct = productService.listProductByCategoryPage(category, pageable);
		HttpHeaders headers = PaginationUtil
				.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), pageProduct);
		log.info("Exit getAllProducts method...");
		return new ResponseEntity<>(pageProduct, headers, HttpStatus.OK);
	}

	@GetMapping("/productos/search/keyword/{keyword}")
	public ResponseEntity<Page<Producto>> searchProductByName(@PathVariable(name = "keyword") String keyword,
			@ApiParam Pageable pageable) {
		log.info("Inside searchProductByName method... param {} name: " + keyword);
		Page<Producto> pageProduct = productService.searchProductByNameOrDescription(keyword, pageable);
		HttpHeaders headers = PaginationUtil
				.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), pageProduct);
		log.info("Exit searchProductByName method...");
		return new ResponseEntity<>(pageProduct, headers, HttpStatus.OK);
	}
}
