// import socket from './socket';

// export const joinRoom = (roomName) => {
//   return new Promise((res) => {
//     socket.emit('user:join-room', roomName, res);
//   });
// };

// export const peerConnected = () => {
//   return new Promise((res) => {
//     socket.on('peer:connected', (data) => {
//       const iceConfig = { 'iceServers': [{ 'url': 'stun:stun.l.google.com:19302' }]};
//       const offerOptions = {
//         offerToReceiveAudio: true,
//         offerToReceiveVideo: true
//       };
//       const localUserInfo = _store.dispatch(ParticipantsEnhancerActions.enhancerGetLocalUserInfo());
//       const createPeerConnection = () => {
//         const pc = new RTCPeerConnection(iceConfig);
//         localUserInfo.localStream.getTracks().forEach(track => pc.addTrack(track, localUserInfo.localStream));
//         pc.onicecandidate = function (evt) {
//           console.log('pc.onicecandidate: ', evt);
//         };
//         pc.onaddstream = function (evt) {
//           console.log('pc.onaddstream: ', evt);
//         };
//         return pc;
//       };
//       const makeOffer = () => {
//         const pc = createPeerConnection();
//         pc.createOffer(offerOptions)
//           .then(sdp => {
//             pc.setLocalDescription(sdp);
//             // socket.emit('msg', { by: currentId, to: id, sdp: sdp, type: 'sdp-offer' });
//           });

//         return pc;
//       };

//       _store.dispatch(ParticipantsEnhancerActions.enhancerInitRemoteUser(data.id, makeOffer()));
//       res(data.id);
//     });
//   });
// };
