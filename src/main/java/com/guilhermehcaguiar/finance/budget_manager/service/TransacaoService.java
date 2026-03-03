package com.guilhermehcaguiar.finance.budget_manager.service;
import com.guilhermehcaguiar.finance.budget_manager.model.Transacao;
import com.guilhermehcaguiar.finance.budget_manager.repository.TransacaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.util.List;
@Service
public class TransacaoService {
    @Autowired
    private TransacaoRepository transacaoRepository;
    public Transacao salvar(Transacao transacao) {
        if (transacao.getValor() == null || transacao.getValor().compareTo(BigDecimal.ZERO) <= 0) {
            throw new RuntimeException("O valor da transação não pode ser nulo.");
        }
        return transacaoRepository.save(transacao);
    }
    public List<Transacao> listar() {
        return transacaoRepository.findAll();
    }
    public void deletar (Long id) {
        transacaoRepository.deleteById(id);
    }
}
