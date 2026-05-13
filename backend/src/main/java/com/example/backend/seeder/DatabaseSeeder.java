package com.example.backend.seeder;

import com.example.backend.model.*;
import com.example.backend.repository.MenteeProfileRepository;
import com.example.backend.repository.MentorProfileRepository;
import com.example.backend.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;

@Component
public class DatabaseSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final MentorProfileRepository mentorProfileRepository;
    private final MenteeProfileRepository menteeProfileRepository;

    public DatabaseSeeder(UserRepository userRepository,
                          MentorProfileRepository mentorProfileRepository,
                          MenteeProfileRepository menteeProfileRepository) {
        this.userRepository = userRepository;
        this.mentorProfileRepository = mentorProfileRepository;
        this.menteeProfileRepository = menteeProfileRepository;
    }

    @Override
    @Transactional
    public void run(String... args) {
        // Only run if the database is empty
        if (userRepository.count() == 0) {
            System.out.println("🌱 Seeding database with realistic prototype data...");
            seedMentors();
            seedMentees();
            System.out.println("✅ Database seeding complete!");
        } else {
            System.out.println("⚡ Database already contains data. Skipping seeder.");
        }
    }

    private void seedMentors() {
        // Mentor 1: Ana Luca (From Blondinele Video)
        User m1 = createUser("Ana Luca", "ana.luca@encenter.ro", Role.MENTOR, "Robotics Engineering Specialist", "EnCenter Ltd.");
        MentorProfile p1 = new MentorProfile();
        p1.setUser(m1);
        p1.setHourlyRate(0.0);
        p1.setProfileBio("MSc in Robotics Engineering. Certified Robotics Programmer. Passionate about teaching AI and Mechatronics.");
        p1.setExperienceSummary("7 years in industrial robotics and machine learning integrations.");
        p1.setSkills(Arrays.asList("Advanced Robotics", "AI & Machine Learning", "Robot Vision Systems", "Robot Control Systems", "Mechatronics"));
        mentorProfileRepository.save(p1);

        // Mentor 2: Sarah Anderson (From prototype mockups)
        User m2 = createUser("Sarah Anderson", "sarah.anderson@encenter.ro", Role.MENTOR, "Senior Project Manager", "EnCenter Ltd.");
        MentorProfile p2 = new MentorProfile();
        p2.setUser(m2);
        p2.setHourlyRate(0.0);
        p2.setProfileBio("Agile evangelist and PMP certified project manager helping teams deliver software efficiently.");
        p2.setExperienceSummary("10+ years managing cross-functional software teams.");
        p2.setSkills(Arrays.asList("Project Management", "Agile/Scrum", "Risk Management", "Leadership"));
        mentorProfileRepository.save(p2);

        // Mentor 3: Emma Blake
        User m3 = createUser("Emma Blake", "emma.blake@encenter.ro", Role.MENTOR, "HR Specialist", "EnCenter Ltd.");
        MentorProfile p3 = new MentorProfile();
        p3.setUser(m3);
        p3.setHourlyRate(0.0);
        p3.setProfileBio("Dedicated to organizational psychology, employee growth, and building strong corporate cultures.");
        p3.setExperienceSummary("5 years in talent acquisition and internal learning & development.");
        p3.setSkills(Arrays.asList("Effective Communication", "Conflict Resolution", "Public Speaking"));
        mentorProfileRepository.save(p3);

        // Mentor 4: David Kim
        User m4 = createUser("David Kim", "david.kim@encenter.ro", Role.MENTOR, "Lead Software Architect", "EnCenter Ltd.");
        m4.setRating(4.9);
        MentorProfile p4 = new MentorProfile();
        p4.setUser(m4);
        p4.setHourlyRate(0.0);
        p4.setProfileBio("Full-stack developer with a deep love for Spring Boot, PostgreSQL, and clean architecture.");
        p4.setExperienceSummary("12 years designing scalable enterprise web applications.");
        p4.setSkills(Arrays.asList("Java/Spring Boot", "Software Architecture", "PostgreSQL", "System Design"));
        mentorProfileRepository.save(p4);

        // Mentor 5: Elena Popescu
        User m5 = createUser("Elena Popescu", "elena.popescu@encenter.ro", Role.MENTOR, "Principal Data Scientist", "EnCenter Ltd.");
        MentorProfile p5 = new MentorProfile();
        p5.setUser(m5);
        p5.setHourlyRate(0.0);
        p5.setProfileBio("Turning raw data into actionable business intelligence. Love discussing algorithms and statistical models.");
        p5.setExperienceSummary("8 years in predictive modeling and big data analytics.");
        p5.setSkills(Arrays.asList("Data Analysis", "Python", "Machine Learning", "Data Visualization"));
        mentorProfileRepository.save(p5);
    }

    private void seedMentees() {
        // Mentee 1: Alex Ionescu (From Blondinele Video)
        User m1 = createUser("Alex Ionescu", "alex.ionescu@encenter.ro", Role.MENTEE, "Junior Engineer", "EnCenter Ltd.");
        MenteeProfile p1 = new MenteeProfile();
        p1.setUser(m1);
        p1.setExperienceLevel("Junior");
        p1.setLearningStyle("1:1 mentoring, Short sessions");
        p1.setAvailability("Mondays and Thursdays 10:00 AM - 11:00 AM");
        p1.setGoals(Arrays.asList("Understand AI tools", "Improve presentation skills", "Learn project management basics"));
        menteeProfileRepository.save(p1);

        // Mentee 2: Mihai Stan
        User m2 = createUser("Mihai Stan", "mihai.stan@encenter.ro", Role.MENTEE, "QA Tester", "EnCenter Ltd.");
        MenteeProfile p2 = new MenteeProfile();
        p2.setUser(m2);
        p2.setExperienceLevel("Mid-Level");
        p2.setLearningStyle("Hands-on practice");
        p2.setAvailability("Fridays 14:00 - 16:00");
        p2.setGoals(Arrays.asList("Learn automated testing", "Java/Spring Boot basics"));
        menteeProfileRepository.save(p2);

        // Mentee 3: Maria Radu
        User m3 = createUser("Maria Radu", "maria.radu@encenter.ro", Role.MENTEE, "Marketing Associate", "EnCenter Ltd.");
        MenteeProfile p3 = new MenteeProfile();
        p3.setUser(m3);
        p3.setExperienceLevel("Junior");
        p3.setLearningStyle("Video calls and reading resources");
        p3.setAvailability("Tuesdays 09:00 - 10:00");
        p3.setGoals(Arrays.asList("Data Analysis", "Understanding SEO metrics"));
        menteeProfileRepository.save(p3);

        // Mentee 4: John Doe
        User m4 = createUser("John Doe", "john.doe@encenter.ro", Role.MENTEE, "Intern", "EnCenter Ltd.");
        MenteeProfile p4 = new MenteeProfile();
        p4.setUser(m4);
        p4.setExperienceLevel("Entry-Level");
        p4.setLearningStyle("1:1 mentoring");
        p4.setAvailability("Flexible");
        p4.setGoals(Arrays.asList("Public Speaking", "Corporate Communication"));
        menteeProfileRepository.save(p4);

        // Mentee 5: Laura Vasile
        User m5 = createUser("Laura Vasile", "laura.vasile@encenter.ro", Role.MENTEE, "Mid-level Developer", "EnCenter Ltd.");
        MenteeProfile p5 = new MenteeProfile();
        p5.setUser(m5);
        p5.setExperienceLevel("Mid-Level");
        p5.setLearningStyle("Weekly mentoring");
        p5.setAvailability("Wednesdays 16:00 - 17:00");
        p5.setGoals(Arrays.asList("Software Architecture", "Leadership transition"));
        menteeProfileRepository.save(p5);
    }

    // Helper method to create base users quickly
    private User createUser(String name, String email, Role role, String title, String company) {
        User user = new User();
        user.setName(name);
        user.setEmail(email);
        user.setPassword("password123"); // Dummy password for prototype
        user.setRole(role);
        user.setTitle(title);
        user.setCompany(company);
        user.setLocation("Cluj-Napoca");

        // Give mentors some realistic starting stats
        if (role == Role.MENTOR) {
            user.setRating(4.8);
            user.setReviewCount((int) (Math.random() * 20) + 5);
            user.setSessionsCompleted((int) (Math.random() * 50) + 10);
            user.setResponseTime("Usually responds in 2 hours");
        }

        return userRepository.save(user);
    }
}