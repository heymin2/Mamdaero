package com.mamdaero.domain.member.repository;

import com.mamdaero.domain.member.entity.Counselor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CounselorRepository extends JpaRepository<Counselor, Long> {

    List<Counselor> findAllByNameContains(String counselorName);
    @Modifying
    @Query("UPDATE Counselor SET img = :img WHERE id = :id")
    void updateProfileImg(@Param("img") String img, @Param("id") String id);
}
