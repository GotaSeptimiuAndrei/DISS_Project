package com.example.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Entity
@Table(name = "mentor_profiles")
@Data
public class MentorProfile {
    @Id
    private Long userId;

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

    @ElementCollection
    @CollectionTable(name = "mentor_skills", joinColumns = @JoinColumn(name = "mentor_id"))
    @Column(name = "skill_name")
    private List<String> skills;
}