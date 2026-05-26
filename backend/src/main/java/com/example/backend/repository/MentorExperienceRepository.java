package com.example.backend.repository;

import com.example.backend.model.MentorExperience;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MentorExperienceRepository extends JpaRepository<MentorExperience, Long> {
}
