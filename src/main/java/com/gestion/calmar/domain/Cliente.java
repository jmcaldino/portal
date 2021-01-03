package com.gestion.calmar.domain;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "cliente")
public class Cliente implements Serializable {

	private static final long serialVersionUID = 5138313659248756682L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotNull
	@Column(name = "nombre", nullable = false, columnDefinition = "varchar(40)")
	private String nombre;

	@NotNull
	@Column(name = "apellido", nullable = false, columnDefinition = "varchar(40)")
	private String apellido;

	@NotNull
	@Column(name = "dni", nullable = false, columnDefinition = "varchar(20)")
	private String dni;

	@NotNull
	@Column(name = "provincia", nullable = false, columnDefinition = "varchar(60)")
	private String provincia;

	@NotNull
	@Column(name = "ciudad", nullable = false, columnDefinition = "varchar(60)")
	private String ciudad;

	@NotNull
	@Column(name = "domicilio", nullable = false, columnDefinition = "varchar(80)")
	private String domicilio;

	@NotNull
	@Column(name = "codigo_postal", nullable = false, columnDefinition = "varchar(10)")
	private String codigoPostal;

	@NotNull
	@Column(name = "email", nullable = false, columnDefinition = "varchar(100)")
	private String email;

	@NotNull
	@Column(name = "telefono_area", nullable = false, columnDefinition = "varchar(10)")
	private String telefonoArea;

	@NotNull
	@Column(name = "telefono_numero", nullable = false, columnDefinition = "varchar(30)")
	private String numeroDeTelefono;

	@OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "cliente")
	private List<SolicitudPedido> pedidos;

	public Cliente() {
		// default constructor
	}

	public Cliente(String nombre, String apellido, String dni, String provincia, String ciudad, String codigoPostal,
			String email, String telefonoArea, String numeroDeTelefono, String domicilio,
			SolicitudPedido solicitudPedido) {
		this.nombre = nombre;
		this.apellido = apellido;
		this.dni = dni;
		this.provincia = provincia;
		this.ciudad = ciudad;
		this.codigoPostal = codigoPostal;
		this.email = email;
		this.telefonoArea = telefonoArea;
		this.numeroDeTelefono = numeroDeTelefono;
		this.domicilio = domicilio;
		if (this.pedidos != null) {
			this.pedidos.add(solicitudPedido);
		} else {
			this.setPedidos(new ArrayList<SolicitudPedido>());
			this.getPedidos().add(solicitudPedido);
		}
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getApellido() {
		return apellido;
	}

	public void setApellido(String apellido) {
		this.apellido = apellido;
	}

	public String getDni() {
		return dni;
	}

	public void setDni(String dni) {
		this.dni = dni;
	}

	public String getProvincia() {
		return provincia;
	}

	public void setProvincia(String provincia) {
		this.provincia = provincia;
	}

	public String getCiudad() {
		return ciudad;
	}

	public void setCiudad(String ciudad) {
		this.ciudad = ciudad;
	}

	public String getCodigoPostal() {
		return codigoPostal;
	}

	public void setCodigoPostal(String codigoPostal) {
		this.codigoPostal = codigoPostal;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getTelefonoArea() {
		return telefonoArea;
	}

	public void setTelefonoArea(String telefonoArea) {
		this.telefonoArea = telefonoArea;
	}

	public String getNumeroDeTelefono() {
		return numeroDeTelefono;
	}

	public void setNumeroDeTelefono(String numeroDeTelefono) {
		this.numeroDeTelefono = numeroDeTelefono;
	}

	public List<SolicitudPedido> getPedidos() {
		return pedidos;
	}

	public void setPedidos(List<SolicitudPedido> pedidos) {
		this.pedidos = pedidos;
	}

	public String getDomicilio() {
		return domicilio;
	}

	public void setDomicilio(String domicilio) {
		this.domicilio = domicilio;
	}

}
