package com.gestion.calmar.bean;

import java.io.Serializable;
import java.util.List;

public class CartBean implements Serializable {

	private static final long serialVersionUID = 1L;

	private List<Item> items;

	private Integer cantidad;

	private Double total;

	public List<Item> getItems() {
		return items;
	}

	public void setItems(List<Item> items) {
		this.items = items;
	}

	public Double getTotal() {
		return total;
	}

	public void setTotal(Double total) {
		this.total = total;
	}

	public Integer getCantidad() {
		return cantidad;
	}

	public void setCantidad(Integer cantidad) {
		this.cantidad = cantidad;
	}

}
