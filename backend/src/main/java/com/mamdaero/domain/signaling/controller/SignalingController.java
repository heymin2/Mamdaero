package com.mamdaero.domain.signaling.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
public class SignalingController {
    //offer 정보를 주고 받기 위한 websocket
    //memberId : 각 요청하는 캠의 key , roomId : 룸 아이디
    @MessageMapping("/peer/offer/{memberId}/{roomId}")
    @SendTo("/topic/peer/offer/{memberId}/{roomId}")
    public String PeerHandleOffer(@Payload String offer, @DestinationVariable(value = "roomId") String roomId,
                                  @DestinationVariable(value = "memberId") String memberId) {
        return offer;
    }

    //iceCandidate 정보를 주고 받기 위한 webSocket
    //memberId : 각 요청하는 캠의 key , roomId : 룸 아이디
    @MessageMapping("/peer/iceCandidate/{memberId}/{roomId}")
    @SendTo("/topic/peer/iceCandidate/{memberId}/{roomId}")
    public String PeerHandleIceCandidate(@Payload String candidate, @DestinationVariable(value = "roomId") String roomId,
                                         @DestinationVariable(value = "memberId") String memberId) {
        log.info("[ICECANDIDATE] {} : {}", memberId, candidate);
        return candidate;
    }
    //

    // memberId => memberId로 변환하기
    @MessageMapping("/peer/answer/{memberId}/{roomId}")
    @SendTo("/topic/peer/answer/{memberId}/{roomId}")
    public String PeerHandleAnswer(@Payload String answer, @DestinationVariable(value = "roomId") String roomId,
                                   @DestinationVariable(value = "memberId") String memberId) {
        log.info("[ANSWER] {} : {}", memberId, answer);
        return answer;
    }

    //memberId 를 받기위해 신호를 보내는 webSocket
    @MessageMapping("/call/key")
    @SendTo("/topic/call/key")
    public String callKey(@Payload String message) {
        log.info("[Key] : {}", message);
        return message;
    }

    //자신의 memberId 를 모든 연결된 세션에 보내는 webSocket
    @MessageMapping("/send/key")
    @SendTo("/topic/send/key")
    public String sendKey(@Payload String message) {
        return message;
    }

}
