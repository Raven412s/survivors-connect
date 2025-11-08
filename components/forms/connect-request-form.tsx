'use client';

import React, { useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, Mic, Square, MapPin, Loader2, FlipHorizontal } from "lucide-react";
import Image from 'next/image';

type Props = { onSuccess?: () => void };

export default function ConnectRequestForm({ onSuccess }: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const [stream, setStream] = useState<MediaStream | null>(null);
  const [photoBlob, setPhotoBlob] = useState<Blob | null>(null);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [recording, setRecording] = useState(false);
  const [latLng, setLatLng] = useState<{ lat: number; lng: number; accuracy?: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const [usingFrontCamera, setUsingFrontCamera] = useState(false);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    address: '',
    category: '',
    message: '',
  });

  const categories = [
    { value: 'medical', label: 'Medical' },
    { value: 'legal', label: 'Legal' },
    { value: 'counselling', label: 'Counselling' },
    { value: 'shelter', label: 'Shelter' },
    { value: 'police', label: 'Police' },
    { value: 'other', label: 'Other' },
  ];

  // Camera functions
  async function startCamera(useFrontCamera = false) {
    if (stream) {
      stopCamera();
    }
    
    try {
      const constraints = { 
        video: { 
          facingMode: useFrontCamera ? 'user' : 'environment' 
        } 
      };
      
      const s = await navigator.mediaDevices.getUserMedia(constraints);
      setStream(s);
      setUsingFrontCamera(useFrontCamera);
      
      if (videoRef.current) {
        videoRef.current.srcObject = s;
        videoRef.current.play();
      }
    } catch (err) {
      console.error('Camera error', err);
      alert('Camera access denied or unavailable.');
    }
  }

  function stopCamera() {
    if (stream) {
      stream.getTracks().forEach(t => t.stop());
      setStream(null);
    }
  }

  function switchCamera() {
    if (stream) {
      startCamera(!usingFrontCamera);
    }
  }

  function capturePhoto() {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current!;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d')!;
    
    // Flip the image if using front camera to match mirror view
    if (usingFrontCamera) {
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
    }
    
    ctx.drawImage(video, 0, 0);
    
    // Reset transformation
    if (usingFrontCamera) {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
    }
    
    canvas.toBlob(blob => {
      if (blob) {
        setPhotoBlob(blob);
        stopCamera();
      }
    }, 'image/jpeg', 0.85);
  }

  // Audio recording functions
  async function startRecording() {
    try {
      const micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(micStream);
      audioChunksRef.current = [];
      mediaRecorderRef.current.ondataavailable = (e: BlobEvent) => {
        if (e.data && e.data.size > 0) audioChunksRef.current.push(e.data);
      };
      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        setAudioBlob(blob);
        micStream.getTracks().forEach(t => t.stop());
      };
      mediaRecorderRef.current.start();
      setRecording(true);
    } catch (err) {
      console.error('Mic error', err);
      alert('Microphone access denied or unavailable.');
    }
  }

  function stopRecording() {
    const r = mediaRecorderRef.current;
    if (r && r.state !== 'inactive') {
      r.stop();
      setRecording(false);
    }
  }

  // Location function
  function fetchLocation() {
    if (!navigator.geolocation) {
      alert('Geolocation not supported');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      pos => {
        setLatLng({ 
          lat: pos.coords.latitude, 
          lng: pos.coords.longitude, 
          accuracy: pos.coords.accuracy 
        });
      },
      err => {
        console.error('Geo error', err);
        alert('Location access denied or unavailable.');
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }

  // Form submission
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.phone || !form.category) {
      alert('Name, phone and category are required');
      return;
    }

    setLoading(true);
    try {
      const fd = new FormData();
      fd.append('name', form.name);
      fd.append('phone', form.phone);
      fd.append('address', form.address);
      fd.append('category', form.category);
      fd.append('message', form.message);
      if (photoBlob) fd.append('photo', photoBlob, 'photo.jpg');
      if (audioBlob) fd.append('audio', audioBlob, 'voice.webm');
      if (latLng) {
        fd.append('lat', String(latLng.lat));
        fd.append('lng', String(latLng.lng));
        if (latLng.accuracy) fd.append('accuracy', String(latLng.accuracy));
      }

      const res = await fetch('/api/connect-request', {
        method: 'POST',
        body: fd,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Server error');

      alert('Request submitted — help team will contact you soon');
      // Reset form
      setForm({ name: '', phone: '', address: '', category: '', message: '' });
      setPhotoBlob(null);
      setAudioBlob(null);
      setLatLng(null);
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error(err);
      alert('Submission failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Information */}
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name *</Label>
          <Input
            id="name"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            placeholder="Enter your full name"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number *</Label>
          <Input
            id="phone"
            type="tel"
            value={form.phone}
            onChange={e => setForm({ ...form, phone: e.target.value })}
            placeholder="Enter your phone number"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            value={form.address}
            onChange={e => setForm({ ...form, address: e.target.value })}
            placeholder="Enter your address (optional)"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Help Category *</Label>
          <Select value={form.category} onValueChange={(value) => setForm({ ...form, category: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select help category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            value={form.message}
            onChange={e => setForm({ ...form, message: e.target.value })}
            placeholder="Describe your situation (optional)"
            rows={3}
          />
        </div>
      </div>

      {/* Camera Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Camera className="w-5 h-5" />
            Take a Photo
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {!photoBlob ? (
            <div className="space-y-3">
              <video 
                ref={videoRef} 
                className={`rounded-lg border ${stream ? 'block' : 'hidden'} max-w-full mx-auto ${
                  usingFrontCamera ? '-scale-x-100' : ''
                }`} 
                playsInline 
                muted
                style={{ maxHeight: '300px' }}
              />
              <div className="flex gap-2 flex-wrap justify-center">
                {!stream ? (
                  <>
                    <Button type="button" onClick={() => startCamera(false)} variant="outline" size="sm">
                      <Camera className="w-4 h-4 mr-2" />
                      Back Camera
                    </Button>
                    <Button type="button" onClick={() => startCamera(true)} variant="outline" size="sm">
                      <Camera className="w-4 h-4 mr-2" />
                      Front Camera
                    </Button>
                  </>
                ) : (
                  <>
                    <Button 
                      type="button" 
                      onClick={capturePhoto} 
                      variant="default" 
                      size="sm"
                    >
                      <Camera className="w-4 h-4 mr-2" />
                      Capture Photo
                    </Button>
                    <Button 
                      type="button" 
                      onClick={switchCamera} 
                      variant="outline" 
                      size="sm"
                    >
                      <FlipHorizontal className="w-4 h-4 mr-2" />
                      Switch Camera
                    </Button>
                    <Button 
                      type="button" 
                      onClick={stopCamera} 
                      variant="outline" 
                      size="sm"
                    >
                      Close Camera
                    </Button>
                  </>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-3 text-center">
              <div className="relative w-48 h-48 mx-auto rounded-lg overflow-hidden border-2 border-gray-300">
                <Image
                  src={URL.createObjectURL(photoBlob)}
                  alt="Captured photo"
                  fill
                  className="object-cover"
                  sizes="192px"
                />
              </div>
              <Button 
                type="button" 
                onClick={() => setPhotoBlob(null)} 
                variant="outline" 
                size="sm"
              >
                Retake Photo
              </Button>
            </div>
          )}
          <canvas ref={canvasRef} className="hidden" />
        </CardContent>
      </Card>

      {/* Audio Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Mic className="w-5 h-5" />
            Record Voice Message
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            type="button"
            onClick={recording ? stopRecording : startRecording}
            variant={recording ? "destructive" : "outline"}
            size="sm"
            className="w-full sm:w-auto"
          >
            {recording ? (
              <>
                <Square className="w-4 h-4 mr-2" />
                Stop Recording
              </>
            ) : (
              <>
                <Mic className="w-4 h-4 mr-2" />
                Start Recording
              </>
            )}
          </Button>
          
          {audioBlob && (
            <div className="space-y-2">
              <audio controls src={URL.createObjectURL(audioBlob)} className="w-full" />
              <Button
                type="button"
                onClick={() => setAudioBlob(null)}
                variant="outline"
                size="sm"
              >
                Re-record Audio
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Location Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Location
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button
            type="button"
            onClick={fetchLocation}
            variant="outline"
            size="sm"
            className="w-full sm:w-auto"
          >
            <MapPin className="w-4 h-4 mr-2" />
            Share My Location
          </Button>
          
          {latLng && (
            <div className="text-sm text-muted-foreground p-3 bg-muted rounded-lg">
              <p className="font-medium">📍 Location Captured</p>
              <p>Latitude: {latLng.lat.toFixed(6)}</p>
              <p>Longitude: {latLng.lng.toFixed(6)}</p>
              {latLng.accuracy && (
                <p>Accuracy: ±{latLng.accuracy.toFixed(0)} meters</p>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-red-600 hover:bg-red-700 text-white"
        size="lg"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Sending Request...
          </>
        ) : (
          'Send Request for Help'
        )}
      </Button>
    </form>
  );
}