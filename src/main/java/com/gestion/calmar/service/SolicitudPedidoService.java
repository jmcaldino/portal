package com.gestion.calmar.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Random;
import java.util.Set;

import javax.naming.NotContextException;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.gestion.calmar.bean.CartBean;
import com.gestion.calmar.domain.Producto;
import com.gestion.calmar.domain.SolicitudPedido;
import com.gestion.calmar.domain.SolicitudPedidoItem;
import com.gestion.calmar.dto.SolicitudPedidoDTO;
import com.gestion.calmar.repository.SolicitudPedidoRepository;
import com.gestion.calmar.util.Constants;

import javassist.NotFoundException;

@Service
public class SolicitudPedidoService {

	private final Logger log = LoggerFactory.getLogger(this.getClass());

	@Autowired
	private SolicitudPedidoRepository solicitudPedidoRepo;

	@Autowired
	private ProductService productoService;

	@Autowired
	private CartService carritoService;

	@Autowired
	private MailService mailService;

	public void createBasicOrder(SolicitudPedidoDTO request, HttpSession session) {
		log.info("Solicitando pedido '{}'", request);
		SolicitudPedido pedido = this.crearPedido(request, session);
		log.info("Actualizando el codido de pedido. ID: '{}'", pedido.getId());
		pedido = this.crearCodigoDePedido(pedido);
		log.info("Enviando email.. ");
		this.sendEmail(pedido);
	}

