package com.carlistlez.presonalteam.domain;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A Song.
 */
@Entity
@Table(name = "song")
public class Song implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "difficulty")
    private String difficulty;

    @Column(name = "capo")
    private Integer capo;

    @Column(name = "progression")
    private String progression;

    private Album album;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public Song title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDifficulty() {
        return difficulty;
    }

    public Song difficulty(String difficulty) {
        this.difficulty = difficulty;
        return this;
    }

    public void setDifficulty(String difficulty) {
        this.difficulty = difficulty;
    }

    public Integer getCapo() {
        return capo;
    }

    public Song capo(Integer capo) {
        this.capo = capo;
        return this;
    }

    public void setCapo(Integer capo) {
        this.capo = capo;
    }

    public String getProgression() {
        return progression;
    }

    public Song progression(String progression) {
        this.progression = progression;
        return this;
    }

    public void setProgression(String progression) {
        this.progression = progression;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Song)) {
            return false;
        }
        return id != null && id.equals(((Song) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Song{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", difficulty='" + getDifficulty() + "'" +
            ", capo=" + getCapo() +
            ", progression='" + getProgression() + "'" +
            "}";
    }

    public void setAlbum(Album album) {
        this.album = album;
    }

    public Object getAlbum() {
        return album;
    }
}
