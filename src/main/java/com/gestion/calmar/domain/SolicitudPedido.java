package com.gestion.calmar.domain;

import java.io.Serializable;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.DynamicUpdate;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name = "solicitud_pedido")
@DynamicUpdate
public class SolicitudPedido extends AbstractAuditingEntity implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@JoinColumn(name = "cliente_fk", referencedColumnName = "id", nullable = false)
	private Cliente cliente;

	@Column(name = "codigo_pedido", nullable = true)
	private String codigoPedido;

	@NotNull
	@Column(name = "tipo_envio", nullable = false, columnDefinition = "varchar(30)")
	private String tipoEnvio;

	@NotNull
	@Column(name = "contactar_whatapp", columnDefinition = "bit default false", nullable = false)
	private Boolean contactarWhatapp;

	@NotNull
	@Column(name = "estado", nullable = false, columnDefinition = "varchar(30) default 'Pendiente'")
	private String estado;

	@Column(name = "mensaje", columnDefinition = "TEXT")
	private String mensaje;

	@OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "solicitudPedido")
	@JsonManagedReference
	private Set<SolicitudPedidoItem> items;

	@NotNull
	@Column(name = "total", columnDefinition = "DECIMAL(10, 2)")
	private Double total;

	public SolicitudPedido() {
		// default contructor
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTipoEnvio() {
		return tipoEnvio;
	}

	public void setTipoEnvio(String tipoEnvio) {
		this.tipoEnvio = tipoEnvio;
	}

	public Boolean getContactarWhatapp() {
		return contactarWhatapp;
	}

	public void setContactarWhatapp(Boolean contactarWhatapp) {
		this.contactarWhatapp = contactarWhatapp;
	}

	public String getEstado() {
		return estado;
	}

	public void setEstado(String estado) {
		this.estado = estado;
	}

	public String getMensaje() {
		return mensaje;
	}

	public void setMensaje(String mensaje) {
		this.mensaje = mensaje;
	}

	public Set<SolicitudPedidoItem> getItems() {
		return items;
	}

	public void setItems(Set<SolicitudPedidoItem> items) {
		this.items = items;
	}

	public Double getTotal() {
		return total;
	}

	public void setTotal(Double total) {
		this.total = total;
	}

	public Cliente getCliente() {
		return cliente;
	}

	public void setCliente(Cliente cliente) {
		this.cliente = cliente;
	}

	public String getCodigoPedido() {
		return codigoPedido;
	}

	public void setCodigoPedido(String codigoPedido) {
		this.codigoPedido = codigoPedido;
	}

}
