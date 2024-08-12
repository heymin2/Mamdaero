package com.mamdaero.domain.member.security.repository;

import com.mamdaero.domain.member.security.entity.PasswordVerify;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PasswordVerifyRepository extends JpaRepository<PasswordVerify, Long>
{
    PasswordVerify findByEmail(String email);
    @Transactional
    @Modifying(clearAutomatically = true)
    @Query("UPDATE PasswordVerify SET verifyToken = :token WHERE email = :email")
    void updateVeryfiy(@Param("token") String token, @Param("email") String email);
    @Query("SELECT p.email FROM PasswordVerify p WHERE p.email = :email AND p.verifyToken = :verify_Token")
    String verifyToken(@Param("verify_Token") String verify_Token, @Param("email") String email);
    @Transactional
    @Modifying(clearAutomatically = true)
    @Query("DELETE FROM PasswordVerify p WHERE p.codeId = :id")
    void deleteByCodeId(@Param("id") Long id);
//    @Transactional
//    @Modifying(clearAutomatically = true)
//    @Query(value = "INSERT INTO PasswordVerify (email, verifyToken) VALUES (:email, :verify_token)")
//    void insertVerify(@Param("email") String email, @Param("verify_token") String verify_token);
}
