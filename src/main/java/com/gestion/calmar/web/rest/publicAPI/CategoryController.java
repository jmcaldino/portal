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

import com.gestion.calmar.domain.Category;
import com.gestion.calmar.service.CategoryService;

@RestController
@RequestMapping("/public-api")
public class CategoryController {

	private final Logger log = LoggerFactory.getLogger(CategoryController.class);

	@Autowired
	private CategoryService categoryService;

	/**
	 * GET /users : get all categories.
	 *
	 * @return the ResponseEntity with status 200 (OK) and with body all principal
	 *         categories
	 */
	@GetMapping("/categories")
	public ResponseEntity<List<Category>> getAllCategory() {
		log.debug("Inside getAllPrincipalCategory method");
		List<Category> categories = categoryService.getAllCategory();
		return new ResponseEntity<>(categories, HttpStatus.OK);
	}

	/**
	 * GET /users : get all principal categories.
	 *
	 * @return the ResponseEntity with status 200 (OK) and with body all principal
	 *         categories
	 */
	@GetMapping("/categories/dad")
	public ResponseEntity<List<Category>> getAllPrincipalCategory() {
		log.debug("Inside getAllPrincipalCategory method");
		List<Category> categories = categoryService.getAllPrincipalCategory();
		return new ResponseEntity<>(categories, HttpStatus.OK);
	}

	/**
	 * GET /users : get all sub category.
	 *
	 * @Param String principalCategory
	 * @return the ResponseEntity with status 200 (OK) and with body all principal
	 *         categories
	 */
	@GetMapping("/categories/{principalCategory}")
	public ResponseEntity<List<Category>> getAllPrincipalCategory(
			@PathVariable(name = "principalCategory") Long principalCategoryId) {
		log.debug("Inside getAllPrincipalCategory method. Param {principalCategoryId : " + principalCategoryId);
		List<Category> categories = categoryService.getAllSubCategory(principalCategoryId);
		return new ResponseEntity<>(categories, HttpStatus.OK);
	}

}
