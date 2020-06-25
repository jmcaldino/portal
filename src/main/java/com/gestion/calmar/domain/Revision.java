package com.gestion.calmar.domain;

import java.io.Serializable;
import java.time.ZonedDateTime;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "revision")
public class Revision implements Serializable {

	private static final long serialVersionUID = -1792858149665931839L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", unique = true, nullable = false)
	private Long id;

	@Column(name = "nombre", columnDefinition = "varchar(30)")
	@NotNull
	private String name;

	@Column(name = "comentario")
	private String comment;

	@Column(name = "email")
	private String email;

	@Column(name = "estrella", columnDefinition = "int default 3")
	private Integer star;

	@Column(name = "fecha", columnDefinition = "timestamp")
	private ZonedDateTime createDate;

	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "producto_fk", referencedColumnName = "id")
	private Producto producto;

	public Revision() {

	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	public Integer getStar() {
		return star;
	}

	public void setStar(Integer star) {
		this.star = star;
	}

	public ZonedDateTime getCreateDate() {
		return createDate;
	}

	public void setCreateDate(ZonedDateTime createDate) {
		this.createDate = createDate;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Producto getProducto() {
		return producto;
	}

	public void setProducto(Producto producto) {
		this.producto = producto;
	}

	@Override
	public String toString() {
		return "Revision [id=" + id + ", name=" + name + ", comment=" + comment + ", star=" + star + ", createDate="
				+ createDate + "]";
	}

}
