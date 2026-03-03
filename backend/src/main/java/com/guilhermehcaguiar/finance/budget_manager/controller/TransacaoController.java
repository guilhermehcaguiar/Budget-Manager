package com.guilhermehcaguiar.finance.budget_manager.controller;
import com.guilhermehcaguiar.finance.budget_manager.model.Transacao;
import com.guilhermehcaguiar.finance.budget_manager.repository.TransacaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
@RequestMapping("/api/transacoes")
@CrossOrigin("*")
public class TransacaoController {
    @Autowired
    private TransacaoRepository repository;
    @GetMapping
    public List<Transacao> listarTodas() {
        return repository.findAll();
    }
    @GetMapping("/fixas")
    public List<Transacao> listarFixas(@RequestParam String tipo) {
        return repository.findByTipoAndFixo(tipo, true);
    }
    @PostMapping
    public Transacao salvar(@RequestBody Transacao transacao) {
        return repository.save(transacao);
    }
}
