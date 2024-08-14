package com.mamdaero.domain.selftest.repository;

import com.mamdaero.domain.selftest.entity.MemberSelftestList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MemberSelftestListRepository extends JpaRepository<MemberSelftestList, Integer> {
    @Query("SELECT m " +
            "FROM MemberSelftestList m " +
            "WHERE m.member.id = :memberId AND m.id IN (" +
            "   SELECT MAX(sub.id) FROM MemberSelftestList sub " +
            "   WHERE sub.member.id = :memberId " +
            "   GROUP BY sub.selftest.id" +
            ")")
    List<MemberSelftestList> findLatestByMemberIdAndSelftestId(@Param("memberId") Long memberId);

    List<MemberSelftestList> findByMemberId(@Param("memberId") Long memberId);

    MemberSelftestList findByMemberIdAndId(@Param("memberId") Long memberId, @Param("id") Integer id);
}
