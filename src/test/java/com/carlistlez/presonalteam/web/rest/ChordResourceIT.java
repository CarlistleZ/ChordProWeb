package com.carlistlez.presonalteam.web.rest;

import com.carlistlez.presonalteam.ChordProApp;
import com.carlistlez.presonalteam.domain.Chord;
import com.carlistlez.presonalteam.repository.ChordRepository;
import com.carlistlez.presonalteam.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;

import static com.carlistlez.presonalteam.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@Link ChordResource} REST controller.
 */
@SpringBootTest(classes = ChordProApp.class)
public class ChordResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_KEY = "AAAAAAAAAA";
    private static final String UPDATED_KEY = "BBBBBBBBBB";

    private static final String DEFAULT_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_TYPE = "BBBBBBBBBB";

    private static final Integer DEFAULT_FRET = 1;
    private static final Integer UPDATED_FRET = 2;

    @Autowired
    private ChordRepository chordRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restChordMockMvc;

    private Chord chord;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ChordResource chordResource = new ChordResource(chordRepository);
        this.restChordMockMvc = MockMvcBuilders.standaloneSetup(chordResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Chord createEntity(EntityManager em) {
        Chord chord = new Chord()
            .name(DEFAULT_NAME)
            .key(DEFAULT_KEY)
            .type(DEFAULT_TYPE)
            .fret(DEFAULT_FRET);
        return chord;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Chord createUpdatedEntity(EntityManager em) {
        Chord chord = new Chord()
            .name(UPDATED_NAME)
            .key(UPDATED_KEY)
            .type(UPDATED_TYPE)
            .fret(UPDATED_FRET);
        return chord;
    }

    @BeforeEach
    public void initTest() {
        chord = createEntity(em);
    }

    @Test
    @Transactional
    public void createChord() throws Exception {
        int databaseSizeBeforeCreate = chordRepository.findAll().size();

        // Create the Chord
        restChordMockMvc.perform(post("/api/chords")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(chord)))
            .andExpect(status().isCreated());

        // Validate the Chord in the database
        List<Chord> chordList = chordRepository.findAll();
        assertThat(chordList).hasSize(databaseSizeBeforeCreate + 1);
        Chord testChord = chordList.get(chordList.size() - 1);
        assertThat(testChord.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testChord.getKey()).isEqualTo(DEFAULT_KEY);
        assertThat(testChord.getType()).isEqualTo(DEFAULT_TYPE);
        assertThat(testChord.getFret()).isEqualTo(DEFAULT_FRET);
    }

    @Test
    @Transactional
    public void createChordWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = chordRepository.findAll().size();

        // Create the Chord with an existing ID
        chord.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restChordMockMvc.perform(post("/api/chords")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(chord)))
            .andExpect(status().isBadRequest());

        // Validate the Chord in the database
        List<Chord> chordList = chordRepository.findAll();
        assertThat(chordList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllChords() throws Exception {
        // Initialize the database
        chordRepository.saveAndFlush(chord);

        // Get all the chordList
        restChordMockMvc.perform(get("/api/chords?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(chord.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].key").value(hasItem(DEFAULT_KEY.toString())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE.toString())))
            .andExpect(jsonPath("$.[*].fret").value(hasItem(DEFAULT_FRET)));
    }
    
    @Test
    @Transactional
    public void getChord() throws Exception {
        // Initialize the database
        chordRepository.saveAndFlush(chord);

        // Get the chord
        restChordMockMvc.perform(get("/api/chords/{id}", chord.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(chord.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.key").value(DEFAULT_KEY.toString()))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE.toString()))
            .andExpect(jsonPath("$.fret").value(DEFAULT_FRET));
    }

    @Test
    @Transactional
    public void getNonExistingChord() throws Exception {
        // Get the chord
        restChordMockMvc.perform(get("/api/chords/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateChord() throws Exception {
        // Initialize the database
        chordRepository.saveAndFlush(chord);

        int databaseSizeBeforeUpdate = chordRepository.findAll().size();

        // Update the chord
        Chord updatedChord = chordRepository.findById(chord.getId()).get();
        // Disconnect from session so that the updates on updatedChord are not directly saved in db
        em.detach(updatedChord);
        updatedChord
            .name(UPDATED_NAME)
            .key(UPDATED_KEY)
            .type(UPDATED_TYPE)
            .fret(UPDATED_FRET);

        restChordMockMvc.perform(put("/api/chords")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedChord)))
            .andExpect(status().isOk());

        // Validate the Chord in the database
        List<Chord> chordList = chordRepository.findAll();
        assertThat(chordList).hasSize(databaseSizeBeforeUpdate);
        Chord testChord = chordList.get(chordList.size() - 1);
        assertThat(testChord.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testChord.getKey()).isEqualTo(UPDATED_KEY);
        assertThat(testChord.getType()).isEqualTo(UPDATED_TYPE);
        assertThat(testChord.getFret()).isEqualTo(UPDATED_FRET);
    }

    @Test
    @Transactional
    public void updateNonExistingChord() throws Exception {
        int databaseSizeBeforeUpdate = chordRepository.findAll().size();

        // Create the Chord

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restChordMockMvc.perform(put("/api/chords")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(chord)))
            .andExpect(status().isBadRequest());

        // Validate the Chord in the database
        List<Chord> chordList = chordRepository.findAll();
        assertThat(chordList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteChord() throws Exception {
        // Initialize the database
        chordRepository.saveAndFlush(chord);

        int databaseSizeBeforeDelete = chordRepository.findAll().size();

        // Delete the chord
        restChordMockMvc.perform(delete("/api/chords/{id}", chord.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database is empty
        List<Chord> chordList = chordRepository.findAll();
        assertThat(chordList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Chord.class);
        Chord chord1 = new Chord();
        chord1.setId(1L);
        Chord chord2 = new Chord();
        chord2.setId(chord1.getId());
        assertThat(chord1).isEqualTo(chord2);
        chord2.setId(2L);
        assertThat(chord1).isNotEqualTo(chord2);
        chord1.setId(null);
        assertThat(chord1).isNotEqualTo(chord2);
    }
}
