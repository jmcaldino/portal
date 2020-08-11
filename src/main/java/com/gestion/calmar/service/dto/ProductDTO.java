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

	@NotNull(message = "marca may not be null")
	private MarcaDTO marca;

	@NotNull(message = "categoria may not be null")
	private CategoriaDTO categoria;

	private String img;

	private Boolean isEnable;

	public ProductDTO() {
		super();
	}

	public ProductDTO(String name, String description, String img, Double price, Double newPrice, Integer stock,
			Boolean isNew, Boolean isRecommended, Boolean isEnable, Long marcaId, Long categoriaId) {
		this.setName(name);
		this.setDescription(description);
		this.setImg(img);
		this.setPrice(price);
		this.setNewPrice(newPrice);
		this.setStock(stock);
		this.setIsNew(isNew);
		this.setIsRecommended(isRecommended);
		this.setIsEnable(isEnable);
		this.marca = this.setMarca(marcaId, null, null);
		this.categoria = this.setCategoria(categoriaId, null, null);
	}

	public ProductDTO(Producto product) {
		this.setId(product.getId());
		this.setName(product.getName());
		this.setDescription(product.getDescription());
		this.setImg(product.getImg());
		this.setPrice(product.getPrice());
		this.setNewPrice(product.getNewPrice());
		this.setStock(product.getStock());
		this.setIsNew(product.getIsNew());
		this.setIsRecommended(product.getIsRecommended());
		this.setIsEnable(product.getIsEnable());
		MarcaDTO marca = this.setMarca(product.getMarca().getId(), product.getMarca().getName(),
				product.getMarca().getIsEnable());
		this.setMarca(marca);
		CategoriaDTO category = this.setCategoria(product.getCategoria().getId(), product.getCategoria().getName(),
				product.getCategoria().getIsEnable());
		this.setCategoria(category);
	}

	private MarcaDTO setMarca(Long id, String name, Boolean isEnable) {
		MarcaDTO marca = new MarcaDTO();
		marca.setId(id);
		marca.setName(name);
		marca.setIsEnable(isEnable);
		return marca;
	}

	private CategoriaDTO setCategoria(Long id, String name, Boolean isEnable) {
		CategoriaDTO category = new CategoriaDTO();
		category.setId(id);
		category.setName(name);
		category.setIsEnable(isEnable);
		return category;
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

	public MarcaDTO getMarca() {
		return marca;
	}

	public void setMarca(MarcaDTO marca) {
		this.marca = marca;
	}

	public CategoriaDTO getCategoria() {
		return categoria;
	}

	public void setCategoria(CategoriaDTO categoria) {
		this.categoria = categoria;
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
				+ isRecommended + ", marcaId=" + marca.getId() + ", categoriaId=" + categoria.getId() + ", img=" + img
				+ "]";
	}

}
