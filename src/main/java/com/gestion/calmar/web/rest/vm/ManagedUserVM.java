package com.gestion.calmar.web.rest.vm;

import javax.validation.constraints.Size;

import com.gestion.calmar.domain.User;
import com.gestion.calmar.service.dto.UserDTO;

/**
 * View Model extending the UserDTO, which is meant to be used in the user
 * management UI.
 */
public class ManagedUserVM extends UserDTO {

	public static final int PASSWORD_MIN_LENGTH = 4;

	public static final int PASSWORD_MAX_LENGTH = 100;

	@Size(min = PASSWORD_MIN_LENGTH, max = PASSWORD_MAX_LENGTH)
	private String password;

	public ManagedUserVM() {
		// Empty constructor needed for Jackson.
	}

	public ManagedUserVM(User user) {
		super(user);
		this.setId(user.getId());
		this.setCreatedBy(user.getCreatedBy());
		this.setCreatedDate(user.getCreatedDate());
		this.setLastModifiedBy(user.getLastModifiedBy());
		this.setLastModifiedDate(user.getLastModifiedDate());
		this.password = null;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	// prettier-ignore
	@Override
	public String toString() {
		return "ManagedUserVM{" + super.toString() + "} ";
	}
}
