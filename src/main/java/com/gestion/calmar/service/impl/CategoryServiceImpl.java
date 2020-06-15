package com.gestion.calmar.service.impl;

import java.util.List;

import javax.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gestion.calmar.domain.Category;
import com.gestion.calmar.repository.CategoryRepository;
import com.gestion.calmar.service.CategoryService;

@Service
@Transactional
public class CategoryServiceImpl implements CategoryService {

	private final Logger log = LoggerFactory.getLogger(this.getClass());

	@Autowired
	private CategoryRepository categoryRepository;

	public List<Category> getAllSubCategory(Long fatherCategory) {
		log.info("Inside getAllSubCategory method, parameter { fatherCategory: " + fatherCategory + " }");
		List<Category> subCategory = categoryRepository.getAllSubCategory(fatherCategory);
		log.info("Exit getAllSubCategory method");
		return subCategory;
	}

	public List<Category> getAllPrincipalCategory() {
		log.debug("Inside getAllPrincipalCategory method");
		List<Category> listCategoryPripal = categoryRepository.getAllPrincipalCategory();
		log.debug("return listCategoryPripal() method");
		log.debug("Exit getAllPrincipalCategory method");
		return listCategoryPripal;
	}

}
