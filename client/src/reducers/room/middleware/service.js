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

  pc.onicecandidate = (evt) => {
    if (evt.candidate) {
      store.dispatch(RoomActions.socketMsg({
        from: localUserInfo.id,
        to: participantId,
        ice: evt.candidate, type: 'ice'
      }));
    }
  };

  pc.ontrack = (evt) => {
    console.log('pc.onaddstream: ', evt);
    store.dispatch(ParticipantsEnhancerActions.enhancerSetRemoteStream(participantId, evt.streams[0]));
  };

  store.dispatch(ParticipantsEnhancerActions.enhancerInitRemoteUser(participantId, pc));

  return pc;
};

const createOffer = (pc, store, localId, remoteId) => {
  pc.createOffer({
    offerToReceiveAudio: true,
    offerToReceiveVideo: true
  })
    .then(sdp => {
      pc.setLocalDescription(sdp);
      store.dispatch(RoomActions.socketMsg({
        from: localId,
        to: remoteId,
        sdp: sdp,
        type: 'sdp-offer'
      }));
    });
};

const replaceLocalStream = (store, newStream) => {
  const localParticipantId = store.dispatch(ParticipantsEnhancerActions.enhancerGetLocalParticipantId());
  const remoteParticipants = store.dispatch(ParticipantsEnhancerActions.enhancerGetRemoteParticipants());
  store.dispatch(ParticipantsEnhancerActions.enhancerSetLocalStream(localParticipantId, newStream));

  remoteParticipants.forEach(participant => {
    participant.peerConnection.removeStream(participant.peerConnection.getLocalStreams()[0]);
    newStream.getTracks().forEach(track => participant.peerConnection.addTrack(track, newStream));
    createOffer(participant.peerConnection, store, localParticipantId, participant.id);
  });
};

export const connect = (store, socketId) => {
  store.dispatch(ParticipantsActions.initLocalUser({ id: socketId }));
};

export const getUserMedia = (store, constrains) => {
  navigator.mediaDevices.getUserMedia(constrains)
    .then((stream) => {
      const localParticipantId = store.dispatch(ParticipantsEnhancerActions.enhancerGetLocalParticipantId());
      store.dispatch(ParticipantsEnhancerActions.enhancerSetLocalStream(localParticipantId, stream));
    })
    .catch((error) => {
      store.dispatch(ParticipantsActions.errorGetUserMedia(error));
    });
};

export const onEndedShareScreen = (store) => {
  // FIXME: Get constraints from settings
  navigator.mediaDevices.getUserMedia({ video: true, audio: true })
    .then(stream => {
      replaceLocalStream(store, stream);
    })
    .finally(() => {
      store.dispatch(ParticipantsEnhancerActions.enhancerSetStateShareScreen(false));
    });
};

export const getShareScreen = (store) => {
  const gotStream = (mediaStream) => {
    replaceLocalStream(store, mediaStream);
    store.dispatch(ParticipantsEnhancerActions.enhancerSetStateShareScreen(true));
    mediaStream.getVideoTracks()[0].onended = () => onEndedShareScreen(store);
  };

  if (navigator.getDisplayMedia) {
    navigator.getDisplayMedia({video: true}).then(gotStream);
  } else if (navigator.mediaDevices.getDisplayMedia) {
      navigator.mediaDevices.getDisplayMedia({video: true}).then(gotStream);
  } else {
      navigator.mediaDevices.getUserMedia({video: { mediaSource: 'screen' }}).then(gotStream);
  }
};

export const closeShareScreen = (store) => {
  const localParticipant = store.dispatch(ParticipantsEnhancerActions.enhancerGetLocalUserInfo());
  localParticipant.stream.getTracks().forEach(track => track.stop());
  onEndedShareScreen(store);
};

export const handlePeerDisconnecting = (store, data) => {
  store.dispatch(ParticipantsEnhancerActions.enhancerParticipantDisconecting(data.id));
};

export const handlePeerConnected = (store, data) => {
  const localUserInfo = store.dispatch(ParticipantsEnhancerActions.enhancerGetLocalUserInfo());
  const participantConnection = getOrCreateConnection(store, data.id);
  createOffer(participantConnection, store, localUserInfo.id, data.id);
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