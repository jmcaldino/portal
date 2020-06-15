package com.gestion.calmar.service.impl;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gestion.calmar.domain.Producto;
import com.gestion.calmar.repository.ProductRepository;
import com.gestion.calmar.service.ProductService;

@Service
@Transactional
public class ProductServiceImpl implements ProductService {

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
