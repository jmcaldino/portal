package com.gestion.calmar.service.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

public class CategoriaDTO {

	@NotNull(message = "categoriaId may not be null")
	private Long id;

	@NotBlank
	private String name;

	private Boolean isEnable;

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

	public Boolean getIsEnable() {
		return isEnable;
	}

	public void setIsEnable(Boolean isEnable) {
		this.isEnable = isEnable;
	}

	@Override
	public String toString() {
		return "CategoriaDTO [id=" + id + ", name=" + name + ", isEnable=" + isEnable + "]";
	}

}
