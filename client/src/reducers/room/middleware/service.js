import {
  ParticipantsActions,
  ParticipantsEnhancerActions,
  RoomActions,
} from 'actions';

const iceConfig = {
  'iceServers': [
    { 'url': 'stun:stun.l.google.com:19302' }
  ]
};

const getOrCreateConnection = (store, participantId) => {
  const participantInfo = store.dispatch(ParticipantsEnhancerActions.enhancerGetUserInfoById(participantId));
  if (participantInfo) { return participantInfo.peerConnection; }

  const localUserInfo = store.dispatch(ParticipantsEnhancerActions.enhancerGetLocalUserInfo());
  const pc = new RTCPeerConnection(iceConfig);

  if (localUserInfo.stream) {
    localUserInfo.stream.getTracks().forEach(track => pc.addTrack(track, localUserInfo.stream));
  }

  pc.onicecandidate = function (evt) {
    if (evt.candidate) {
      store.dispatch(RoomActions.socketMsg({
        from: localUserInfo.id,
        to: participantId,
        ice: evt.candidate, type: 'ice'
      }));
    }
  };

  pc.ontrack = function (evt) {
    console.log('pc.onaddstream: ', evt);
    store.dispatch(ParticipantsEnhancerActions.enhancerSetRemoteStream(participantId, evt.streams[0]));
  };

  store.dispatch(ParticipantsEnhancerActions.enhancerInitRemoteUser(participantId, pc));

  return pc;
};

export const connect = (store, socketId) => {
  store.dispatch(ParticipantsActions.initLocalUser({ id: socketId }));
};

export const getUserMedia = (store, socketId, constrains) => {
  navigator.mediaDevices.getUserMedia(constrains)
    .then((stream) => {
      store.dispatch(ParticipantsEnhancerActions.enhancerSetLocalStream(socketId, stream));
    })
    .catch((error) => {
      store.dispatch(ParticipantsActions.errorGetUserMedia(error));
    })
    .finally(() => {

    });
};

export const handlePeerDisconnecting = (store, data) => {
  store.dispatch(ParticipantsEnhancerActions.enhancerParticipantDisconecting(data.id));
};

export const handlePeerConnected = (store, data) => {
  const localUserInfo = store.dispatch(ParticipantsEnhancerActions.enhancerGetLocalUserInfo());
  const participantConnection = getOrCreateConnection(store, data.id);

  participantConnection.createOffer({
    offerToReceiveAudio: true,
    offerToReceiveVideo: true
  })
    .then(sdp => {
      participantConnection.setLocalDescription(sdp);
      store.dispatch(RoomActions.socketMsg({
        from: localUserInfo.id,
        to: data.id,
        sdp: sdp,
        type: 'sdp-offer'
      }));
    });
};

export const handlePeerMsg = (store, data) => {
  const participantConnection = getOrCreateConnection(store, data.from);

  switch(data.type) {
    case 'sdp-offer': {
      participantConnection.setRemoteDescription(new RTCSessionDescription(data.sdp))
        .then(() => participantConnection.createAnswer())
        .then((sdp) => {
          participantConnection.setLocalDescription(sdp);
          store.dispatch(RoomActions.socketMsg({
            from: data.to,
            to: data.from,
            sdp: sdp,
            type: 'sdp-answer'
          }));
        });
      break;
    }

    case 'sdp-answer': {
      participantConnection.setRemoteDescription(new RTCSessionDescription(data.sdp));
      break;
    }

    case 'ice':
      participantConnection.addIceCandidate(new RTCIceCandidate(data.ice));
      break;

    default:
  }
};