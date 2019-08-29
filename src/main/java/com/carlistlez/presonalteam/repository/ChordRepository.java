package com.carlistlez.presonalteam.repository;

import com.carlistlez.presonalteam.domain.Chord;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Chord entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ChordRepository extends JpaRepository<Chord, Long> {

}
