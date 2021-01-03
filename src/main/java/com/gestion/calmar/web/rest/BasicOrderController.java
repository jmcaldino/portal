package com.gestion.calmar.web.rest;

import java.net.URI;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.gestion.calmar.domain.SolicitudPedido;
import com.gestion.calmar.dto.SolicitudPedidoDTO;
import com.gestion.calmar.security.AuthoritiesConstants;
import com.gestion.calmar.service.SolicitudPedidoService;

import io.github.jhipster.web.util.PaginationUtil;
import io.swagger.annotations.ApiParam;

@RestController
@RequestMapping("/api")
public class BasicOrderController {

	private final Logger log = LoggerFactory.getLogger(BasicOrderController.class);

	@Autowired
	private SolicitudPedidoService solicitudPedidoService;

	@GetMapping("/ordenes")
	@PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.ADMIN + "\")")
	public ResponseEntity<Page<SolicitudPedido>> getAllOrdenes(@RequestParam(required = false) String orderCode,
			@RequestParam(required = false) String dni, @RequestParam(required = false) String date,
			@RequestParam(required = false) String estado, @ApiParam Pageable pageable) {
		log.info("Inside getAllProducts method...");
		Page<SolicitudPedido> pageProduct = solicitudPedidoService.getAllPedidos(orderCode, dni, null, estado,
				pageable);
		HttpHeaders headers = PaginationUtil
				.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), pageProduct);
		log.info("Exit getAllProducts method...");
		return new ResponseEntity<>(pageProduct, headers, HttpStatus.OK);
	}

	@PutMapping("/ordenes/{codigo}")
	@PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.ADMIN + "\")")
	public ResponseEntity<?> editBasicOrder(@RequestBody SolicitudPedidoDTO pedido,
			@PathVariable(name = "codigo") String codigo, @RequestParam(name = "estado") String estado)
			throws Exception {
		log.debug("REST request to save createBasicOrder : {}", pedido);

		solicitudPedidoService.editBasicOrder(pedido, codigo, estado);
		return ResponseEntity.ok(new URI("/orden/".concat(codigo)));
	}

}
