package com.example.backend.repository;

import com.example.backend.model.MenteeProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MenteeProfileRepository extends JpaRepository<MenteeProfile, Long> {
}
