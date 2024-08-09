package com.mamdaero.domain.member.repository;

import com.mamdaero.domain.member.entity.Counselor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CounselorRepository extends JpaRepository<Counselor, Long> {

    Page<Counselor> findAllByNameContains(String counselorName, Pageable pageable);

    @Modifying
    @Query("UPDATE Counselor SET img = :img WHERE id = :id")
    void updateProfileImg(@Param("img") String img, @Param("id") String id);
}
