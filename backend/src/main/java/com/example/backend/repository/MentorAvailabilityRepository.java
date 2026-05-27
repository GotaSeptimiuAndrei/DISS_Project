package com.example.backend.repository;

import com.example.backend.model.MentorAvailability;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MentorAvailabilityRepository extends JpaRepository<MentorAvailability, Long> {
}
