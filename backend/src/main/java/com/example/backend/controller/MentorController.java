package com.example.backend.controller;

import com.example.backend.dto.MentorResponseDTO;
import com.example.backend.model.MentorProfile;
import com.example.backend.repository.MentorProfileRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/mentors")
@CrossOrigin(origins = "*")
public class MentorController {

    private final MentorProfileRepository mentorProfileRepository;

    public MentorController(MentorProfileRepository mentorProfileRepository) {
        this.mentorProfileRepository = mentorProfileRepository;
    }

    @GetMapping
    public ResponseEntity<List<MentorResponseDTO>> getAllMentors(
            @RequestParam(required = false) List<String> skills) {

        List<MentorProfile> profiles = mentorProfileRepository.findAll();

        if (skills != null && !skills.isEmpty()) {
            // Sort mentors by how many skills overlap with the requested list
            profiles.sort((p1, p2) -> {
                long matchCount1 = p1.getSkills().stream()
                        .filter(mentorSkill -> skills.stream().anyMatch(s -> mentorSkill.toLowerCase().contains(s.toLowerCase())))
                        .count();

                long matchCount2 = p2.getSkills().stream()
                        .filter(mentorSkill -> skills.stream().anyMatch(s -> mentorSkill.toLowerCase().contains(s.toLowerCase())))
                        .count();

                // Sort descending (highest match first)
                return Long.compare(matchCount2, matchCount1);
            });

            // Optional: Filter out mentors who have 0 matches
            profiles = profiles.stream()
                    .filter(p -> p.getSkills().stream()
                            .anyMatch(mentorSkill -> skills.stream().anyMatch(s -> mentorSkill.toLowerCase().contains(s.toLowerCase()))))
                    .collect(Collectors.toList());
        }

        List<MentorResponseDTO> response = profiles.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());

        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    @Transactional
    public ResponseEntity<MentorResponseDTO> getMentorById(@PathVariable Long id) {
        return mentorProfileRepository.findById(id)
                .map(this::convertToDTO)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Helper method to map Entity -> DTO
    private MentorResponseDTO convertToDTO(MentorProfile profile) {
        MentorResponseDTO dto = new MentorResponseDTO();
        dto.setId(profile.getId());
        dto.setName(profile.getUser().getName());
        dto.setTitle(profile.getUser().getTitle());
        dto.setCompany(profile.getUser().getCompany());
        dto.setRating(profile.getUser().getRating());
        dto.setReviewCount(profile.getUser().getReviewCount());
        dto.setProfileBio(profile.getProfileBio());
        dto.setSkills(profile.getSkills());
        return dto;
    }
}