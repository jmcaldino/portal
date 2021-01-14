package com.gestion.calmar.service;

import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.Locale;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.MessageSource;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring5.SpringTemplateEngine;

import com.gestion.calmar.domain.User;

import io.github.jhipster.config.JHipsterProperties;

/**
 * Service for sending emails.
 * <p>
 * We use the {@link Async} annotation to send emails asynchronously.
 */
@Service
public class MailService {

	private final Logger log = LoggerFactory.getLogger(MailService.class);

	private static final String CODIGO_DE_PRODUCTO = "codProducto";

	private static final String CLIENTE = "cliente";

	private static final String USER = "user";

	private static final String BASE_URL = "baseUrl";

	private final JHipsterProperties jHipsterProperties;

	private final JavaMailSender javaMailSender;

	private final MessageSource messageSource;

	private final SpringTemplateEngine templateEngine;

	public MailService(JHipsterProperties jHipsterProperties, JavaMailSender javaMailSender,
			MessageSource messageSource, SpringTemplateEngine templateEngine) {

		this.jHipsterProperties = jHipsterProperties;
		this.javaMailSender = javaMailSender;
		this.messageSource = messageSource;
		this.templateEngine = templateEngine;
	}

	@Async
	public void sendEmail(String to, String subject, String content, boolean isMultipart, boolean isHtml) {
		log.debug("Send email[multipart '{}' and html '{}'] to '{}' with subject '{}' and content={}", isMultipart,
				isHtml, to, subject, content);

		// Prepare message using a Spring helper
		MimeMessage mimeMessage = javaMailSender.createMimeMessage();
		try {
			MimeMessageHelper message = new MimeMessageHelper(mimeMessage, isMultipart, StandardCharsets.UTF_8.name());
			message.setTo(to);
			message.setFrom(jHipsterProperties.getMail().getFrom());
			message.setSubject(subject);
			message.setText(content, isHtml);
			javaMailSender.send(mimeMessage);
			log.debug("Sent email to User '{}'", to);
		} catch (MailException | MessagingException e) {
			log.warn("Email could not be sent to user '{}'", to, e);
		}
	}

	@Async
	public void sendEmail(String[] to, String subject, String content, boolean isMultipart, boolean isHtml) {
		log.debug("Send email[multipart '{}' and html '{}'] to '{}' with subject '{}' and content={}", isMultipart,
				isHtml, to, subject, content);

		// Prepare message using a Spring helper
		MimeMessage mimeMessage = javaMailSender.createMimeMessage();
		try {
			MimeMessageHelper message = new MimeMessageHelper(mimeMessage, isMultipart, StandardCharsets.UTF_8.name());
			message.setTo(to);
			message.setFrom(jHipsterProperties.getMail().getFrom());
			message.setSubject(subject);
			message.setText(content, isHtml);
			javaMailSender.send(mimeMessage);
			log.debug("Sent email to User '{}'", Arrays.toString(to));
		} catch (MailException | MessagingException e) {
			log.warn("Email could not be sent to user '{}'", to, e);
		}
	}

	@Async
	public void sendEmailFromTemplate(User user, String templateName, String titleKey) {
		if (user.getEmail() == null) {
			log.debug("Email doesn't exist for user '{}'", user.getLogin());
			return;
		}
		Locale locale = Locale.forLanguageTag(user.getLangKey());
		Context context = new Context(locale);
		context.setVariable(USER, user);
		context.setVariable(BASE_URL, jHipsterProperties.getMail().getBaseUrl());
		String content = templateEngine.process(templateName, context);
		String subject = messageSource.getMessage(titleKey, null, locale);
		sendEmail(user.getEmail(), subject, content, false, true);
	}

	@Async
	public void sendActivationEmail(User user) {
		log.debug("Sending activation email to '{}'", user.getEmail());
		sendEmailFromTemplate(user, "mail/activationEmail", "email.activation.title");
	}

	@Async
	public void sendCreationEmail(User user) {
		log.debug("Sending creation email to '{}'", user.getEmail());
		sendEmailFromTemplate(user, "mail/creationEmail", "email.activation.title");
	}

	@Async
	public void sendPasswordResetMail(User user) {
		log.debug("Sending password reset email to '{}'", user.getEmail());
		sendEmailFromTemplate(user, "mail/passwordResetEmail", "email.reset.title");
	}

	@Async
	public void sendCreationOrderEmail(String usuario, String codigoProducto, String[] recipients) {
		log.debug("Sending request order to codigo Producto: '{}'", codigoProducto);

		Locale locale = Locale.forLanguageTag("es");
		Context context = new Context(locale);
		context.setVariable(CLIENTE, usuario);
		context.setVariable(CODIGO_DE_PRODUCTO, codigoProducto);
		context.setVariable(BASE_URL, jHipsterProperties.getMail().getBaseUrl());
		String content = templateEngine.process("mail/requestOrderEmail", context);
		String subject = "Solicitud de compra Calmar";
		sendEmail(recipients, subject, content, false, true);
	}

//	public void sendCreationOrderEmail(SolicitudPedido pedido) {
//		log.debug("Sending request order to '{}'", pedido);
//		CartBean cart = new CartBean();
//		cart.setTotal(pedido.getTotal());
//
//		List<Item> items = new ArrayList<Item>();
//
//		pedido.getItems().forEach(p -> {
//			ProductDTO product = new ProductDTO();
//			product.setName(p.getNombreDeProducto());
//			product.setPrice(p.getPrecioDeCompra());
//			Item item = new Item();
//			item.setProducto(product);
//			item.setCantidad(p.getCantidad());
//			items.add(item);
//		});
//		cart.setItems(items);
//
//		Locale locale = Locale.forLanguageTag("es");
//		Context context = new Context(locale);
//		context.setVariable(CLIENTE, pedido.getUsuario());
//		context.setVariable(CART, cart);
//		context.setVariable(BASE_URL, jHipsterProperties.getMail().getBaseUrl());
//		String content = templateEngine.process("mail/requestOrderEmail", context);
//		String subject = "Solicitud de compra Calmar";
//		sendEmail(pedido.getEmail(), subject, content, false, true);
//	}

}
