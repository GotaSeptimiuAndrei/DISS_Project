package com.example.backend.dto.outgoing;

public record JwtResponse(
        String token,
        String role
) { }
