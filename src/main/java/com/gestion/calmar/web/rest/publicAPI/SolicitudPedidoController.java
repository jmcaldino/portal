package com.gestion.calmar.web.rest.publicAPI;

import java.net.URI;
import java.net.URISyntaxException;

import javax.naming.NotContextException;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gestion.calmar.domain.SolicitudPedido;
import com.gestion.calmar.dto.SolicitudPedidoDTO;
import com.gestion.calmar.service.SolicitudPedidoService;

import io.github.jhipster.web.util.HeaderUtil;
import javassist.NotFoundException;

@RestController
@RequestMapping("/public-api")
public class SolicitudPedidoController {

	private final Logger log = LoggerFactory.getLogger(this.getClass());

	@Autowired
	private SolicitudPedidoService solicitudPedidoService;

	@PostMapping("/pedidos")
	public ResponseEntity<?> createBasicOrder(@RequestBody SolicitudPedidoDTO pedido, HttpSession session)
			throws URISyntaxException, NotFoundException {
		log.debug("REST request to save createBasicOrder : {}", pedido);

		solicitudPedidoService.createBasicOrder(pedido, session);
		return ResponseEntity.created(new URI("/api/productos"))
				.headers(HeaderUtil.createAlert("productManagement", "productManagement.created", "algo")).body(null);
	}

	@GetMapping("/pedidos/{orderCode}")
	public ResponseEntity<?> getBasicOrder(@PathVariable(name = "orderCode") String orderCode)
			throws URISyntaxException, NotFoundException {
		log.debug("REST request to get BasicOrder Codigo de Pedido: {}", orderCode);

		SolicitudPedido pedido;
		try {
			pedido = solicitudPedidoService.getPedidoPorCodigoPedido(orderCode);
			return new ResponseEntity<>(pedido, HttpStatus.OK);
		} catch (NotContextException e) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
	}

}
