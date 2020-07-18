package com.gestion.calmar.service;

import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.gestion.calmar.domain.Category;
import com.gestion.calmar.domain.Marca;
import com.gestion.calmar.domain.Producto;
import com.gestion.calmar.repository.ProductRepository;
import com.gestion.calmar.service.dto.ProductDTO;
import com.gestion.calmar.util.Constants;

import javassist.NotFoundException;

@Service
public class ProductService {

	private final Logger log = LoggerFactory.getLogger(this.getClass());

	@Autowired
	private ProductRepository productRepository;

	@Autowired
	private CategoryService categoryService;

	@Autowired
	private MarcaService marcaService;

	@Autowired
	private StorageService storageService;

	public static final String ATTACH_PATH_PRODUCT = "assets/img/productos";

	@Transactional
	private void saveProduct(ProductDTO product) throws NotFoundException {
		Producto newProd = product.toProductBasicEntity();
		final Category category = categoryService.getCategory(product.getCategoriaId());
		newProd.setCategoria(category);
		final Marca marca = marcaService.getMarca(product.getMarcaId());
		newProd.setMarca(marca);
		// TODO falta la clase revisión
		productRepository.save(newProd);
	}

	@Transactional
	public Page<Producto> listProductPage(Pageable pageable) {
		Page<Producto> products = productRepository.findAll(pageable);
		return products;
	}

	@Transactional(readOnly = true)
	public Optional<Producto> getByName(String prodName) {
		return productRepository.findOneByName(prodName);
	}

	private ProductDTO toProduct(String name, String description, String img, Double price, Double newPrice,
			Integer stock, Boolean isNew, Boolean isRecommended, Boolean isEnable, Long marcaId, Long categoriaId) {
		ProductDTO product = new ProductDTO();
		product.setName(name);
		product.setDescription(description);
		product.setImg(img);
		product.setPrice(price);
		product.setNewPrice(newPrice);
		product.setStock(stock);
		product.setIsNew(isNew);
		product.setIsRecommended(isRecommended);
		product.setIsEnable(isEnable);
		product.setMarcaId(marcaId);
		product.setCategoriaId(categoriaId);
		return product;
	}

	public void createProduct(String name, String description, MultipartFile file, Double price, Double newPrice,
			Integer stock, Boolean isNew, Boolean isRecommended, Boolean isEnable, Long marcaId, Long categoriaId) {
		log.info("CreateProduct method -> Param { name: " + name + ", description: " + description + ", file: " + file
				+ ", price: " + price + ", newPrice: " + newPrice + ", stock: " + stock + ", isNew: " + isNew
				+ ", isRecommended: " + isRecommended + ", isEnable: " + isEnable + ", marcaId: " + marcaId
				+ ", categoriaId" + categoriaId + "}");
		try {
			String filePath = Constants.CONTEXT_PATH_FILE; // By default > assets/img/productos/demo.png
			if (file != null) {
				log.info("Uploading file::: " + file.getName());
				String fileName = storageService.upload(file);
				filePath = ATTACH_PATH_PRODUCT + "/" + fileName; // assets/img/productos/fileName
				log.info("Updated file. FilePath::: " + filePath);
			} else {
				log.info("The file is " + file + ". Default file::: " + filePath);
			}
			ProductDTO product = this.toProduct(name, description, filePath, price, newPrice, stock, isNew,
					isRecommended, isEnable, marcaId, categoriaId);
			this.saveProduct(product);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}

	public void updateProduct(Long id, String name, String description, MultipartFile file, Double price,
			Double newPrice, Integer stock, Boolean isNew, Boolean isRecommended, Boolean isEnable, Long marcaId,
			Long categoriaId) {
		log.info("UpdateProduct method -> Param { id: " + id + ", name: " + name + ", description: " + description
				+ ", fileName: " + file.getName() + ", price: " + price + ", newPrice: " + newPrice + ", stock: "
				+ stock + ", isNew: " + isNew + ", isRecommended: " + isRecommended + ", isEnable: " + isEnable
				+ ", marcaId: " + marcaId + ", categoriaId" + categoriaId + "}");
		try {
			String filePath = "";
			if (file != null) {
				log.info("Uploading file::: " + file.getName());
				String fileName = storageService.upload(file);
				filePath = ATTACH_PATH_PRODUCT + "/" + fileName; // assets/img/productos/fileName
				log.info("Updated file. FilePath::: " + filePath);
			}
			Optional<Producto> productOp = this.getByName(name);
			if (productOp.isPresent()) {
				Producto product = productOp.get();
				String fileImg = (!filePath.isEmpty() ? filePath : product.getImg());
				Marca marca = marcaService.getMarca(marcaId);
				Category categoria = categoryService.getCategory(categoriaId);
				Producto productUpdate = new Producto(product.getName(), description, price, newPrice, stock, isNew,
						isRecommended, isEnable, marca, categoria, fileImg);
				productUpdate.setId(product.getId());
				productRepository.save(productUpdate);
			} else {
				throw new Exception("El producto que intenta actualizar no existe.");
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}

}
