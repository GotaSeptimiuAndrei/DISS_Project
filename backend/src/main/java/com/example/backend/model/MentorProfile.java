package com.example.backend.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "mentor_profiles")
@Data
public class MentorProfile {
    @Id
    private Long id;

    @OneToOne
    @MapsId
    @JoinColumn(name = "user_id")
    private User user;

    private Double hourlyRate;
    private String availabilityNote;
    
    @Column(columnDefinition = "TEXT")
    private String profileBio;
    
    @Column(columnDefinition = "TEXT")
    private String experienceSummary;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "mentor_skills", joinColumns = @JoinColumn(name = "mentor_id"))
    @Column(name = "skill_name")
    private List<String> skills;

    @OneToMany(mappedBy = "mentor", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<MentorExperience> experiences = new ArrayList<>();

    @OneToMany(mappedBy = "mentor", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<MentorEducation> education = new ArrayList<>();

    @OneToMany(mappedBy = "mentor", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<MentorAvailability> availability = new ArrayList<>();
}