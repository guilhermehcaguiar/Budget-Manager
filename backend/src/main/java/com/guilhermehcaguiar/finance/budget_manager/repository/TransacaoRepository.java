package com.guilhermehcaguiar.finance.budget_manager.repository;
import com.guilhermehcaguiar.finance.budget_manager.model.Transacao;
import org.springframework.data.jpa.repository. JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface TransacaoRepository extends JpaRepository<Transacao, Long> {
    
}
