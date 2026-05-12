package com.example.backend.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "sessions")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class Session {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "mentor_id")
    private User mentor;

    @ManyToOne
    @JoinColumn(name = "mentee_id")
    private User mentee;

    private String topic;
    private LocalDate sessionDate;
    private LocalTime sessionTime;
    private Integer duration;
    private String type; 
    private String status;
    private Boolean isFirstSession = false;
    
    @Column(columnDefinition = "TEXT")
    private String notes;
}