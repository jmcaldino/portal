package com.gestion.calmar.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.gestion.calmar.domain.Category;
import com.gestion.calmar.domain.Marca;
import com.gestion.calmar.domain.Producto;
import com.gestion.calmar.repository.ProductRepository;
import com.gestion.calmar.service.dto.ProductDTO;

import javassist.NotFoundException;

@Service
public class ProductService {

	@Autowired
	private ProductRepository productRepository;

	@Autowired
	private CategoryService categoryService;

	@Autowired
	private MarcaService marcaService;

	// @Transactional(readOnly = true)
	// public Page<Producto> listProductPage(Pageable pageable) {
	// Page<Producto> product = productRepository.findAll(pageable);
	// return product;
	// }

	@Transactional
	public void createProduct(ProductDTO product) throws NotFoundException {
		Producto newProd = product.toProductBasicEntity();
		final Category category = categoryService.getCategory(product.getCategoriaId());
		newProd.setCategoria(category);
		final Marca marca = marcaService.getMarca(product.getMarcaId());
		newProd.setMarca(marca);
		// TODO falta la clase revisión
		productRepository.save(newProd);
	}

	@Transactional
	public Page<Producto> listProductPage(Pageable pageable) {
		Page<Producto> products = productRepository.findAll(pageable);
		return products;
	}

}
