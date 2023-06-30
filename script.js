const localVideo = document.getElementById("local-video");
const remoteVideo = document.getElementById("remote-video");
const messageForm = document.getElementById("chat-form");
const messageInput = document.getElementById("message-input");
const messageList = document.getElementById("messages");

const constraints = { audio: true, video: true };

let localStream, remoteStream, peerConnection;

async function start() {
  try {
    localStream = await navigator.mediaDevices.getUserMedia(constraints);
    localVideo.srcObject = localStream;
  } catch (error) {
    console.error("Error getting user media", error);
  }
}

function handleIceCandidate(event) {
  const candidate = event.candidate;
  if (candidate) {
    const message = JSON.stringify({ type: "candidate", candidate: candidate });
    sendMessage(message);
  }
}

function handleTrack(event) {
  remoteStream = event.streams[0];
  remoteVideo.srcObject = remoteStream;
}

async function handleOffer(offer)