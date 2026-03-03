package com.guilhermehcaguiar.finance.budget_manager.controller;
import com.guilhermehcaguiar.finance.budget_manager.model.Transacao;
import com.guilhermehcaguiar.finance.budget_manager.service.TransacaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
@RequestMapping("/api/transacoes")
@CrossOrigin(origins = "*")
public class TransacaoController {
   @Autowired
   private TransacaoService transacaoService;
   @PostMapping
    public Transacao criar(@RequestBody Transacao transacao) {
        return transacaoService.salvar(transacao); 
    }
    @GetMapping
    public List<Transacao> listar() {
        return transacaoService.listar();
    }
    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        transacaoService.deletar(id);
    }
}
