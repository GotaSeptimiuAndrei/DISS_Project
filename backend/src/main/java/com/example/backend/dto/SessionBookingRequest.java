package com.example.backend.dto;

import lombok.Data;
import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class SessionBookingRequest {
    private Long mentorId;
    private Long menteeId;

    private LocalDate sessionDate;
    private String sessionTime;

    private String sessionType;
    private String topic;
    private String notes;
}