package com.example.backend.dto;

import lombok.Data;
import java.util.List;

@Data
public class MentorResponseDTO {
    private Long id;
    private String name;
    private String title;
    private String company;
    private Double rating;
    private Integer reviewCount;
    private String profileBio;
    private List<String> skills;
}