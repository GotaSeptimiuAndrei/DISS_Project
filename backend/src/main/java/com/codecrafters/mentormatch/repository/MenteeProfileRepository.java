package com.codecrafters.mentormatch.repository;

import com.codecrafters.mentormatch.model.MenteeProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MenteeProfileRepository extends JpaRepository<MenteeProfile, Long> {
}
