package com.gestion.calmar.service.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import com.gestion.calmar.domain.Producto;

/**
 * A DTO representing a product.
 */
public class ProductDTO {

	private Long id;

	@NotBlank
	private String name;

	private String description;

	@NotNull(message = "price may not be null")
	private Double price;

	private Double newPrice;

	private Integer stock;

	private Boolean isNew;

	private Boolean isRecommended;

	@NotNull(message = "marcaId may not be null")
	private Long marcaId;

	@NotNull(message = "categoriaId may not be null")
	private Long categoriaId;

	private String img;

	private Boolean isEnable;

	public ProductDTO() {
		super();
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

	public Double getNewPrice() {
		return newPrice;
	}

	public void setNewPrice(Double newPrice) {
		this.newPrice = newPrice;
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

	public Long getMarcaId() {
		return marcaId;
	}

	public void setMarcaId(Long marcaId) {
		this.marcaId = marcaId;
	}

	public Long getCategoriaId() {
		return categoriaId;
	}

	public void setCategoriaId(Long categoriaId) {
		this.categoriaId = categoriaId;
	}

	public String getImg() {
		return img;
	}

	public void setImg(String img) {
		this.img = img;
	}

	public Boolean getIsEnable() {
		return isEnable;
	}

	public void setIsEnable(Boolean isEnable) {
		this.isEnable = isEnable;
	}

	public Producto toProductBasicEntity() {
		Producto productEntity = new Producto();
		productEntity.setName(this.getName());
		productEntity.setDescription(this.getDescription());
		productEntity.setImg(this.getImg());
		productEntity.setIsEnable(this.getIsEnable());
		productEntity.setIsNew(this.getIsNew());
		productEntity.setIsRecommended(this.getIsRecommended());
		productEntity.setPrice(this.getPrice());
		productEntity.setNewPrice(this.getNewPrice());
		productEntity.setStock(this.getStock());
		return productEntity;
	}

	@Override
	public String toString() {
		return "ProductDTO [id=" + id + ", name=" + name + ", description=" + description + ", price=" + price
				+ ", newPrice=" + newPrice + ", stock=" + stock + ", isNew=" + isNew + ", isRecommended="
				+ isRecommended + ", marcaId=" + marcaId + ", categoriaId=" + categoriaId + ", img=" + img + "]";
	}

}
