package com.gestion.calmar.dto;

import com.gestion.calmar.domain.Cliente;
import com.gestion.calmar.domain.SolicitudPedido;

public class SolicitudPedidoDTO {

	private String firstName;
	private String lastName;
	private String dni;
	private String province;
	private String city;
	private String postalCode;
	private String address;
	private String email;
	private String envio;
	private PhoneDTO phone;
	private Boolean contactMeByWhatsapp;
	private String message;

	public String getProvince() {
		return province;
	}

	public void setProvince(String province) {
		this.province = province;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getPostalCode() {
		return postalCode;
	}

	public void setPostalCode(String postalCode) {
		this.postalCode = postalCode;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getEnvio() {
		return envio;
	}

	public void setEnvio(String envio) {
		this.envio = envio;
	}

	public PhoneDTO getPhone() {
		return phone;
	}

	public void setPhone(PhoneDTO phone) {
		this.phone = phone;
	}

	public Boolean isContactMeByWhatsapp() {
		return contactMeByWhatsapp;
	}

	public void setContactMeByWhatsapp(boolean contactMeByWhatsapp) {
		this.contactMeByWhatsapp = contactMeByWhatsapp;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getDni() {
		return dni;
	}

	public void setDni(String dni) {
		this.dni = dni;
	}

	public SolicitudPedido toSolicitudPedido() {
		SolicitudPedido solP = new SolicitudPedido();

		Cliente cliente = new Cliente();
		cliente.setNombre(this.firstName);
		cliente.setApellido(this.lastName);
		cliente.setProvincia(this.province);
		cliente.setCiudad(this.city.toUpperCase());
		cliente.setCodigoPostal(this.postalCode);
		cliente.setDomicilio(this.address);
		cliente.setEmail(this.email);
		cliente.setNumeroDeTelefono(this.phone.getNumber());
		cliente.setTelefonoArea(this.phone.getArea());
		cliente.setDni(this.dni);
		solP.setCliente(cliente);

		solP.setTipoEnvio(this.envio);
		solP.setContactarWhatapp(this.contactMeByWhatsapp);
		solP.setMensaje(this.message);
		return solP;
	}

	@Override
	public String toString() {
		return "SolicitudPedidoDTO [firstName=" + firstName + ", lastName=" + lastName + ", dni=" + dni + ", province="
				+ province + ", city=" + city + ", postalCode=" + postalCode + ", address=" + address + ", email="
				+ email + ", envio=" + envio + ", phone=" + phone + ", contactMeByWhatsapp=" + contactMeByWhatsapp
				+ ", message=" + message + "]";
	}

}
