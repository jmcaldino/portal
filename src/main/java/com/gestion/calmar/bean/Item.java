package com.gestion.calmar.bean;

import java.io.Serializable;

import com.gestion.calmar.service.dto.ProductDTO;

public class Item implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private ProductDTO producto;
	private int cantidad;

	public Item() {
	}

	public Item(ProductDTO producto, int cantidad) {
		this.producto = producto;
		this.cantidad = cantidad;
	}

	public ProductDTO getProducto() {
		return producto;
	}

	public void setProducto(ProductDTO producto) {
		this.producto = producto;
	}

	public int getCantidad() {
		return cantidad;
	}

	public void setCantidad(int cantidad) {
		this.cantidad = cantidad;
	}

	@Override
	public String toString() {
		return "Item [producto=" + producto + ", cantidad=" + cantidad + "]";
	}

}
