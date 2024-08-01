package com.mamdaero.domain.counselor_board.repository;

import com.mamdaero.domain.counselor_board.entity.CounselorBoard;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface BoardRepository extends JpaRepository<CounselorBoard, Long> {
    boolean existsByIdAndMemberId(Long id, Long memberId);
    Page<CounselorBoard> findAllByOrderByCreatedAtDesc(Pageable pageable);
    Page<CounselorBoard> findAllByOrderByCreatedAt(Pageable pageable);

    @Query("SELECT b FROM CounselorBoard b " +
            "LEFT JOIN CounselorBoardLike l ON b.id = l.boardId " +
            "GROUP BY b.id " +
            "ORDER BY COUNT(l.id) DESC, b.createdAt DESC")
    Page<CounselorBoard> findAllOrderedByLikes(Pageable pageable);

    @Query("SELECT b FROM CounselorBoard b " +
            "LEFT JOIN CounselorBoardComment l ON b.id = l.boardId " +
            "GROUP BY b.id " +
            "ORDER BY COUNT(l.id) DESC, b.createdAt DESC")
    Page<CounselorBoard> findAllOrderedByComment(Pageable pageable);
}