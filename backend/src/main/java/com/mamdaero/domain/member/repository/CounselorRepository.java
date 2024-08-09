package com.mamdaero.domain.member.repository;

import com.mamdaero.domain.member.entity.Counselor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CounselorRepository extends JpaRepository<Counselor, Long> {

//    List<Counselor> findAllByNameContains(String counselorName);

//    Page<Counselor> findAll(Pageable pageable);

    Page<Counselor> findAllByNameContains(String counselorName, Pageable pageable);
}
