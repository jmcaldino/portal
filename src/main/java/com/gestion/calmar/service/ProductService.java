package com.gestion.calmar.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.gestion.calmar.domain.Producto;
import com.gestion.calmar.repository.ProductRepository;

@Service
@Transactional
public class ProductService {

	@Autowired
	private ProductRepository productRepository;

	// @Transactional(readOnly = true)
	// public Page<Producto> listProductPage(Pageable pageable) {
	// Page<Producto> product = productRepository.findAll(pageable);
	// return product;
	// }

	public Producto createProduct(Producto producto) {
		// TODO Auto-generated method stub
		Producto newProd = new Producto();
		return newProd;
	}

}
