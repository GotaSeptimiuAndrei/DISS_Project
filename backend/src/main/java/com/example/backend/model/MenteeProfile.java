package com.example.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Entity
@Table(name = "mentee_profiles")
@Data
public class MenteeProfile {
    @Id
    private Long userId;

    @OneToOne
    @MapsId
    @JoinColumn(name = "user_id")
    private User user;

    private String experienceLevel;
    private String learningStyle;
    private String availability;

    @ElementCollection
    @CollectionTable(name = "mentee_goals", joinColumns = @JoinColumn(name = "user_id"))
    @Column(name = "goal")
    private List<String> goals;
}