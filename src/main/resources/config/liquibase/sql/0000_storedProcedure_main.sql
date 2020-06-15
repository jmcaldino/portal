-- lista las categorias principales. Delimitador dice de donde empieza a donde termina
DELIMITER $$
CREATE PROCEDURE sp_listarCategoriaPrincipal()
BEGIN 
	SELECT id,nombre FROM categoria
	WHERE id = categoria_fk AND visible=true;
END$$

-- call sp_listarCategoriaPrincipal();

-- lista las subcategorias
DELIMITER $$
CREATE PROCEDURE sp_listarSubCategoria(p_cat_principal int)
BEGIN 
	SELECT id,nombre FROM categoria
	WHERE id <> categoria_fk AND visible=true AND categoria_fk=p_cat_principal;
END$$

-- call sp_listarSubCategoria(5);