package com.monmoney.monopoly.repo;

import com.monmoney.monopoly.model.Player;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PlayerRepo extends JpaRepository<Player, Long> {
    void deletePlayerById(Long id);
    Optional<Player> findPlayerByUsername(String username);
    Optional<Player> findPlayerById(Long id);
}
