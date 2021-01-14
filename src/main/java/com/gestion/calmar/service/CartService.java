package com.gestion.calmar.service;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gestion.calmar.bean.CartBean;
import com.gestion.calmar.bean.Item;
import com.gestion.calmar.service.dto.ProductDTO;

@Service
public class CartService {

	private final Logger log = LoggerFactory.getLogger(this.getClass());

	@Autowired
	private ProductService productService;

	public CartBean addProduct(String action, Long productId, HttpSession session, Integer cantidad) {
		CartBean cartBean = null;
		List<Item> items = null;
		if (action.equalsIgnoreCase("order")) {
			if (session.getAttribute("cart") == null) {
				cartBean = new CartBean();
				items = new ArrayList<Item>();
				ProductDTO p = productService.getProductById(productId);
				items.add(new Item(p, 1));
				cartBean.setItems(items);
				cartBean.setTotal(p.getPrice());
				cartBean.setCantidad(1);
				session.setAttribute("cart", cartBean);
			} else {
				cartBean = (CartBean) session.getAttribute("cart");
				int indexProduct = this.isExistProduct(cartBean, productId);
				if (indexProduct != -1) {
					int cantAct = cartBean.getItems().get(indexProduct).getCantidad();
					cartBean.getItems().get(indexProduct).setCantidad(cantAct + cantidad);
				} else {
					ProductDTO p = productService.getProductById(productId);
					cartBean.getItems().add(new Item(p, 1));
				}
				cartBean.setTotal(this.calcularTotal(cartBean.getItems()));
				cartBean.setCantidad(this.cantidadTotal(cartBean));
				session.setAttribute("cart", cartBean);
			}
		}
		if (action.equalsIgnoreCase("orderQuantity")) {
			cartBean = (CartBean) session.getAttribute("cart");
			int indexProduct = this.isExistProduct(cartBean, productId);
			if (indexProduct != -1) {
				cartBean.getItems().get(indexProduct).setCantidad(cantidad);
				cartBean.setTotal(this.calcularTotal(cartBean.getItems()));
				cartBean.setCantidad(this.cantidadTotal(cartBean));
				session.setAttribute("cart", cartBean);
			}
		}
		if (action.equalsIgnoreCase("delete")) {
			if (session.getAttribute("cart") != null) {
				cartBean = (CartBean) session.getAttribute("cart");
				cartBean = this.eliminarProducto(cartBean, productId);
				cartBean.setTotal(this.calcularTotal(cartBean.getItems()));
				cartBean.setCantidad(this.cantidadTotal(cartBean));
				session.setAttribute("cart", cartBean);
			}
		}
		return cartBean;
	}

	private Double calcularTotal(List<Item> items) {
		Double total = 0d;
		for (Item item : items) {
			total = (item.getProducto().getNewPrice() != null ? item.getProducto().getNewPrice()
					: item.getProducto().getPrice() * item.getCantidad()) + total;
		}
		return total;
	}

	private CartBean eliminarProducto(CartBean cart, Long idProd) {
		int index = 0;
		for (Item item : cart.getItems()) {
			if (item.getProducto().getId().equals(idProd)) {
				Double total = cart.getTotal();
				total = total - (item.getCantidad() * item.getProducto().getPrice());
				cart.setTotal(total);
				break;
			}
			index++;
		}
		cart.getItems().remove(index);
		return cart;
	}

	private int isExistProduct(CartBean cart, Long idProd) {
		for (int i = 0; i < cart.getItems().size(); i++) {
			if (cart.getItems().get(i).getProducto().getId().equals(idProd)) {
				return i;
			}
		}
		return -1;
	}

	private int cantidadTotal(CartBean cart) {
		int cantidadTotal = 0;
		for (Item item : cart.getItems()) {
			cantidadTotal += item.getCantidad();
		}
		return cantidadTotal;
	}

	public CartBean getCarrito(HttpSession session) {
		return (CartBean) session.getAttribute("cart");
	}

	public void vaciarCarrito(HttpSession session) {
		if (session.getAttribute("cart") != null) {
			session.setAttribute("cart", null);
		}
	}

}
