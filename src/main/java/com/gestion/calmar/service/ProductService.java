package com.gestion.calmar.service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

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
import com.gestion.calmar.web.rest.errors.BadRequestAlertException;

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

	@Transactional
	private void saveProduct(ProductDTO product) throws NotFoundException {
		Producto newProd = product.toProductBasicEntity();
		final Category category = categoryService.getCategory(product.getCategoria().getId());
		newProd.setCategoria(category);
		final Marca marca = marcaService.getMarca(product.getMarca().getId());
		newProd.setMarca(marca);
		log.info("Insert new product: '{}'", newProd);
		// TODO falta la clase revisión
		productRepository.save(newProd);
	}

	@Transactional(readOnly = true)
	public Page<Producto> listProductPage(Pageable pageable) {
		Page<Producto> products = productRepository.findAll(pageable);
		return products;
	}

	@Transactional(readOnly = true)
	public Page<Producto> listProductByCategoryPage(String categoria, Pageable pageable) {
		Page<Producto> products = productRepository.getAllProductByCategory(categoria, pageable);
		return products;
	}

	@Transactional(readOnly = true)
	public Page<Producto> listDestacadosProductPage(Pageable pageable) {
		Page<Producto> products = productRepository.getAllDestacadosProduct(pageable);
		return products;
	}

	@Transactional(readOnly = true)
	public ProductDTO getProductByName(String prodName) {
		log.info("getProductByName method -> Param { prodName: " + prodName + " }");
		Optional<ProductDTO> productDTO = Optional.of(this.getByName(prodName)).filter(Optional::isPresent)
				.map(Optional::get).map(ProductDTO::new);
		log.info("Exit getProductByName method::: " + productDTO.get() + " . ");
		return productDTO.get();
	}

	@Transactional(readOnly = true)
	public ProductDTO getProductById(Long id) {
		log.info("getProductById method -> Param { id: " + id + " }");
		Optional<Producto> product = productRepository.findOneById(id);
		Optional<ProductDTO> productDTO = Optional.of(product).filter(Optional::isPresent).map(Optional::get)
				.map(ProductDTO::new);
		log.info("Exit getProductById method::: " + productDTO.get() + " . ");
		return productDTO.get();
	}

	@Transactional(readOnly = true)
	public Optional<Producto> getByName(String prodName) {
		return productRepository.findOneByName(prodName);
	}

	@Transactional(readOnly = true)
	public Set<Producto> getProductByIds(List<Long> ids) {
		return productRepository.getProductByIDs(ids);
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
				filePath = Constants.ATTACH_PATH_PRODUCT + "/" + fileName; // assets/img/productos/fileName
				log.info("Updated file. FilePath::: " + filePath);
			} else {
				log.info("The file is " + file + ". Default file::: " + filePath);
			}
			ProductDTO product = new ProductDTO(name, description, filePath, price, newPrice, stock, isNew,
					isRecommended, isEnable, marcaId, categoriaId);
			this.saveProduct(product);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}

	@Transactional
	public void updateProduct(Long id, String name, String description, MultipartFile file, Double price,
			Double newPrice, Integer stock, Boolean isNew, Boolean isRecommended, Boolean isEnable, Long marcaId,
			Long categoriaId) {
		log.info("UpdateProduct method -> Param { id: " + id + ", name: " + name + ", description: " + description
				+ ", fileName: " + (file == null ? "null" : file.getName()) + ", price: " + price + ", newPrice: "
				+ newPrice + ", stock: " + stock + ", isNew: " + isNew + ", isRecommended: " + isRecommended
				+ ", isEnable: " + isEnable + ", marcaId: " + marcaId + ", categoriaId" + categoriaId + "}");
		try {
			boolean updateFile = false;
			String filePath = "";
			if (file != null) {
				log.info("Uploading file::: " + file.getName());
				String fileName = storageService.upload(file);
				filePath = Constants.ATTACH_PATH_PRODUCT + "/" + fileName; // assets/img/productos/fileName
				log.info("Updated file. FilePath::: " + filePath);
				updateFile = true;
			}

			Optional<Producto> productOp = Optional.of(this.productRepository.getOne(id));
			if (productOp.isPresent()) {
				Optional<Producto> prodUpdateName = this.getByName(name.toLowerCase());
				if (prodUpdateName.isPresent()) {
					if (!prodUpdateName.get().getId().equals(productOp.get().getId())) {
						log.error("El nombre del producto que intenta actualizar ya exite.");
						throw new BadRequestAlertException(
								"El nombre del producto que intenta actualizar ya exite. Debe ingresar otro nombre",
								"productManagement", "productexists");
					}
				}
				Producto product = productOp.get();
				String fileImg = (!filePath.isEmpty() ? filePath : product.getImg());
				if (updateFile) { // Eliminamos la imagen anterior
					storageService.delete(product.getImg());
				}
				Marca marca = marcaService.getMarca(marcaId);
				Category categoria = categoryService.getCategory(categoriaId);
				Producto productUpdate = new Producto(name, description, price, newPrice, stock, isNew, isRecommended,
						isEnable, marca, categoria, fileImg);
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

	public void deleteProduct(String name) {
		productRepository.findOneByName(name).ifPresent(product -> {
			productRepository.delete(product);
			log.debug("Deleted Product: {}", product);
		});
	}

	@Transactional(readOnly = true)
	public Page<Producto> searchProductByNameOrDescription(String keyword, Pageable pageable) {
		String[] words = keyword.split(" ");
		if (words.length == 1) {
			return productRepository.searchProduct("%" + words[0] + "%", pageable);
		} else {
			return productRepository.searchProductWithTwoWord("%" + words[0] + "%", "%" + words[1] + "%", pageable);
		}
	}

}
