'use client';

import { HelpCircle, ExternalLink } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';

interface InfoTooltipProps {
  content: string;
  className?: string;
  referenceUrl?: string;
  referenceText?: string;
}

export function InfoTooltip({ 
  content, 
  className = '', 
  referenceUrl,
  referenceText = 'Learn more'
}: InfoTooltipProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          className={`inline-flex items-center justify-center w-4 h-4 rounded-full text-muted-foreground hover:text-foreground transition-colors ${className}`}
          type="button"
        >
          <HelpCircle className="h-3 w-3" />
          <span className="sr-only">More information</span>
        </button>
      </TooltipTrigger>
      <TooltipContent className="max-w-xs">
        <div className="space-y-2">
          <p className="text-sm">{content}</p>
          {referenceUrl && (
            <Button
              variant="outline"
              size="sm"
              className="h-7 text-xs w-full"
              onClick={() => window.open(referenceUrl, '_blank', 'noopener,noreferrer')}
            >
              <ExternalLink className="h-3 w-3 mr-1" />
              {referenceText}
            </Button>
          )}
        </div>
      </TooltipContent>
    </Tooltip>
  );
}