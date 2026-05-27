package com.example.backend.model;

import com.example.backend.model.enums.Availability;
import com.example.backend.model.enums.ExperienceLevel;
import com.example.backend.model.enums.LearningStyle;
import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Entity
@Data
@Table(name = "mentee_profiles")
public class MenteeProfile {
    @Id
    private Long id;

    @OneToOne
    @MapsId
    @JoinColumn(name = "user_id")
    private User user;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ExperienceLevel experienceLevel;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private LearningStyle learningStyle;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Availability availability;

    @ElementCollection
    @CollectionTable(name = "mentee_goals", joinColumns = @JoinColumn(name = "user_id"))
    @Column(name = "goal")
    private List<String> goals;
}