package com.mamdaero.domain.notice.repository;

import com.mamdaero.domain.notice.entity.Notice;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface NoticeRepository extends JpaRepository<Notice, Long> {

    @Query("SELECT b FROM Notice b " +
            "WHERE b.title LIKE %:search%")
    Page<Notice> findByTitle(@Param("search") String search, Pageable pageable);
}
