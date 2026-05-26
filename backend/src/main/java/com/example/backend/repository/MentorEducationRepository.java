package com.example.backend.repository;

import com.example.backend.model.MentorEducation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MentorEducationRepository extends JpaRepository<MentorEducation, Long> {
}
