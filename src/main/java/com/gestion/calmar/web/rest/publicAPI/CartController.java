package com.gestion.calmar.web.rest.publicAPI;

import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.gestion.calmar.bean.CartBean;
import com.gestion.calmar.service.CartService;

import javassist.NotFoundException;

@RestController
@RequestMapping("/public-api")
public class CartController {

	private final Logger log = LoggerFactory.getLogger(CartController.class);

	@Autowired
	private CartService cartService;

	/**
	 * GET /carrito/id/{id}/action/{action}
	 *
	 * @return the ResponseEntity with status 200 (OK) and with body all principal
	 *         categories
	 */
	@GetMapping("/carrito/id/{id}/action/{action}")
	public ResponseEntity<CartBean> carrito(@PathVariable(name = "id") Long id,
			@PathVariable(name = "action") String action, HttpSession session,
			@RequestParam(required = false, name = "cantidad") Integer cantidad) throws NotFoundException {
		log.debug("Inside carrito method");
		CartBean cartBean = null;
		if (action != null) {
			cartBean = cartService.addProduct(action, id, session, cantidad);
		}
		return new ResponseEntity<>(cartBean, HttpStatus.OK);
	}

	@GetMapping("/carrito")
	public ResponseEntity<CartBean> getCarrito(HttpSession session) throws NotFoundException {
		log.debug("Inside carrito method");
		CartBean cart = cartService.getCarrito(session);
		return new ResponseEntity<>(cart, HttpStatus.OK);
	}

	@DeleteMapping("/carrito")
	public ResponseEntity<CartBean> vaciarCarrito(HttpSession session) throws NotFoundException {
		log.debug("Inside carrito method");
		cartService.vaciarCarrito(session);
		return new ResponseEntity<>(null, HttpStatus.OK);
	}

}
