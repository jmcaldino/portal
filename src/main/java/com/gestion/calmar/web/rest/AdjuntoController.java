package com.gestion.calmar.web.rest;

import java.net.URI;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.gestion.calmar.security.AuthoritiesConstants;
import com.gestion.calmar.service.StorageService;
import com.gestion.calmar.web.rest.util.ApiSwaggerConstants;

import io.github.jhipster.web.util.HeaderUtil;
import io.swagger.annotations.Api;

@RestController
@Api(tags = ApiSwaggerConstants.API_ADJUNTO_TAG)
@RequestMapping("/api")
public class AdjuntoController {

	private final Logger log = LoggerFactory.getLogger(this.getClass());

	private static final String ENTITY_NAME = "adjuntoEntity";

	@Autowired
	private StorageService storageService;

	/**
	 * POST /adjunto/file
	 * 
	 * Crea un nuevo archivo.
	 * 
	 * @param adjuntoNuevo el archivo a crear.
	 * @return ResponseEntity con status code 201 (Created) y el nuevo a en el boby,
	 *         o con status code 400 (Bad Request).
	 *
	 */

	@RequestMapping(value = "/adjunto/upload", method = RequestMethod.POST)
	@PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.ADMIN + "\")")
	public @ResponseBody ResponseEntity<?> crearAdjunto(@RequestParam("file") MultipartFile file) {
		log.debug("REST request to save file named : {}", file.getOriginalFilename());

		try {
			log.debug("############ CONTENT TYPE: " + file.getContentType());
//			if (!categoria.hasMime(file.getContentType())) {
//				throw new BusinessException("Sólo se aceptan archivos " + categoria.getMessage());
//			}
//			Adjunto adjunto = storageService.upload(file);
			String attachmentPath = storageService.upload(file);
			log.debug(attachmentPath);
			return ResponseEntity.created(new URI("/adjunto/upload" + file.getName()))
					.headers(HeaderUtil.createAlert(ENTITY_NAME, "userManagement.created", file.getName())).body(null);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, false,
					"adjuntoManagement", "adjuntoexists", "Adjunto already in use")).body(null);
		}
	}

	@RequestMapping(value = "/adjunto/submit", method = RequestMethod.POST)
	@PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.ADMIN + "\")")
	public @ResponseBody ResponseEntity<?> crearAdjunto(@RequestParam("file") MultipartFile file,
			@RequestParam String name, @RequestParam String email) {
		log.debug("REST request to save file named : {}", file.getOriginalFilename() + ", name: " + name);

		try {
			log.debug("############ CONTENT TYPE: " + file.getContentType());
//			if (!categoria.hasMime(file.getContentType())) {
//				throw new BusinessException("Sólo se aceptan archivos " + categoria.getMessage());
//			}
//			Adjunto adjunto = storageService.upload(file);
			String attachmentPath = storageService.upload(file);
			log.debug(attachmentPath);
			return ResponseEntity.created(new URI("/adjunto/upload" + file.getName()))
					.headers(HeaderUtil.createAlert(ENTITY_NAME, "userManagement.created", file.getName())).body(null);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, false,
					"adjuntoManagement", "adjuntoexists", "Adjunto already in use")).body(null);
		}
	}
}
