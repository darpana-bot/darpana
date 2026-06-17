#!/usr/bin/env python3
"""
DARPANA — Generate Sadhana Audio Layers
=======================================

Generates 8 WAV files for Ruang Sadhana:
  - 4 ambient backgrounds (one per practice theme)
  - 4 binaural beats (one per brainwave/emotion)

Output: /home/z/my-project/darpana/public/audio/

All files are 60 seconds long, stereo, 44.1kHz, 16-bit PCM.
Designed to loop seamlessly.

Usage:
  python3 generate-sadhana-audio-layers.py
"""

import numpy as np
from scipy.io import wavfile
import os
from pathlib import Path

OUTPUT_DIR = Path('/home/z/my-project/darpana/public/audio')
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

SAMPLE_RATE = 44100
DURATION = 60  # seconds (will loop)
SAMPLES = SAMPLE_RATE * DURATION


def normalize(audio, target_peak=0.7):
    """Normalize audio to target peak amplitude."""
    if len(audio) == 0:
        return audio
    peak = np.max(np.abs(audio))
    if peak == 0:
        return audio
    return audio * (target_peak / peak)


def apply_fade(audio, fade_samples=2000):
    """Apply gentle fade-in and fade-out to avoid clicks at loop boundaries."""
    fade_in = np.linspace(0, 1, fade_samples)
    fade_out = np.linspace(1, 0, fade_samples)
    audio[:fade_samples] *= fade_in
    audio[-fade_samples:] *= fade_out
    return audio


def save_wav(filename, audio, sample_rate=SAMPLE_RATE):
    """Save audio as 16-bit stereo WAV."""
    # Ensure stereo
    if audio.ndim == 1:
        audio = np.column_stack([audio, audio])
    # Convert to 16-bit
    audio_int16 = np.clip(audio * 32767, -32768, 32767).astype(np.int16)
    wavfile.write(filename, sample_rate, audio_int16)
    print(f"✓ {filename} ({os.path.getsize(filename) / 1024:.1f} KB)")


# =============================================================================
# AMBIENT BACKGROUND GENERATORS
# =============================================================================

def gen_gentle_rain():
    """Gentle rain — for anxious (calming, white-noise-like with patter)"""
    print("Generating ambient: gentle rain...")
    # Base: filtered white noise (pink-ish)
    np.random.seed(42)
    noise = np.random.randn(SAMPLES)
    # Simple low-pass filter via convolution (moving average)
    kernel_size = 30
    kernel = np.ones(kernel_size) / kernel_size
    filtered = np.convolve(noise, kernel, mode='same')
    # Add subtle high-frequency patter (lighter droplets)
    t = np.arange(SAMPLES) / SAMPLE_RATE
    patter = 0.15 * np.random.randn(SAMPLES) * (0.5 + 0.5 * np.sin(2 * np.pi * 0.7 * t))
    # Slow amplitude modulation (rain intensity varies)
    mod = 0.7 + 0.3 * np.sin(2 * np.pi * 0.05 * t)
    audio = (filtered * 0.6 + patter * 0.3) * mod
    audio = normalize(audio, 0.4)  # quieter for background
    audio = apply_fade(audio)
    save_wav(OUTPUT_DIR / 'ambient-rain.wav', audio)


def gen_ocean_waves():
    """Slow ocean waves — for tired (deep, rhythmic, restorative)"""
    print("Generating ambient: ocean waves...")
    t = np.arange(SAMPLES) / SAMPLE_RATE
    # Layered low-frequency noise modulated by slow wave (mimics waves)
    np.random.seed(7)
    base_noise = np.random.randn(SAMPLES)
    # Heavy low-pass to make it deep
    kernel_size = 200
    kernel = np.ones(kernel_size) / kernel_size
    deep = np.convolve(base_noise, kernel, mode='same')
    # Wave envelope: ~6 second period (slow waves)
    wave_envelope = 0.5 + 0.5 * np.sin(2 * np.pi * (1/8) * t - np.pi/2)
    # Second wave at different freq for natural variation
    wave_envelope2 = 0.3 + 0.3 * np.sin(2 * np.pi * (1/5) * t + 1.2)
    envelope = np.clip(wave_envelope + wave_envelope2 * 0.4, 0, 1)
    audio = deep * envelope
    # Add very low rumble
    rumble = 0.1 * np.sin(2 * np.pi * 0.2 * t)
    audio += rumble
    audio = normalize(audio, 0.45)
    audio = apply_fade(audio)
    save_wav(OUTPUT_DIR / 'ambient-ocean.wav', audio)


def gen_flowing_stream():
    """Flowing stream — for angry (cooling, flowing, water-like)"""
    print("Generating ambient: flowing stream...")
    t = np.arange(SAMPLES) / SAMPLE_RATE
    np.random.seed(13)
    # Higher-frequency water sound (babbling brook)
    noise = np.random.randn(SAMPLES)
    kernel_size = 10
    kernel = np.ones(kernel_size) / kernel_size
    water = np.convolve(noise, kernel, mode='same')
    # Add bubbling — modulated high freq
    bubble = 0.15 * np.sin(2 * np.pi * (200 + 50 * np.sin(2 * np.pi * 0.3 * t)) * t)
    # Flow variation
    flow_mod = 0.6 + 0.4 * np.sin(2 * np.pi * 0.15 * t)
    audio = (water * 0.7 + bubble * 0.2) * flow_mod
    audio = normalize(audio, 0.4)
    audio = apply_fade(audio)
    save_wav(OUTPUT_DIR / 'ambient-stream.wav', audio)


