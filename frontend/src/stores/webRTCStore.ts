// src/store/useWebRTCStore.ts
import { create } from 'zustand';
import { Client } from '@stomp/stompjs';
import useAuthStore from './authStore';

interface WebRTCState {
  memberId: number;
  reservationId: number;
  localStream: MediaStream | null;
  remoteStreams: Map<string, MediaStream>;
  stompClient: Client | null;
  dataChannels: Map<string, RTCDataChannel>;
  isCameraOn: boolean;
  isMicOn: boolean;
  isMediaConnected: boolean;
  chatLog: string[];
  connectMedia: () => Promise<void>;
  disconnectMedia: () => void;
  toggleCamera: () => void;
  toggleMic: () => void;
  setReservationId: (reservationId: number) => void;
  setLocalStream: (stream: MediaStream) => void;
  addRemoteStream: (key: string, stream: MediaStream) => void;
  setStompClient: (client: Client) => void;
  addDataChannel: (key: string, channel: RTCDataChannel) => void;
  addChatLog: (message: string) => void;
}

export const useWebRTCStore = create<WebRTCState>((set, get) => ({
  memberId: 0,
  reservationId: 0,
  localStream: null,
  remoteStreams: new Map(),
  stompClient: null,
  dataChannels: new Map(),
  isCameraOn: false,
  isMicOn: false,
  isMediaConnected: false,
  chatLog: [],
  setReservationId: reservationId => set({ reservationId }),
  setLocalStream: stream => set({ localStream: stream }),
  addRemoteStream: (key, stream) => {
    const newMap = new Map(get().remoteStreams);
    newMap.set(key, stream);
    set({ remoteStreams: newMap });
  },
  setStompClient: client => set({ stompClient: client }),
  addDataChannel: (key, channel) => {
    const newMap = new Map(get().dataChannels);
    newMap.set(key, channel);
    set({ dataChannels: newMap });
  },
  toggleCamera: () =>
    set(state => {
      if (state.localStream) {
        const videoTrack = state.localStream.getVideoTracks()[0];
        videoTrack.enabled = !videoTrack.enabled;
      }
      return { isCameraOn: !state.isCameraOn };
    }),
  toggleMic: () =>
    set(state => {
      if (state.localStream) {
        const audioTrack = state.localStream.getAudioTracks()[0];
        audioTrack.enabled = !audioTrack.enabled;
      }
      return { isMicOn: !state.isMicOn };
    }),
  connectMedia: async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      console.log('Media connected');
      set({ localStream: stream, isMediaConnected: true, isCameraOn: true, isMicOn: true });
    } catch (error) {
      console.error('Error accessing media devices:', error);
    }
  },
  disconnectMedia: () => {
    set(state => {
      if (state.localStream) {
        state.localStream.getTracks().forEach(track => track.stop());
      }
      console.log('Media disconnected');
      return { localStream: null, isMediaConnected: false, isCameraOn: false, isMicOn: false };
    });
  },
  addChatLog: message => {
    set(state => {
      const newLog = [message, ...state.chatLog];
      return { chatLog: newLog };
    });
  },
}));
