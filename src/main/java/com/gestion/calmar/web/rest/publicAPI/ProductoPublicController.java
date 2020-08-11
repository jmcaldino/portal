package com.gestion.calmar.web.rest.publicAPI;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gestion.calmar.domain.Producto;
import com.gestion.calmar.service.ProductService;

import io.swagger.annotations.ApiParam;

@RestController
@RequestMapping("/public-api")
public class ProductoPublicController {

	private final Logger log = LoggerFactory.getLogger(this.getClass());

	@Autowired
	private ProductService productService;

	@GetMapping("/producto/recomendados")
	public ResponseEntity<Page<Producto>> getAllRecommendedProduct(@ApiParam Pageable pageable) {
		log.info("Inside getAllRecommendedProduct method...");
		Page<Producto> listPage = productService.listRecommendedProductPage(pageable);
		log.info("Exit getAllRecommendedProduct method...");
		return new ResponseEntity<>(listPage, HttpStatus.OK);
	}
}
