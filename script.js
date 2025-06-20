const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const volumeSlider = player.querySelector('input[name="volume"]');
const playbackSpeedSlider = player.querySelector('input[name="playbackRate"]');
const controls = player.querySelector('.player__controls');
// Override video src to a public video URL (for testing only)
video.src = 'https://www.w3schools.com/html/mov_bbb.mp4';

// Create an error message element dynamically and append it to player
const errorMessage = document.createElement('div');
errorMessage.textContent = 'Sorry, the video failed to load.';
errorMessage.style.color = 'red';
errorMessage.style.padding = '10px';
errorMessage.style.textAlign = 'center';
errorMessage.style.display = 'none';
errorMessage.style.position = 'absolute';
errorMessage.style.top = '50%';
errorMessage.style.left = '50%';
errorMessage.style.transform = 'translate(-50%, -50%)';
errorMessage.style.backgroundColor = 'rgba(0,0,0,0.7)';
errorMessage.style.borderRadius = '5px';
errorMessage.style.width = '80%';
errorMessage.style.userSelect = 'none';
player.appendChild(errorMessage);

// Toggle play/pause video
function togglePlay() {
  if (video.paused) video.play();
  else video.pause();
}

// Update toggle button icon
function updateButton() {
  toggle.textContent = video.paused ? '►' : '❚ ❚';
}

// Update progress bar as video plays
function handleProgress() {
  if (!video.duration) return;
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

// Scrub video to clicked position on progress bar
function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

// Update video volume
function handleVolumeUpdate() {
  video.volume = this.value;
}

// Update playback speed
function handlePlaybackSpeedUpdate() {
  video.playbackRate = this.value;
}

// Skip video forward/backward
function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

// Handle video loading error
function handleVideoError() {
  // Hide video and controls
  video.style.display = 'none';
  controls.style.display = 'none';

  // Show error message
  errorMessage.style.display = 'block';
}

// Event listeners
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);
video.addEventListener('error', handleVideoError);

toggle.addEventListener('click', togglePlay);

skipButtons.forEach(button => button.addEventListener('click', skip));

volumeSlider.addEventListener('change', handleVolumeUpdate);
volumeSlider.addEventListener('mousemove', handleVolumeUpdate);

playbackSpeedSlider.addEventListener('change', handlePlaybackSpeedUpdate);
playbackSpeedSlider.addEventListener('mousemove', handlePlaybackSpeedUpdate);

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', e => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

// ** Additional functionality to sync toggle button initially and support keyboard accessibility **

// Sync toggle button on load
updateButton();

// Keyboard accessibility on toggle button: space/enter toggle play/pause
toggle.addEventListener('keydown', e => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    togglePlay();
  }
});
