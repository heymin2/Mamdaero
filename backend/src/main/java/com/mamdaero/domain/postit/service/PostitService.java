package com.mamdaero.domain.postit.service;

import com.mamdaero.domain.complaint.entity.Complaint;
import com.mamdaero.domain.complaint.entity.Source;
import com.mamdaero.domain.complaint.repository.ComplaintRepository;
import com.mamdaero.domain.counselor_item.exception.CounselorNotFoundException;
import com.mamdaero.domain.member.repository.MemberRepository;
import com.mamdaero.domain.notice.exception.BoardBadRequestException;
import com.mamdaero.domain.notice.exception.CommentNotFoundException;
import com.mamdaero.domain.postit.dto.request.PostitRequest;
import com.mamdaero.domain.postit.dto.response.PostitResponse;
import com.mamdaero.domain.postit.entity.Postit;
import com.mamdaero.domain.postit.repository.PoistitRepository;
import com.mamdaero.domain.postit.repository.PostitLikeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PostitService {

    private final PoistitRepository poistitRepository;
    private final PostitLikeRepository postitLikeRepository;
    private final MemberRepository memberRepository;
    private final ComplaintRepository complaintRepository;

    public List<PostitResponse> findPost(Long questionId) {
        Long memberId = 1L;

        List<Postit> postits = poistitRepository.findByQuestionId(questionId);

        return postits.stream()
                .map(postit -> {
                    String writer = memberRepository.findById(postit.getMemberId())
                            .orElseThrow(CounselorNotFoundException::new)
                            .getNickname();

                    int likeCount = postitLikeRepository.countByBoardId(postit.getId());
                    boolean isLike = postitLikeRepository.existsByBoardIdAndMemberId(postit.getId(), memberId);
                    boolean isMine = poistitRepository.existsByIdAndMemberId(postit.getId(), memberId);

                    return PostitResponse.of(postit, writer, likeCount, isLike, isMine);
                })
                .collect(Collectors.toList());
    }

    @Transactional
    public void create(Long questionId, PostitRequest request) {
        // 토큰 확인 필요
        Long memberId = 1L;

        if(request.getContent() == null) {
            throw new BoardBadRequestException();
        }

        poistitRepository.save(PostitRequest.toEntity(memberId, questionId, request));
    }

    @Transactional
    public PostitResponse update(Long questionId, Long postitId, PostitRequest request) {
        // 토큰 확인 후 본인인지 확인
        Long memberId = 1L;

        Postit post = poistitRepository.findByQuestionIdAndIdAndMemberId(questionId, postitId, memberId)
                .orElseThrow(CommentNotFoundException::new);

        post.updateContent(request.getContent());

        String writer = memberRepository.findById(post.getMemberId())
                .orElseThrow(CounselorNotFoundException::new)
                .getNickname();

        int likeCount = postitLikeRepository.countByBoardId(post.getId());
        boolean isLike = postitLikeRepository.existsByBoardIdAndMemberId(post.getId(), memberId);
        boolean isMine = poistitRepository.existsByIdAndMemberId(post.getId(), memberId);

        return PostitResponse.of(post, writer, likeCount ,isLike, isMine);
    }

    @Transactional
    public void delete(Long questionId, Long postitId, PostitRequest request) {
        // 토큰 확인 후 본인인지 확인
        Long memberId = 1L;

        Postit post = poistitRepository.findByQuestionIdAndIdAndMemberId(questionId, postitId, memberId)
                .orElseThrow(CommentNotFoundException::new);

        poistitRepository.delete(post);
    }

    @Transactional
    public boolean complaint(Long id) {
        // 토큰 확인 후 로그인한지 확인
        Long memberId = 1L;

        if(complaintRepository.existsByMemberIdAndEventSourceAndEventId(memberId, Source.POSTIT, id)) {
            return false;
        }

        complaintRepository.save(Complaint.builder()
                .eventSource(Source.POSTIT)
                .eventId(id)
                .memberId(memberId)
                .build());
        return true;
    }
}