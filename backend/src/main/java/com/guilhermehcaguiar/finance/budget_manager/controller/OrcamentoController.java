package com.guilhermehcaguiar.finance.budget_manager.controller;
import com.guilhermehcaguiar.finance.budget_manager.model.Orcamento;
import com.guilhermehcaguiar.finance.budget_manager.repository.OrcamentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
@RequestMapping("/api/orcamentos")
@CrossOrigin("*")
public class OrcamentoController {
    @Autowired
    private OrcamentoRepository repository;
    @GetMapping
    public List<Orcamento> listarTodos() {
        return repository.findAll();
    }
    @PostMapping
    public Orcamento salvar(@RequestBody Orcamento orcamento) {
        return repository.save(orcamento);
    }
}