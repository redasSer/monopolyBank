package com.monmoney.monopoly;

import com.monmoney.monopoly.model.Player;
import com.monmoney.monopoly.service.PlayerService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.List;

@RestController
@RequestMapping("/player")
public class PlayerResource {
    private final PlayerService playerService;

    public PlayerResource(PlayerService playerService) {

        this.playerService = playerService;

    }

    @GetMapping("/all")
    public ResponseEntity<List<Player>> getAllPlayers(){
        List<Player> players = playerService.findAllPlayers();
        return new ResponseEntity<>(players, HttpStatus.OK);
    }
    @GetMapping("/{id}")
    public ResponseEntity<Player> getPlayerById(@PathVariable("id") Long id){
        Player player = playerService.findPlayerById(id);
        return new ResponseEntity<>(player, HttpStatus.OK);
    }
    @GetMapping("/get/{username}")
    public ResponseEntity<Player> getPlayerByUsername(@PathVariable("username") String username){
        Player player = playerService.findPlayerByUsername(username);
        return new ResponseEntity<>(player, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Player> addPlayer(@RequestBody Player player){
        Player newPlayer = playerService.addPlayer(player);
        return new ResponseEntity<>(newPlayer, HttpStatus.CREATED);
    }
    @PutMapping("/update")
    public ResponseEntity<Player> updatePlayer(@RequestBody Player player){
        Player updatePlayer = playerService.updatePlayer(player);
        return new ResponseEntity<>(updatePlayer, HttpStatus.CREATED);
    }

    @PostMapping("/money/add/{id}/{amount}")
    public ResponseEntity<?> addMoneyById(@PathVariable("id") Long id, @PathVariable("amount") int amount){
        playerService.addMoneyById(id, amount);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PostMapping("/money/subtract/{id}/{amount}")
    public ResponseEntity<?> subtractMoneyById(@PathVariable("id") Long id, @PathVariable("amount") int amount){
        playerService.subtractMoneyById(id, amount);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
    @PostMapping("/money/transfer/{fromId}/{toId}/{amount}")
    public ResponseEntity<?> transferMoneyById(@PathVariable("fromId") Long fromId,
                                               @PathVariable("toId") Long toId,
                                               @PathVariable("amount") int amount){

        playerService.transferMoneyById(fromId,toId,amount);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @DeleteMapping("/delete/{id}")
    @Transactional
    public ResponseEntity<?> deletePlayer(@PathVariable("id") Long id) {
        playerService.deletePlayer(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }


    @MessageMapping("/money/get/{id}")
    public int updateMoney(@PathVariable("id") Long id){
        return playerService.findPlayerById(id).getBalance();
    }
}
