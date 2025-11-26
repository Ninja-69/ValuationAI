class SoundManager {
    constructor() {
        this.enabled = true;
        this.volume = 0.3;
        this.sounds = {};
        this.initSounds();
    }

    initSounds() {
        // Create audio contexts for different sounds
        this.sounds = {
            click: this.createBeep(800, 0.05),
            success: this.createChime([523, 659, 784], 0.15),
            error: this.createBeep(200, 0.2),
            hover: this.createBeep(1000, 0.03),
        };
    }

    createBeep(frequency, duration) {
        return () => {
            if (!this.enabled) return;

            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.frequency.value = frequency;
            oscillator.type = 'sine';

            gainNode.gain.setValueAtTime(this.volume, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(
                0.01,
                audioContext.currentTime + duration
            );

            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + duration);
        };
    }

    createChime(frequencies, duration) {
        return () => {
            if (!this.enabled) return;

            frequencies.forEach((freq, index) => {
                setTimeout(() => {
                    this.createBeep(freq, duration / frequencies.length)();
                }, index * (duration / frequencies.length) * 1000);
            });
        };
    }

    play(soundName) {
        if (this.sounds[soundName]) {
            this.sounds[soundName]();
        }
    }

    toggle() {
        this.enabled = !this.enabled;
        return this.enabled;
    }

    setVolume(volume) {
        this.volume = Math.max(0, Math.min(1, volume));
    }
}

export const soundManager = new SoundManager();

export const playClick = () => soundManager.play('click');
export const playSuccess = () => soundManager.play('success');
export const playError = () => soundManager.play('error');
export const playHover = () => soundManager.play('hover');
export const toggleSound = () => soundManager.toggle();
