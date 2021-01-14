package com.gestion.calmar.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "solicitud_pedido_item")
public class SolicitudPedidoItem implements Serializable {

	private static final long serialVersionUID = -9028916891044212546L;

	@Id
	@Column(name = "id", updatable = false, nullable = false)
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "solicitud_pedido_fk", referencedColumnName = "id", nullable = false)
	@JsonBackReference
	private SolicitudPedido solicitudPedido;

	@NotNull
	@Column(name = "nombre_de_producto", nullable = false)
	private String nombreDeProducto;

	@NotNull
	@Column(name = "producto_id", nullable = false)
	private Long productoId;

	@NotNull
	@Column(name = "precio_de_compra", nullable = false, columnDefinition = "DECIMAL(10, 2)")
	private Double precioDeCompra;

	@Column(name = "precio_nuevo", nullable = true, columnDefinition = "DECIMAL(10, 2)")
	private Double precioNuevo;

	@Column(name = "sub_total", nullable = true, columnDefinition = "DECIMAL(10, 2)")
	private Double subTotal;

	@NotNull
	@Column(name = "imagen", nullable = false)
	private String imagen;

	@NotNull
	@Column(name = "cantidad", nullable = false)
	private Integer cantidad;

	public SolicitudPedidoItem() {
		// default constructor
	}

	public SolicitudPedidoItem(Long id, SolicitudPedido solicitudPedido, @NotNull String nombreDeProducto,
			@NotNull Long productoId, @NotNull Double precioDeCompra, Double precioNuevo, @NotNull String imagen,
			@NotNull Integer cantidad, Double subtotal) {
		this.id = id;
		this.solicitudPedido = solicitudPedido;
		this.nombreDeProducto = nombreDeProducto;
		this.productoId = productoId;
		this.precioDeCompra = precioDeCompra;
		this.precioNuevo = precioNuevo;
		this.imagen = imagen;
		this.cantidad = cantidad;
		this.subTotal = subtotal;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public SolicitudPedido getSolicitudPedido() {
		return solicitudPedido;
	}

	public void setSolicitudPedido(SolicitudPedido solicitudPedido) {
		this.solicitudPedido = solicitudPedido;
	}

	public Integer getCantidad() {
		return cantidad;
	}

	public void setCantidad(Integer cantidad) {
		this.cantidad = cantidad;
	}

	public String getNombreDeProducto() {
		return nombreDeProducto;
	}

	public void setNombreDeProducto(String nombreDeProducto) {
		this.nombreDeProducto = nombreDeProducto;
	}

	public Long getProductoId() {
		return productoId;
	}

	public void setProductoId(Long productoId) {
		this.productoId = productoId;
	}

	public Double getPrecioDeCompra() {
		return precioDeCompra;
	}

	public void setPrecioDeCompra(Double precioDeCompra) {
		this.precioDeCompra = precioDeCompra;
	}

	public Double getPrecioNuevo() {
		return precioNuevo;
	}

	public void setPrecioNuevo(Double precioNuevo) {
		this.precioNuevo = precioNuevo;
	}

	public String getImagen() {
		return imagen;
	}

	public void setImagen(String imagen) {
		this.imagen = imagen;
	}

	public Double getSubTotal() {
		return subTotal;
	}

	public void setSubTotal(Double subTotal) {
		this.subTotal = subTotal;
	}

	@Override
	public String toString() {
		return "SolicitudPedidoItem [id=" + id + ", solicitudPedido=" + solicitudPedido + ", nombreDeProducto="
				+ nombreDeProducto + ", productoId=" + productoId + ", precioDeCompra=" + precioDeCompra
				+ ", precioNuevo=" + precioNuevo + ", subTotal=" + subTotal + ", imagen=" + imagen + ", cantidad="
				+ cantidad + "]";
	}
}
