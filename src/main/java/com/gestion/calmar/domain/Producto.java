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
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.Check;

@Entity
@Table(name = "producto")
@Check(constraints = "precio > precio_nuevo")
public class Producto extends AbstractAuditingEntity implements Serializable {

	private static final long serialVersionUID = 365799170906643456L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", unique = true, nullable = false)
	private Long id;

	@NotNull
	@Column(name = "nombre", columnDefinition = "varchar(100)", unique = true, nullable = false)
	private String name;

	@Column(name = "descripcion")
	private String description;

	@NotNull
	@Column(name = "precio", columnDefinition = "DECIMAL(10, 2)")
	private Double price;

	@Column(name = "precio_nuevo", columnDefinition = "DECIMAL(10, 2)")
	private Double newPrice;

	@Column(name = "stock")
	private Integer stock;

	@Column(name = "nuevo", columnDefinition = "bit default true")
	private Boolean isNew = true;

	@Column(name = "recomendado", columnDefinition = "bit default false")
	private Boolean isRecommended = true;

	@Column(name = "visible", columnDefinition = "bit default true")
	private Boolean isEnable = true;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "marca_fk", referencedColumnName = "id", nullable = false)
	private Marca marca;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "categoria_fk", referencedColumnName = "id", nullable = false)
	private Category categoria;

	@OneToOne(mappedBy = "producto")
	private Revision revision;

	@Column(name = "imagen", columnDefinition = "varchar(100) default 'demo.png'")
	private String img;

	public Producto() {
		super();
	}

	public Producto(String name, String description, @NotNull Double price, Double newPrice, Integer stock,
			Boolean isNew, Boolean isRecommended, Boolean isEnable, Marca marca, Category categoria, String img) {
		super();
		this.setName(name);
		this.description = description;
		this.price = price;
		this.newPrice = newPrice;
		this.stock = stock;
		this.isNew = isNew;
		this.isRecommended = isRecommended;
		this.isEnable = isEnable;
		this.marca = marca;
		this.categoria = categoria;
		this.img = img;
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

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Double getPrice() {
		return price;
	}

	public void setPrice(Double price) {
		this.price = price;
	}

	public Integer getStock() {
		return stock;
	}

	public void setStock(Integer stock) {
		this.stock = stock;
	}

	public Boolean getIsNew() {
		return isNew;
	}

	public void setIsNew(Boolean isNew) {
		this.isNew = isNew;
	}

	public Boolean getIsRecommended() {
		return isRecommended;
	}

	public void setIsRecommended(Boolean isRecommended) {
		this.isRecommended = isRecommended;
	}

	public Boolean getIsEnable() {
		return isEnable;
	}

	public void setIsEnable(Boolean isEnable) {
		this.isEnable = isEnable;
	}

	public Marca getMarca() {
		return marca;
	}

	public void setMarca(Marca marca) {
		this.marca = marca;
	}

	public Double getNewPrice() {
		return newPrice;
	}

	public void setNewPrice(Double newPrice) {
		this.newPrice = newPrice;
	}

	public Category getCategoria() {
		return categoria;
	}

	public void setCategoria(Category categoria) {
		this.categoria = categoria;
	}

	public Revision getRevision() {
		return revision;
	}

	public void setRevision(Revision revision) {
		this.revision = revision;
	}

	public String getImg() {
		return img;
	}

	public void setImg(String img) {
		this.img = img;
	}

	@Override
	public String toString() {
		return "Producto [id=" + id + ", name=" + name + ", description=" + description + ", price=" + price
				+ ", stock=" + stock + ", isNew=" + isNew + ", isRecommended=" + isRecommended + ", isEnable="
				+ isEnable + "]";
	}

}
