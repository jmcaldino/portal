package com.gestion.calmar.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.gestion.calmar.domain.SolicitudPedido;

@Repository
public interface SolicitudPedidoRepository extends CrudRepository<SolicitudPedido, Long> {

	@Query("FROM SolicitudPedido p JOIN FETCH p.items WHERE p.codigoPedido = (:orderCode)")
	public Optional<SolicitudPedido> findByCodigoPedidoEagerly(@Param("orderCode") String orderCode);

	@Query("FROM SolicitudPedido p WHERE ((:orderCode is null or p.codigoPedido = :orderCode) and "
			+ "(:dni is null or p.cliente.dni = :dni) and " // + "(:date is null or p.createdDate = :date) or "
			+ "(:estado is null or p.estado = :estado)) order by date(createdDate) desc ")
	public Page<SolicitudPedido> getAllPedidos(@Param("orderCode") String orderCode, @Param("dni") String dni,
			@Param("estado") String estado, Pageable pageable);

}
