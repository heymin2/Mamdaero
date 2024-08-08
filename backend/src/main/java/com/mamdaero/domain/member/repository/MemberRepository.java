package com.mamdaero.domain.member.repository;

import com.mamdaero.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
//    Optional<Member> findById(Long id);
    Optional<Member> findByEmail(String email);
    boolean existsByEmail(String email);
    Optional<Member> findById(Long id);
    boolean existsById(Long id);
    boolean existsByNickname(String nickname);
    Optional<Member> findByToken(String token);
}
