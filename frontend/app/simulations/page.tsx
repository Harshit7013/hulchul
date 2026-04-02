"use client";

import { useState } from "react";
import Chat from "@/components/Chat";
import RightPanel from "@/components/RightPanel";

export default function Home() {
  const [messages, setMessages] = useState<any[]>([]);
  const [event, setEvent] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  const startSimulation = (prompt: string) => {
    setMessages([]);
    setEvent(null);
    setIsRunning(true);

    const socketUrl = `${process.env.NEXT_PUBLIC_WS_BASE_URL}/stream`;
    const socket = new WebSocket(socketUrl);
    socket.onopen = () => socket.send(JSON.stringify({ prompt }));
    socket.onmessage = (e) => {
      const data = JSON.parse(e.data);
      
      if (data.event === "SIMULATION_START") {
        setMessages([{ 
          agent: "Government Source", 
          message: data.seed.content, 
          sentiment: "neutral",
          mutation_type: "ORIGINAL"
        }]);
      }

      if (data.event === "NEW_MESSAGE") {
        setMessages((prev) => [...prev, {
          agent: data.author.name,
          persona: data.author.persona,
          message: data.message.content,
          sentiment: data.message.mutation_type === "AGITATION" ? "negative" : "neutral",
          mutation_type: data.mutation_type
        }]);
      }

      if (data.event === "TV_DEBATE") {
        setEvent(`📺 TV Debate: ${data.participants?.join(" vs ")}`);
      }

      if (data.event === "SIMULATION_END") {
        setIsRunning(false);
      }
    };

  };

  return (
    <div className="flex-1 p-8 grid grid-cols-12 gap-8 overflow-hidden animate-fadeSlideUp">
      <Chat 
        messages={messages} 
        event={event} 
        isRunning={isRunning} 
        onStartSimulation={startSimulation} 
      />
      <RightPanel messages={messages} event={event} isRunning={isRunning} />
    </div>
  );
}
