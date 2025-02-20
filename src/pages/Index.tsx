
import React, { useState } from 'react';
import DatabaseForm from '@/components/DatabaseForm';
import Terminal from '@/components/Terminal';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface DatabaseConfig {
  projectId: string;
  password: string;
  serviceRole: string;
}

interface LogEntry {
  timestamp: Date;
  message: string;
  type: 'info' | 'error' | 'success';
}

const Index = () => {
  const { toast } = useToast();
  const [sourceDb, setSourceDb] = useState<DatabaseConfig>({
    projectId: '',
    password: '',
    serviceRole: '',
  });
  const [destDb, setDestDb] = useState<DatabaseConfig>({
    projectId: '',
    password: '',
    serviceRole: '',
  });
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isVerifyingSource, setIsVerifyingSource] = useState(false);
  const [isVerifyingDest, setIsVerifyingDest] = useState(false);
  const [isSourceVerified, setIsSourceVerified] = useState(false);
  const [isDestVerified, setIsDestVerified] = useState(false);
  const [isMigrating, setIsMigrating] = useState(false);

  const addLog = (message: string, type: LogEntry['type'] = 'info') => {
    setLogs(prev => [...prev, { timestamp: new Date(), message, type }]);
  };

  const handleSourceChange = (field: string, value: string) => {
    setSourceDb(prev => ({ ...prev, [field]: value }));
    if (isSourceVerified) setIsSourceVerified(false);
  };

  const handleDestChange = (field: string, value: string) => {
    setDestDb(prev => ({ ...prev, [field]: value }));
    if (isDestVerified) setIsDestVerified(false);
  };

  const verifyConnection = async (type: 'source' | 'destination') => {
    const db = type === 'source' ? sourceDb : destDb;
    const setVerifying = type === 'source' ? setIsVerifyingSource : setIsVerifyingDest;
    const setVerified = type === 'source' ? setIsSourceVerified : setIsDestVerified;

    if (!db.projectId || !db.password || !db.serviceRole) {
      toast({
        description: "Please fill in all database credentials",
        variant: "destructive",
      });
      return;
    }

    setVerifying(true);
    addLog(`Verifying ${type} database connection...`);

    try {
      // Simulate verification - replace with actual Supabase connection logic
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setVerified(true);
      addLog(`${type} database connection verified successfully`, 'success');
      toast({
        description: `${type} database connection verified successfully`,
      });
    } catch (error) {
      addLog(`Failed to verify ${type} database connection: ${error}`, 'error');
      toast({
        description: `Failed to verify ${type} database connection`,
        variant: "destructive",
      });
    } finally {
      setVerifying(false);
    }
  };

  const handleMigration = async () => {
    if (!isSourceVerified || !isDestVerified) {
      toast({
        description: "Please verify both database connections first",
        variant: "destructive",
      });
      return;
    }

    setIsMigrating(true);
    addLog('Starting database migration...');

    try {
      // Simulate migration - replace with actual migration logic
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      addLog('Migration completed successfully', 'success');
      toast({
        description: "Migration completed successfully",
      });
    } catch (error) {
      addLog(`Migration failed: ${error}`, 'error');
      toast({
        description: "Migration failed",
        variant: "destructive",
      });
    } finally {
      setIsMigrating(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-6 animate-fade-in">
      <div className="max-w-6xl mx-auto space-y-6">
        <header className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-2">Supabase Database Migration Tool</h1>
          <p className="text-muted-foreground">Seamlessly migrate data between Supabase projects</p>
        </header>

        <div className="grid md:grid-cols-2 gap-6">
          <DatabaseForm
            type="source"
            values={sourceDb}
            onChange={handleSourceChange}
            onVerify={() => verifyConnection('source')}
            isVerifying={isVerifyingSource}
            isVerified={isSourceVerified}
          />
          <DatabaseForm
            type="destination"
            values={destDb}
            onChange={handleDestChange}
            onVerify={() => verifyConnection('destination')}
            isVerifying={isVerifyingDest}
            isVerified={isDestVerified}
          />
        </div>

        <div className="flex justify-center">
          <Button
            onClick={handleMigration}
            disabled={!isSourceVerified || !isDestVerified || isMigrating}
            className="px-8"
          >
            {isMigrating ? 'Migrating...' : 'Start Migration'}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <Terminal logs={logs} className="mt-8" />
      </div>
    </div>
  );
};

export default Index;
