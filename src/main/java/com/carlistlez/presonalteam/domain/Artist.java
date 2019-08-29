package com.carlistlez.presonalteam.domain;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Artist.
 */
@Entity
@Table(name = "artist")
public class Artist implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "genre")
    private String genre;

    @Column(name = "label")
    private String label;

    @Column(name = "year")
    private Integer year;

    @OneToMany(mappedBy = "artist")
    private Set<Album> albums = new HashSet<>();

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

    public Artist name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getGenre() {
        return genre;
    }

    public Artist genre(String genre) {
        this.genre = genre;
        return this;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public String getLabel() {
        return label;
    }

    public Artist label(String label) {
        this.label = label;
        return this;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public Integer getYear() {
        return year;
    }

    public Artist year(Integer year) {
        this.year = year;
        return this;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public Set<Album> getAlbums() {
        return albums;
    }

    public Artist albums(Set<Album> albums) {
        this.albums = albums;
        return this;
    }

    public Artist addAlbums(Album album) {
        this.albums.add(album);
        album.setArtist(this);
        return this;
    }

    public Artist removeAlbums(Album album) {
        this.albums.remove(album);
        album.setArtist(null);
        return this;
    }

    public void setAlbums(Set<Album> albums) {
        this.albums = albums;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Artist)) {
            return false;
        }
        return id != null && id.equals(((Artist) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Artist{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", genre='" + getGenre() + "'" +
            ", label='" + getLabel() + "'" +
            ", year=" + getYear() +
            "}";
    }
}
