import { path } from 'ramda';
import {
  ParticipantsActions,
  ParticipantsEnhancerActions,
  RoomActions,
  DevicesActions,
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

export const enumerateDevices = (store, constrains, localParticipantId) => {
  return navigator.mediaDevices.enumerateDevices(constrains)
    .then((deviceInfos) => {
      const retvl = deviceInfos.reduce((acc, deviceInfo) => ({
        ...acc,
        [deviceInfo.kind]: [
          ...(acc[deviceInfo.kind] || []),
          {
            id: deviceInfo.deviceId,
            label: deviceInfo.label
          }
        ]
      }), {});

      const hasVideo = retvl.hasOwnProperty('videoinput');
      const videoReady = hasVideo && path(['videoinput'], retvl).some(device => device.label);
      const hasMic = retvl.hasOwnProperty('audioinput');
      const micReady = hasMic && path(['audioinput'], retvl).some(device => device.label);

      store.dispatch(DevicesActions.setDevices({
        videoinput: path(['videoinput', '0', 'id'], retvl),
        audioinput: path(['audioinput', '0', 'id'], retvl),
        audiooutput: path(['audiooutput', '0', 'id'], retvl)
      }));

      store.dispatch(ParticipantsActions.setSettingDevices(localParticipantId, {
        video: {
          active: videoReady,
          enable: videoReady
        },
        audio: {
          active: micReady,
          enable: micReady
        },
      }));
    })
    .catch(() => {});
};

export const getUserMedia = (store, listConstrains, index = 0) => {
  navigator.mediaDevices.getUserMedia(listConstrains[index])
    .then((stream) => {
      const localParticipantId = store.dispatch(ParticipantsEnhancerActions.enhancerGetLocalParticipantId());
      enumerateDevices(store, listConstrains[index], localParticipantId)
        .finally(() => {
          store.dispatch(ParticipantsEnhancerActions.enhancerSetLocalStream(localParticipantId, stream));
        });
    })
    .catch((error) => {
      if (index < listConstrains.length) {
        getUserMedia(store, listConstrains, index + 1);
      } else {
        store.dispatch(ParticipantsActions.errorGetUserMedia(error));
      }
    });
};

export const onEndedShareScreen = (store) => {
  const constraintSettings = store.getState().devices;
  const localParticipantId = store.getState().participants.localUser;
  const settings = store.getState().participants.byId[localParticipantId].settings;

  if (settings.audio.active || settings.video.active) {
    const constraints = {
      audio: settings.audio.active
        ? { deviceId: constraintSettings.audioinput ? { exact: constraintSettings.audioinput } : undefined }
        : false,
      video: settings.video.active
        ? { deviceId: constraintSettings.videoinput ? { exact: constraintSettings.videoinput } : undefined }
        : false
    };

    navigator.mediaDevices.getUserMedia(constraints)
      .then(stream => {
        replaceLocalStream(store, stream);
      })
      .finally(() => {
        store.dispatch(ParticipantsActions.setStateShareScreen(false));
      });
  }
};

export const getShareScreen = (store) => {
  try {
    const gotStream = (mediaStream) => {
      replaceLocalStream(store, mediaStream);
      store.dispatch(ParticipantsActions.setStateShareScreen(true));
      mediaStream.getVideoTracks()[0].onended = () => onEndedShareScreen(store);
    };

    if (navigator.getDisplayMedia) {
      navigator.getDisplayMedia({video: true}).then(gotStream);
    } else if (navigator.mediaDevices.getDisplayMedia) {
      navigator.mediaDevices.getDisplayMedia({video: true}).then(gotStream);
    } else {
      navigator.mediaDevices.getUserMedia({video: { mediaSource: 'screen' }}).then(gotStream);
    }
  } catch(err) {
    console.log(err);
  }
};

export const closeShareScreen = (store) => {
  const localParticipant = store.dispatch(ParticipantsEnhancerActions.enhancerGetLocalUserInfo());
  localParticipant.stream.getTracks().forEach(track => track.stop());
  onEndedShareScreen(store);
};

export const setStream = (store, stream) => {
  replaceLocalStream(store, stream);
};

export const handlePeerDisconnecting = (store, data) => {
  store.dispatch(ParticipantsEnhancerActions.enhancerParticipantDisconecting(data.id));
};

export const handlePeerConnected = (store, data) => {
  const localUserInfo = store.dispatch(ParticipantsEnhancerActions.enhancerGetLocalUserInfo());
  const participantConnection = getOrCreateConnection(store, data.id);
  createOffer(participantConnection, store, localUserInfo.id, data.id);
};

export const getSettingsById = (store, participantId) => {
  return path(['participants', 'byId', participantId, 'settings'], store.getState());
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

          // TODO: Don't re-send this when change to share screen
          const mySettings = getSettingsById(store, data.to);
          store.dispatch(ParticipantsActions.socketMsg({
            from: data.to,
            to: data.from,
            type: 'setting-devices',
            settings: mySettings
          }));
        });
      break;
    }

    case 'sdp-answer': {
      participantConnection.setRemoteDescription(new RTCSessionDescription(data.sdp));

      // TODO: Don't re-send this when change to share screen
      const mySettings = getSettingsById(store, data.to);
      store.dispatch(ParticipantsActions.socketMsg({
        from: data.to,
        to: data.from,
        type: 'setting-devices',
        settings: mySettings
      }));
      break;
    }

    case 'ice':
      participantConnection.addIceCandidate(new RTCIceCandidate(data.ice));
      break;

    default:
  }
};

export const handleParticipantMsg = (store, data) => {
  switch(data.type) {
    case 'setting-devices': {
      const participantId = data.from;
      store.dispatch(ParticipantsActions.setSettingDevices(participantId, data.settings));
      break;
    }

    default:
  }
};
