package com.monmoney.monopoly.service;

import com.monmoney.monopoly.exception.UserNotFoundException;
import com.monmoney.monopoly.model.Player;
import com.monmoney.monopoly.repo.PlayerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PlayerService {
    private final PlayerRepo playerRepo;

    @Autowired
    public PlayerService(PlayerRepo playerRepo){this.playerRepo = playerRepo;}

    public Player addPlayer(Player player){
        return playerRepo.save(player);
    }

    public List<Player> findAllPlayers(){
        return playerRepo.findAll();
    }

    public Player updatePlayer(Player player){
        return playerRepo.save(player);
    }
    public void deletePlayer(Long id){
        playerRepo.deletePlayerById(id);
    }
    public Player findPlayerById(Long id){
        return playerRepo.findPlayerById(id).orElseThrow(() -> new UserNotFoundException("User by id " + id + " was not found"));
    }

    public Player findPlayerByUsername(String username){
        return playerRepo.findPlayerByUsername(username).orElseThrow(() -> new UserNotFoundException("User " + username + " was not found"));
    }
    public void addMoneyById(Long id, int amount){
        Optional<Player> pl = playerRepo.findPlayerById(id);
        pl.get().setBalance( pl.get().getBalance() + amount );
        playerRepo.save(pl.get());
    }

    public void subtractMoneyById(Long id, int amount){
        Optional<Player> pl = playerRepo.findPlayerById(id);
        if(pl.get().getBalance() >= amount)
            pl.get().setBalance( pl.get().getBalance() - amount );
        else
            pl.get().setBalance(0);
        playerRepo.save(pl.get());
    }
    public void transferMoneyById(Long fromId, Long toId, int amount){
    Player fromPl = playerRepo.findPlayerById(fromId).get();
    Player toPl = playerRepo.findPlayerById(toId).get();
    if(fromPl.getBalance() < amount){
        toPl.setBalance(toPl.getBalance() + fromPl.getBalance());
        fromPl.setBalance(0);
    }else{
        toPl.setBalance(toPl.getBalance() + amount);
        fromPl.setBalance(fromPl.getBalance() - amount);
    }
    playerRepo.save(fromPl);
    playerRepo.save(toPl);
    }
}
