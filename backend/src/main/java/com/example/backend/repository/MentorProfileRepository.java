package com.example.backend.repository;

import com.example.backend.model.MentorProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MentorProfileRepository extends JpaRepository<MentorProfile, Long> {
}