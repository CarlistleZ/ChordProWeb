package com.carlistlez.presonalteam.web.rest;

import com.carlistlez.presonalteam.domain.Chord;
import com.carlistlez.presonalteam.repository.ChordRepository;
import com.carlistlez.presonalteam.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.carlistlez.presonalteam.domain.Chord}.
 */
@RestController
@RequestMapping("/api")
public class ChordResource {

    private final Logger log = LoggerFactory.getLogger(ChordResource.class);

    private static final String ENTITY_NAME = "chord";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ChordRepository chordRepository;

    public ChordResource(ChordRepository chordRepository) {
        this.chordRepository = chordRepository;
    }

    /**
     * {@code POST  /chords} : Create a new chord.
     *
     * @param chord the chord to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new chord, or with status {@code 400 (Bad Request)} if the chord has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/chords")
    public ResponseEntity<Chord> createChord(@RequestBody Chord chord) throws URISyntaxException {
        log.debug("REST request to save Chord : {}", chord);
        if (chord.getId() != null) {
            throw new BadRequestAlertException("A new chord cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Chord result = chordRepository.save(chord);
        return ResponseEntity.created(new URI("/api/chords/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /chords} : Updates an existing chord.
     *
     * @param chord the chord to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated chord,
     * or with status {@code 400 (Bad Request)} if the chord is not valid,
     * or with status {@code 500 (Internal Server Error)} if the chord couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/chords")
    public ResponseEntity<Chord> updateChord(@RequestBody Chord chord) throws URISyntaxException {
        log.debug("REST request to update Chord : {}", chord);
        if (chord.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Chord result = chordRepository.save(chord);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, chord.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /chords} : get all the chords.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of chords in body.
     */
    @GetMapping("/chords")
    public List<Chord> getAllChords() {
        log.debug("REST request to get all Chords");
        return chordRepository.findAll();
    }

    /**
     * {@code GET  /chords/:id} : get the "id" chord.
     *
     * @param id the id of the chord to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the chord, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/chords/{id}")
    public ResponseEntity<Chord> getChord(@PathVariable Long id) {
        log.debug("REST request to get Chord : {}", id);
        Optional<Chord> chord = chordRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(chord);
    }

    /**
     * {@code DELETE  /chords/:id} : delete the "id" chord.
     *
     * @param id the id of the chord to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/chords/{id}")
    public ResponseEntity<Void> deleteChord(@PathVariable Long id) {
        log.debug("REST request to delete Chord : {}", id);
        chordRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
