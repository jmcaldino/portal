package com.gestion.calmar.service;

import java.util.List;

import com.gestion.calmar.domain.Category;

public interface CategoryService {

	public List<Category> getAllSubCategory(Long fatherCategory) throws Exception;

	public List<Category> getAllPrincipalCategory() throws Exception;

}