def gen_singing_bowl():
    """Singing bowl drone — for sanskara (sacred, harmonic, sustained)"""
    print("Generating ambient: singing bowl...")
    t = np.arange(SAMPLES) / SAMPLE_RATE
    # Fundamental + harmonics (like a Tibetan bowl)
    fundamental = 220  # A3
    freqs = [fundamental, fundamental * 2.01, fundamental * 3.02, fundamental * 4.5]
    amps = [0.5, 0.3, 0.15, 0.05]
    audio = np.zeros(SAMPLES)
    for f, a in zip(freqs, amps):
        # Slight detuning for organic feel
        detune = 1 + 0.001 * np.sin(2 * np.pi * 0.1 * t)
        audio += a * np.sin(2 * np.pi * f * detune * t)
    # Slow amplitude pulse (like bowl resonating)
    pulse = 0.7 + 0.3 * np.sin(2 * np.pi * 0.1 * t)
    audio *= pulse
    # Very subtle reverb-like effect (delay + decay)
    delay_samples = int(0.15 * SAMPLE_RATE)
    echo = np.zeros(SAMPLES)
    echo[delay_samples:] = audio[:-delay_samples] * 0.3
    audio += echo
    audio = normalize(audio, 0.35)
    audio = apply_fade(audio)
    save_wav(OUTPUT_DIR / 'ambient-bowl.wav', audio)


# =============================================================================
# BINAURAL BEATS GENERATORS
# =============================================================================

def gen_binaural(base_freq, beat_freq, filename, label):
    """
    Generate binaural beats: different frequency in each ear.
    base_freq: the carrier tone (e.g. 200 Hz)
    beat_freq: the binaural beat frequency (e.g. 10 Hz for alpha)
    Left ear: base_freq
    Right ear: base_freq + beat_freq
    Brain perceives beat_freq difference → entrains to that brainwave.
    """
    print(f"Generating binaural: {label} ({beat_freq} Hz)...")
    t = np.arange(SAMPLES) / SAMPLE_RATE
    # Soft sine wave carrier
    left = np.sin(2 * np.pi * base_freq * t)
    right = np.sin(2 * np.pi * (base_freq + beat_freq) * t)
    # Soft attack/release envelope (gentle pulsing)
    envelope = 0.6 + 0.4 * np.sin(2 * np.pi * (beat_freq / 4) * t)
    left *= envelope
    right *= envelope
    # Combine as stereo
    stereo = np.column_stack([left, right])
    # Normalize quietly — binaural should be subtle
    stereo = normalize(stereo, 0.25)
    # Apply fade
    fade = 2000
    fade_in = np.linspace(0, 1, fade)
    fade_out = np.linspace(1, 0, fade)
    stereo[:fade] *= fade_in[:, None]
    stereo[-fade:] *= fade_out[:, None]
    save_wav(filename, stereo)


def gen_all_binaurals():
    """Generate 4 binaural beat files for each practice."""
    # Anxious → Alpha 10 Hz (relaxation, calm focus)
    # Carrier at 200 Hz (low, soothing)
    gen_binaural(200, 10, OUTPUT_DIR / 'binaural-alpha-10hz.wav', 'Alpha 10Hz — Anxious')
    # Tired → Theta 6 Hz (deep restoration, meditation)
    # Carrier at 180 Hz (slightly lower for deeper feel)
    gen_binaural(180, 6, OUTPUT_DIR / 'binaural-theta-6hz.wav', 'Theta 6Hz — Tired')
    # Angry → Alpha 8 Hz (cooling, balanced calm)
    # Carrier at 220 Hz
    gen_binaural(220, 8, OUTPUT_DIR / 'binaural-alpha-8hz.wav', 'Alpha 8Hz — Angry')
    # Sanskara → Schumann 7.83 Hz (Earth resonance, alignment)
    # Carrier at 250 Hz
    gen_binaural(250, 7.83, OUTPUT_DIR / 'binaural-schumann-7.83hz.wav', 'Schumann 7.83Hz — Sanskara')


# =============================================================================
# MAIN
# =============================================================================

def main():
    print("=" * 60)
    print("  DARPANA — Sadhana Audio Layer Generator")
    print("=" * 60)
    print()

    print("--- AMBIENT BACKGROUNDS ---")
    gen_gentle_rain()
    gen_ocean_waves()
    gen_flowing_stream()
    gen_singing_bowl()
    print()

    print("--- BINAURAL BEATS ---")
    gen_all_binaurals()
    print()

    print("=" * 60)
    print("  DONE — All audio layers generated!")
    print("=" * 60)
    print()
    print("Files in", OUTPUT_DIR)
    for f in sorted(OUTPUT_DIR.glob('*.wav')):
        size = os.path.getsize(f) / 1024
        print(f"  {f.name:40s} {size:8.1f} KB")


if __name__ == '__main__':
    main()
