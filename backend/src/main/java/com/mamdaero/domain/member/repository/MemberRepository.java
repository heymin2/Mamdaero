package com.mamdaero.domain.member.repository;

import com.mamdaero.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByEmail(String email);
    boolean existsByEmail(String email);
    Optional<Member> findById(Long id);
    boolean existsById(Long id);
    boolean existsByNickname(String nickname);
    Optional<Member> findByToken(String token);
    @Modifying
    @Query("UPDATE Member m SET m.password = :password WHERE m.email = :email ")
    void modifyPassword(@Param("password") String password, @Param("email") String email);
}
