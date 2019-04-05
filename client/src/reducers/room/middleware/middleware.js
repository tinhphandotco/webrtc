import io from 'socket.io-client';
import { SOCKET_URL } from 'config';
import * as service from './service';

import {
  // RoomTypes,
  ParticipantsActions,
  ParticipantsTypes,
  ParticipantsEnhancerActions
} from 'actions';

// OPTIMIZE: Need refactor this shit!
const roomMiddleware = store => {
  const socket = io(SOCKET_URL);

  socket.on('connect', () => service.connect(store, socket.id));

  socket.on('peer:msg', (data) => {
    window.setTimeout(() => {
      const iceConfig = { 'iceServers': [{ 'url': 'stun:stun.l.google.com:19302' }]};
    const localUserInfo = store.dispatch(ParticipantsEnhancerActions.enhancerGetLocalUserInfo());
    let pc = store.dispatch(ParticipantsEnhancerActions.enhancerGetUserInfoById(data.from));
    console.log('peer:msg', data, pc);

    const createPeerConnection = () => {
      const pc = new RTCPeerConnection(iceConfig);
      localUserInfo.stream.getTracks().forEach(track => pc.addTrack(track, localUserInfo.stream));
      pc.onicecandidate = function (evt) {
        socket.emit('peer:msg', { from: data.to, to: data.from, ice: evt.candidate, type: 'ice' });
      };
      pc.onaddstream = function (evt) {
        console.log('pc.onaddstream: ', evt);
        store.dispatch(ParticipantsEnhancerActions.enhancerSetRemoteStream(data.from, evt.stream));
      };
      return pc;
    };

    if (!pc) {
      pc = createPeerConnection();
      store.dispatch(ParticipantsEnhancerActions.enhancerInitRemoteUser(data.from, pc));
    } else {
      pc = pc.peerConnection;
    }

    switch(data.type) {
      case 'sdp-offer': {
        pc.setRemoteDescription(new RTCSessionDescription(data.sdp))
          .then(() => pc.createAnswer())
          .then((sdp) => {
            console.log('sdp-answer');
            pc.setLocalDescription(sdp);
            socket.emit('peer:msg', { from: data.to, to: data.from, sdp: sdp, type: 'sdp-answer' });
          });
        break;
      }

      case 'sdp-answer': {
        pc.setRemoteDescription(new RTCSessionDescription(data.sdp));
        break;
      }

      case 'ice':
        if (data.ice) {
          pc.addIceCandidate(new RTCIceCandidate(data.ice));
        }
        break;
    }
    }, 3000);
  });

  socket.on('peer:connected', (data) => {
    const iceConfig = { 'iceServers': [{ 'url': 'stun:stun.l.google.com:19302' }]};
    const offerOptions = {
      offerToReceiveAudio: true,
      offerToReceiveVideo: true
    };
    const localUserInfo = store.dispatch(ParticipantsEnhancerActions.enhancerGetLocalUserInfo());

    const createPeerConnection = () => {
      const pc = new RTCPeerConnection(iceConfig);
      localUserInfo.stream.getTracks().forEach(track => pc.addTrack(track, localUserInfo.stream));
      pc.onicecandidate = function (evt) {
        socket.emit('peer:msg', { from: localUserInfo.id, to: data.id, ice: evt.candidate, type: 'ice' });
      };
      pc.onaddstream = function (evt) {
        console.log('pc.onaddstream: ', evt);
        store.dispatch(ParticipantsEnhancerActions.enhancerSetRemoteStream(data.id, evt.stream));
      };
      return pc;
    };

    const makeOffer = () => {
      const pc = createPeerConnection();
      pc.createOffer(offerOptions)
        .then(sdp => {
          pc.setLocalDescription(sdp);
          socket.emit('peer:msg', { from: localUserInfo.id, to: data.id, sdp: sdp, type: 'sdp-offer' });
        });

      return pc;
    };

    store.dispatch(ParticipantsEnhancerActions.enhancerInitRemoteUser(data.id, makeOffer()));
  });

  return next => action => {
    if (action.type === ParticipantsTypes.GET_USER_MEDIA) {
      service.getUserMedia(store, socket.id, action.payload.constrains);
    }

    next(action);
  };
};

export default roomMiddleware;