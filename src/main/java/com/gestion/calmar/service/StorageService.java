package com.gestion.calmar.service;

import java.io.File;
import java.io.IOException;
import java.nio.file.FileSystems;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
@Transactional
public class StorageService {

	private final Logger log = LoggerFactory.getLogger(this.getClass());

	public static final String SEPARATOR = FileSystems.getDefault().getSeparator();
	private static final String UPLOAD_DIR = "src" + SEPARATOR + "main" + SEPARATOR + "webapp" + SEPARATOR + "assets"
			+ SEPARATOR + "img" + SEPARATOR + "productos";
	private static final String NOT_ALLOWED_REGEX = "[#]";

	private static final String[] ALLOWED_CONTENT_TYPES = { "application/pdf", "image/jpeg", "image/jpg", "image/pjpeg",
			"image/bmp", "image/x-windows-bmp", "image/gif", "image/png", "text/plain",
			"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" };

	public static String getUploadDirectory() {
		return getFileServer() + SEPARATOR + getUploadFolder() + SEPARATOR;
	}

	private String uploadFile(byte[] bytes, String originalName) throws Exception {
		String relativePath = (new Date()).getTime() + "_" + originalName.replaceAll(NOT_ALLOWED_REGEX, "");
		try {
			log.debug("Path(String): " + relativePath);
			Path path = Paths.get(getUploadDirectory() + relativePath);
			log.debug("Path(Path): " + path.toString());
			Files.write(path, bytes);
		} catch (IOException e) {
			e.printStackTrace();
			throw new Exception("No se puede escribir el archivo");

		}
		return relativePath;
	}

	public String upload(MultipartFile file) throws Exception {
		log.info("vamos a guardar en" + getUploadDirectory());
		if (!Arrays.asList(ALLOWED_CONTENT_TYPES).contains(file.getContentType())) {
			throw new Exception("No se puede subir este tipo de archivo");
		}

		try {
			byte[] bytes = file.getBytes();
			String absolutePath = uploadFile(bytes, file.getOriginalFilename());
			return absolutePath;
		} catch (Exception e) {
			e.printStackTrace();
			throw new Exception("Se produjo un error al guardar el archivo en el disco");
		}

	}

	public boolean delete(String path) throws Exception {
		// TODO Auto-generated method stub
		return false;
	}

	public File readFile(String path) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

	public byte[] readBytes(String absolutePath) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

	private static String getFileServer() {
		String devPath = Paths.get(".").toAbsolutePath().normalize().toString();
		String fileName = System.getProperty("sprbun.file_upload_server");
		if (fileName != null && !fileName.isEmpty()) {
			return fileName;
		}
		return devPath;
	}

	private static String getUploadFolder() {
		String fileName = System.getProperty("sprbun.file_upload_folder");
		if (fileName != null && !fileName.isEmpty()) {
			return fileName;
		}
		return UPLOAD_DIR;
	}

}
