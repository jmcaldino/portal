package com.gestion.calmar.service;

import java.io.File;

import org.springframework.web.multipart.MultipartFile;

public interface StorageService {

	public String upload(MultipartFile file) throws Exception;

	boolean delete(String path) throws Exception;

	File readFile(String path) throws Exception;

	byte[] readBytes(String absolutePath) throws Exception;

}
