package com.guilhermehcaguiar.finance.budget_manager.repository;
import com.guilhermehcaguiar.finance.budget_manager.model.Orcamento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
@Repository
public interface OrcamentoRepository extends JpaRepository<Orcamento, Long> {
    Optional<Orcamento> findByCategoria(String categoria);
}