	@Transactional
	private SolicitudPedido crearCodigoDePedido(SolicitudPedido pedido) {
		log.info("Generando numeros aleatorios");
		int leftLimit = 97; // letter 'a'
		int rightLimit = 122; // letter 'z'
		int targetStringLength = 3;
		Random random = new Random();

		String generatedString = random.ints(leftLimit, rightLimit + 1).limit(targetStringLength)
				.collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append).toString();
		String codigoDePedido = "P".concat(String.valueOf(pedido.getId()).concat("-").concat(generatedString))
				.toUpperCase();
		log.info("Codigo de pedido generado: '{}'", codigoDePedido);
		pedido.setCodigoPedido(codigoDePedido);
		log.info("Guardando el codigo '{}' en el pedido", codigoDePedido);
		log.info("Codigo de pedido Guardado.");
		return solicitudPedidoRepo.save(pedido);
	}

	private void sendEmail(SolicitudPedido pedido) {
		String[] emails = new String[2];
		emails[0] = pedido.getCliente().getEmail();
		emails[1] = "jmcaldino@gmail.com";

		String usuario = pedido.getCliente().getApellido().concat(", ").concat(pedido.getCliente().getNombre());
		mailService.sendCreationOrderEmail(usuario, pedido.getCodigoPedido(), emails);
	}

	@Transactional
	private SolicitudPedido crearPedido(SolicitudPedidoDTO request, HttpSession session) {
		SolicitudPedido pedido = request.toSolicitudPedido();
		log.info("Obteniendo carrito: '{}'", session);
		CartBean cart = carritoService.getCarrito(session);
		// Nuevos items
		Set<SolicitudPedidoItem> newItemsCart = new HashSet<SolicitudPedidoItem>();
		// IDs de productos seleccionados
		List<Long> ids = new ArrayList<Long>();
		cart.getItems().stream().forEach(p -> {
			ids.add(p.getProducto().getId());
		});
		// Buscamos los productos
		final Set<Producto> productos = productoService.getProductByIds(ids);
		// Lo metemos en un mapa con la clave ID, valor Producto
		Map<Long, Producto> mapProduct = new HashMap<Long, Producto>();
		productos.stream().forEach(p -> {
			mapProduct.put(p.getId(), p);
		});
		cart.getItems().forEach(sessionCart -> {
			// Asignamos y calculamos el subtotal
			Producto producto = null;
			if (mapProduct != null) {
				producto = mapProduct.get(sessionCart.getProducto().getId());
				SolicitudPedidoItem solicitudPedidoItem = new SolicitudPedidoItem(pedido.getId(), pedido,
						producto.getName(), producto.getId(), producto.getPrice(), producto.getNewPrice(),
						producto.getImg(), new Integer(sessionCart.getCantidad()),
						(producto.getPrice() * sessionCart.getCantidad()));
				solicitudPedidoItem.setSolicitudPedido(pedido);
				newItemsCart.add(solicitudPedidoItem);
			}
		});
		// Asignamos los items a la coleccion
		pedido.setItems(newItemsCart);
		// Calculamos el total a partir del subtotal
		double total = newItemsCart.stream().mapToDouble(f -> f.getSubTotal()).sum();
		pedido.setTotal(total);
		log.info("Se completo la carga de items... ");
		pedido.setEstado(Constants.STATUS_PENDING);
		return this.solicitudPedidoRepo.save(pedido);
	}

	public SolicitudPedido getPedido(Long id) {
		Optional<SolicitudPedido> solP = solicitudPedidoRepo.findById(id);
		if (solP.isPresent()) {
			return solP.get();
		} else {
			return null;
		}
	}

	@Transactional(readOnly = true)
	public SolicitudPedido getPedidoPorCodigoPedido(String orderCode) throws NotContextException {
		return solicitudPedidoRepo.findByCodigoPedidoEagerly(orderCode).orElse(null);
	}

	@Transactional(readOnly = true)
	public Page<SolicitudPedido> getAllPedidos(String orderCode, String dni, String date, String estado,
			Pageable pageable) {
		return solicitudPedidoRepo.getAllPedidos(orderCode, dni, estado, pageable);
	}

	@Transactional
	public void editBasicOrder(SolicitudPedidoDTO requestDTO, String codigo, String estado) throws Exception {
		SolicitudPedido pedidoEntity = this.solicitudPedidoRepo.findByCodigoPedidoEagerly(codigo)
				.orElseThrow(() -> new NotFoundException("Order not found - Code: ".concat(codigo)));
		this.processEditingOrder(pedidoEntity, requestDTO, estado);
	}

	private void processEditingOrder(SolicitudPedido pedidoEntity, SolicitudPedidoDTO requestDTO, String estado) {
		pedidoEntity.getCliente().setApellido((requestDTO.getLastName() != null) ? requestDTO.getLastName()
				: pedidoEntity.getCliente().getApellido());

		pedidoEntity.getCliente().setNombre((requestDTO.getFirstName() != null) ? requestDTO.getFirstName()
				: pedidoEntity.getCliente().getNombre());

		pedidoEntity.getCliente()
				.setDni((requestDTO.getDni() != null) ? requestDTO.getDni() : pedidoEntity.getCliente().getDni());

		pedidoEntity.getCliente().setEmail(
				(requestDTO.getEmail() != null) ? requestDTO.getEmail() : pedidoEntity.getCliente().getEmail());

		pedidoEntity.getCliente().setDomicilio(
				(requestDTO.getAddress() != null) ? requestDTO.getAddress() : pedidoEntity.getCliente().getDomicilio());

		pedidoEntity.getCliente()
				.setNumeroDeTelefono((requestDTO.getPhone().getNumber() != null) ? requestDTO.getPhone().getNumber()
						: pedidoEntity.getCliente().getNumeroDeTelefono());

		pedidoEntity.getCliente()
				.setTelefonoArea((requestDTO.getPhone().getArea() != null) ? requestDTO.getPhone().getArea()
						: pedidoEntity.getCliente().getTelefonoArea());

		pedidoEntity.getCliente().setCiudad(
				(requestDTO.getCity() != null) ? requestDTO.getCity() : pedidoEntity.getCliente().getCiudad());

		pedidoEntity.getCliente().setProvincia((requestDTO.getProvince() != null) ? requestDTO.getProvince()
				: pedidoEntity.getCliente().getProvincia());

		pedidoEntity.getCliente().setCodigoPostal((requestDTO.getPostalCode() != null) ? requestDTO.getPostalCode()
				: pedidoEntity.getCliente().getCodigoPostal());

		pedidoEntity
				.setTipoEnvio((requestDTO.getEnvio() != null) ? requestDTO.getEnvio() : pedidoEntity.getTipoEnvio());

		pedidoEntity.setEstado((estado != null) ? estado : pedidoEntity.getEstado());
		pedidoEntity
				.setContactarWhatapp((requestDTO.isContactMeByWhatsapp() != null) ? requestDTO.isContactMeByWhatsapp()
						: pedidoEntity.getContactarWhatapp());
		pedidoEntity.setMensaje(requestDTO.getMessage());
		this.solicitudPedidoRepo.save(pedidoEntity);
	}

}
