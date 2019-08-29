package com.carlistlez.presonalteam.domain;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A Chord.
 */
@Entity
@Table(name = "chord")
public class Chord implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "jhi_key")
    private String key;

    @Column(name = "type")
    private String type;

    @Column(name = "fret")
    private Integer fret;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Chord name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getKey() {
        return key;
    }

    public Chord key(String key) {
        this.key = key;
        return this;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public String getType() {
        return type;
    }

    public Chord type(String type) {
        this.type = type;
        return this;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Integer getFret() {
        return fret;
    }

    public Chord fret(Integer fret) {
        this.fret = fret;
        return this;
    }

    public void setFret(Integer fret) {
        this.fret = fret;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Chord)) {
            return false;
        }
        return id != null && id.equals(((Chord) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Chord{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", key='" + getKey() + "'" +
            ", type='" + getType() + "'" +
            ", fret=" + getFret() +
            "}";
    }
}
