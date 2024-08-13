package com.mamdaero.domain.selftest.repository;

import com.mamdaero.domain.selftest.dto.response.MemberSelftestResponseDto;
import com.mamdaero.domain.selftest.entity.MemberSelftestList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MemberSelftestListRepository extends JpaRepository<MemberSelftestList, Integer> {
    @Query("SELECT new com.mamdaero.domain.selftest.dto.response.MemberSelftestResponseDto(" +
            "m.id, m.selftest.id, m.selftestTotalScore) " +
            "FROM MemberSelftestList m " +
            "WHERE m.member.id = :memberId AND m.id IN (" +
            "   SELECT MAX(sub.id) FROM MemberSelftestList sub " +
            "   WHERE sub.member.id = :memberId " +
            "   GROUP BY sub.selftest.id" +
            ")")
    List<MemberSelftestResponseDto> findLatestByMemberIdAndSelftestId(@Param("memberId") Long memberId);

}
