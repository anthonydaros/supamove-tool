
import React, { useRef, useEffect } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ClipboardCopy } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface LogEntry {
  timestamp: Date;
  message: string;
  type: 'info' | 'error' | 'success';
}

interface TerminalProps {
  logs: LogEntry[];
  className?: string;
}

const Terminal = ({ logs, className }: TerminalProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const getLogColor = (type: LogEntry['type']) => {
    switch (type) {
      case 'error':
        return 'text-terminal-error';
      case 'success':
        return 'text-terminal-success';
      case 'info':
        return 'text-terminal-info';
      default:
        return 'text-terminal-text';
    }
  };

  const copyLogs = () => {
    const logText = logs
      .map(log => `[${log.timestamp.toISOString()}] ${log.message}`)
      .join('\n');
    navigator.clipboard.writeText(logText);
    toast({
      description: "Logs copied to clipboard",
      duration: 2000,
    });
  };

  return (
    <div className={cn("glass-panel rounded-lg p-4", className)}>
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-semibold text-white/80">Terminal Output</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={copyLogs}
          className="hover:bg-white/5"
        >
          <ClipboardCopy className="h-4 w-4" />
        </Button>
      </div>
      <ScrollArea className="h-[300px] rounded border border-white/10 bg-terminal-background p-4">
        <div ref={scrollRef} className="space-y-2">
          {logs.map((log, index) => (
            <div key={index} className="terminal-text">
              <span className="text-white/50">[{log.timestamp.toISOString()}]</span>{' '}
              <span className={getLogColor(log.type)}>{log.message}</span>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default Terminal;
