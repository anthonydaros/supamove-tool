
import React from 'react';
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Shield, Key } from "lucide-react";
import SupabaseIcon from './SupabaseIcon';

interface DatabaseFormProps {
  type: 'source' | 'destination';
  onVerify: () => Promise<void>;
  onChange: (field: string, value: string) => void;
  values: {
    projectId: string;
    password: string;
    serviceRole: string;
  };
  isVerifying: boolean;
  isVerified: boolean;
  className?: string;
}

const DatabaseForm = ({
  type,
  onVerify,
  onChange,
  values,
  isVerifying,
  isVerified,
  className,
}: DatabaseFormProps) => {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onVerify();
  };

  return (
    <form onSubmit={handleSubmit} className={cn("glass-panel p-6 rounded-lg space-y-4", className)}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <SupabaseIcon isVerified={isVerified} />
          {type === 'source' ? 'Source' : 'Destination'} Database
        </h2>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor={`${type}-project-id`}>Project ID</Label>
        <div className="relative">
          <Input
            id={`${type}-project-id`}
            value={values.projectId}
            onChange={(e) => onChange('projectId', e.target.value)}
            className="pl-9"
            placeholder="Enter your project ID"
          />
          <Shield className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor={`${type}-password`}>Database Password</Label>
        <div className="relative">
          <Input
            id={`${type}-password`}
            type="password"
            value={values.password}
            onChange={(e) => onChange('password', e.target.value)}
            className="pl-9"
            placeholder="Enter database password"
          />
          <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor={`${type}-service-role`}>Service Role Key</Label>
        <div className="relative">
          <Input
            id={`${type}-service-role`}
            type="password"
            value={values.serviceRole}
            onChange={(e) => onChange('serviceRole', e.target.value)}
            className="pl-9"
            placeholder="Enter service role key"
          />
          <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={isVerifying || isVerified}
        variant={isVerified ? "secondary" : "default"}
      >
        {isVerifying ? 'Verifying...' : isVerified ? 'Verified' : 'Verify Connection'}
      </Button>
    </form>
  );
};

export default DatabaseForm;
